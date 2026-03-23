#!/usr/bin/env node
/**
 * generate-annotations.mjs
 * Erstellt annotations.json aus nostr-artikel Frontmatter.
 * Dient als Input fuer generate-gwern-annotations.mjs.
 *
 * Liest Markdown-Frontmatter ohne externe Dependencies (nur Node.js stdlib).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const ARTICLES_DIR = path.join(rootDir, "src/content/nostr-artikel");
const OUTPUT_FILE = path.join(rootDir, "public/annotations.json");

/**
 * Parst YAML-Frontmatter aus Markdown (einfache Implementierung, kein gray-matter noetig)
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const result = {};

  // Einfacher YAML-Parser fuer skalare Werte und Arrays
  const lines = yaml.split("\n");
  let currentKey = null;
  let inArray = false;
  let arrayValues = [];

  for (const line of lines) {
    // Kommentar-Zeilen
    if (line.trim().startsWith("#")) continue;

    // Array-Element
    if (inArray && line.match(/^\s+-\s+/)) {
      const val = line.replace(/^\s+-\s+/, "").trim().replace(/^["']|["']$/g, "");
      arrayValues.push(val);
      continue;
    }

    // Neuer Key (kein Array mehr)
    if (inArray && !line.match(/^\s+-\s+/) && line.match(/^\w/)) {
      result[currentKey] = arrayValues;
      inArray = false;
      arrayValues = [];
    }

    // Key: Value oder Key: (Array-Start)
    const keyMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const val = keyMatch[2].trim();

      if (val === "" || val === "|" || val === ">") {
        // Array oder multiline - naechste Zeilen
        inArray = true;
        arrayValues = [];
      } else {
        // Skalarer Wert
        result[currentKey] = val.replace(/^["']|["']$/g, "");
        inArray = false;
      }
    }
  }

  // Letzten Array-Key speichern
  if (inArray && currentKey) {
    result[currentKey] = arrayValues;
  }

  return result;
}

/**
 * Extrahiert ersten Absatz als Abstract (ohne Markdown-Syntax)
 */
function extractAbstract(content, maxLength = 300) {
  // Frontmatter entfernen
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\s*/, "").trim();

  // Markdown-Elemente entfernen
  const cleaned = withoutFrontmatter
    .replace(/^#+\s+.*$/gm, "")          // Ueberschriften
    .replace(/!\[.*?\]\(.*?\)/g, "")      // Bilder
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links -> Text
    .replace(/\*+([^*]+)\*+/g, "$1")     // Bold/Italic
    .replace(/`[^`]+`/g, "")             // Code
    .trim();

  const paragraphs = cleaned.split(/\n\n+/).filter((p) => p.trim().length > 20);
  const first = paragraphs[0] || "";

  if (first.length > maxLength) {
    return first.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
  }
  return first.trim().replace(/\n/g, " ");
}

async function main() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error(`Articles dir not found: ${ARTICLES_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const annotations = {};
  let count = 0;

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fm = parseFrontmatter(content);

    if (!fm.title) continue;
    if (fm.status && fm.status === "draft") continue;

    // Slug bestimmen (aus Frontmatter oder Dateiname)
    const slug = fm.slug || path.basename(file, path.extname(file));
    const urlPath = `/nostr/artikel/${slug}`;

    // Abstract: description oder extrahierter Text
    const abstract =
      fm.description ||
      extractAbstract(content, 300);

    // Tags als Array
    let tags = fm.tags || [];
    if (typeof tags === "string") {
      tags = tags.split(",").map((t) => t.trim());
    }

    // Datum formatieren
    let date = fm.date || fm.created || "";
    if (date && date.length > 10) {
      date = date.substring(0, 10);
    }

    annotations[urlPath] = {
      url: urlPath,
      title: fm.title,
      author: fm.author || "Steven Noack",
      date,
      abstract,
      tags,
    };

    count++;
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(annotations, null, 2), "utf-8");
  console.log(`Generated annotations.json with ${count} articles`);
  console.log(`  Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
