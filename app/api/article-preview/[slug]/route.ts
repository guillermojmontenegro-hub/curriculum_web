import fs from "node:fs";

import { findPreviewAssetPath } from "@/lib/articles";

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const variant = url.searchParams.get("variant") === "thumb" ? "thumb" : "default";
  const previewPath = findPreviewAssetPath(slug, variant);

  if (!previewPath) {
    return new Response("Preview no encontrada", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(previewPath);
  const ext = previewPath.slice(previewPath.lastIndexOf("."));
  const contentType = MIME_BY_EXT[ext.toLowerCase()] ?? "application/octet-stream";

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600"
    }
  });
}
