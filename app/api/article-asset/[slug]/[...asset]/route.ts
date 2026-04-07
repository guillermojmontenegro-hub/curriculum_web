import fs from "node:fs";

import { getArticleAssetPath } from "@/lib/articles";

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml"
};

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string; asset: string[] }> }
) {
  const { slug, asset } = await params;
  const assetPath = getArticleAssetPath(slug, asset);

  if (!assetPath) {
    return new Response("Asset no encontrado", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(assetPath);
  const ext = assetPath.slice(assetPath.lastIndexOf("."));
  const contentType = MIME_BY_EXT[ext.toLowerCase()] ?? "application/octet-stream";

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600"
    }
  });
}
