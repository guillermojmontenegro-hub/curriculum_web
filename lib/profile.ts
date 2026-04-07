import fs from "node:fs";
import path from "node:path";

import type { Profile } from "@/lib/types";

const PROFILE_DIR = path.join(process.cwd(), "content", "profile");

export function getProfile(locale = "es"): Profile {
  const filePath = path.join(PROFILE_DIR, `profile.${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as Profile;
}
