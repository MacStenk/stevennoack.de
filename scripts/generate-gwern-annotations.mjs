#!/usr/bin/env node
/**
 * generate-gwern-annotations.mjs
 * Generiert statische HTML-Dateien im Gwern-Annotation-Format aus annotations.json.
 * Output: public/metadata/annotation/{sha256_hash}.html
 * Mapping: public/metadata/annotation/_index.json
 *
 * Features:
 * - SHA256-Hash Dateinamen
 * - Schema.org WebPage Annotation (LLM-sichtbar)
 * - Dublin Core Metadaten
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function hashKey(key) {
  return crypto.createHash("sha256").update(key).digest("hex").substring(0, 16);
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateAnnotationHTML(key, data) {
  const linkClass = "link-annotated";
  const url = data.url || key;
  const title = escapeHtml(data.title || url);
  const author = data.author ? escapeHtml(data.author) : null;
  const date = data.date ? escapeHtml(data.date) : null;
  const abstract = data.abstract ? escapeHtml(data.abstract) : null;
  const tags = data.tags || [];

  const tagsHTML = tags.length
    ? `<span class="link-tags">${tags
        .map(
          (t) =>
            `<a href="/tag/${encodeURIComponent(t)}">${escapeHtml(t)}</a>`
        )
        .join(", ")}</span>`
    : "";

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title || url,
    url: url.startsWith("/") ? `https://stevennoack.de${url}` : url,
    ...(abstract && { description: data.abstract }),
    ...(author && { author: { "@type": "Person", name: data.author } }),
    ...(date && { datePublished: data.date }),
    ...(tags.length && { keywords: tags.join(", ") }),
    isPartOf: {
      "@type": "WebSite",
      name: "Steven Noack",
      url: "https://stevennoack.de",
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${title}</title>
${author ? `<meta name="dc.creator" content="${author}">` : ""}
${date ? `<meta name="dc.date" content="${date}">` : ""}
${abstract ? `<meta name="description" content="${escapeHtml(data.abstract)}">` : ""}
${tags.length ? `<meta name="keywords" content="${escapeHtml(tags.join(", "))}">` : ""}
<meta name="dc.rights" content="CC BY 4.0">
<link rel="schema.dcterms" href="https://www.dublincore.org/specifications/dublin-core/dcmi-terms/">
<script type="application/ld+json">${JSON.stringify(schemaOrg)}</script>
</head>
<body>
<div id="markdownBody">
<p>
  <a class="${linkClass}" href="${escapeHtml(url)}">${title}</a>${author ? `<span class="author">${author}</span>` : ""}${date ? `<span class="date">${date}</span>` : ""}${tagsHTML}
</p>${abstract ? `\n<blockquote><p>${abstract}</p></blockquote>` : ""}
</div>
</body>
</html>`;
}

async function main() {
  const annotationsPath = path.join(ROOT, "public", "annotations.json");
  if (!fs.existsSync(annotationsPath)) {
    console.log("No annotations.json found. Run generate-annotations.mjs first.");
    return;
  }
  const annotations = JSON.parse(fs.readFileSync(annotationsPath, "utf-8"));
  const outDir = path.join(ROOT, "public", "metadata", "annotation");

  // Clean old files (keep _index.json until rewrite)
  if (fs.existsSync(outDir)) {
    fs.readdirSync(outDir).forEach((f) => {
      if (f !== "_index.json") {
        fs.unlinkSync(path.join(outDir, f));
      }
    });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const index = {};
  let count = 0;

  for (const [key, data] of Object.entries(annotations)) {
    const annotKey = key.startsWith("/") ? key : data.url || key;
    const hash = hashKey(annotKey);
    const filename = hash + ".html";
    const html = generateAnnotationHTML(key, data);
    fs.writeFileSync(path.join(outDir, filename), html, "utf-8");
    index[annotKey] = hash;
    count++;
  }

  fs.writeFileSync(
    path.join(outDir, "_index.json"),
    JSON.stringify(index),
    "utf-8"
  );
  console.log(`Generated ${count} annotation HTML files + _index.json`);
  console.log(`  Output: ${outDir}`);
  console.log(`  Schema.org: WebPage + Dublin Core`);
}

main().catch(console.error);
