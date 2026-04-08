import fs from "node:fs";
import path from "node:path";

import { marked } from "marked";

import type { Article, ArticleMeta } from "@/lib/types";

const ARTICLES_DIR = path.join(process.cwd(), "Articulos");

function ensurePathExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No existe el archivo requerido: ${filePath}`);
  }
}

function getIndexPathBySlug(slug: string): string {
  return path.join(ARTICLES_DIR, slug, "index.md");
}

export function getAllArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function normalizeMarkdownAssetUrls(html: string, slug: string): string {
  return html.replace(
    /src="(?!https?:\/\/|\/)([^"]+)"/g,
    (_, assetPath: string) => {
      const encodedAssetPath = assetPath
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");

      return `src="/api/article-asset/${encodeURIComponent(slug)}/${encodedAssetPath}"`;
    },
  );
}

type FrontmatterData = {
  title?: string;
  date?: string;
  description?: string;
  author?: string;
  tags?: string[];
  previewImageUrl?: string;
};

function parseScalarValue(rawValue: string): string {
  const value = rawValue.trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseArrayValue(rawValue: string): string[] {
  const normalized = rawValue.replace(/\r?\n/g, " ").trim();
  const matches = Array.from(
    normalized.matchAll(/"([^"]*)"|'([^']*)'|([^,\[\]\s][^,\[\]]*)/g),
  );

  return matches
    .map((match) => match[1] ?? match[2] ?? match[3] ?? "")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseFrontmatter(fileContent: string): {
  data: FrontmatterData;
  content: string;
} {
  if (!fileContent.startsWith("---")) {
    return { data: {}, content: fileContent };
  }

  const closingMarkerIndex = fileContent.indexOf("\n---", 3);

  if (closingMarkerIndex === -1) {
    return { data: {}, content: fileContent };
  }

  const rawFrontmatter = fileContent.slice(4, closingMarkerIndex).trim();
  const content = fileContent.slice(closingMarkerIndex + 4).trimStart();
  const lines = rawFrontmatter.split(/\r?\n/);
  const data: FrontmatterData = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim()) {
      continue;
    }

    const entryMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);

    if (!entryMatch) {
      continue;
    }

    const [, key, initialValue] = entryMatch;
    let value = initialValue.trim();

    if (!value) {
      const buffer: string[] = [];

      while (index + 1 < lines.length) {
        const nextLine = lines[index + 1];

        if (/^[A-Za-z0-9_]+:\s*/.test(nextLine)) {
          break;
        }

        buffer.push(nextLine);
        index += 1;
      }

      value = buffer.join("\n").trim();
    }

    if (!value) {
      continue;
    }

    if (value.startsWith("[")) {
      data[key as keyof FrontmatterData] = parseArrayValue(value) as never;
      continue;
    }

    data[key as keyof FrontmatterData] = parseScalarValue(value) as never;
  }

  return { data, content };
}

function parseArticle(slug: string): { meta: ArticleMeta; content: string } {
  const indexPath = getIndexPathBySlug(slug);
  ensurePathExists(indexPath);

  const fileContent = fs.readFileSync(indexPath, "utf8");
  const { data, content } = parseFrontmatter(fileContent);

  const meta: ArticleMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    author: String(data.author ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    previewImageUrl:
      typeof data.previewImageUrl === "string"
        ? data.previewImageUrl
        : undefined,
  };

  return { meta, content };
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const { meta, content } = parseArticle(slug);
  const rawHtml = await marked.parse(content, {
    async: true,
    gfm: true,
    breaks: false,
  });

  return {
    ...meta,
    contentHtml: normalizeMarkdownAssetUrls(rawHtml, slug),
  };
}

export function getAllArticlesMeta(): ArticleMeta[] {
  const metas = getAllArticleSlugs().map((slug) => parseArticle(slug).meta);
  return metas.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

type PreviewVariant = "default" | "thumb";

export function findPreviewAssetPath(
  slug: string,
  variant: PreviewVariant = "default",
): string | null {
  const articleDir = path.join(ARTICLES_DIR, slug);
  if (!fs.existsSync(articleDir)) {
    return null;
  }

  const previewFiles = fs.readdirSync(articleDir);

  const thumbFile =
    variant === "thumb"
      ? previewFiles.find((name) => /^preview-thumb\.(png|jpg|jpeg|webp)$/i.test(name))
      : null;

  const previewFile =
    thumbFile ??
    previewFiles.find((name) => /^preview\.(png|jpg|jpeg|webp)$/i.test(name));

  return previewFile ? path.join(articleDir, previewFile) : null;
}

export function getArticleAssetPath(
  slug: string,
  segments: string[],
): string | null {
  const articleDir = path.join(ARTICLES_DIR, slug);
  const absolutePath = path.resolve(articleDir, ...segments);

  if (!absolutePath.startsWith(articleDir)) {
    return null;
  }

  return fs.existsSync(absolutePath) ? absolutePath : null;
}
