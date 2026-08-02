import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Los Verbonden homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="nl">/i);
  assert.match(html, /<title>Los Verbonden \| Begeleiding tijdens en na een scheiding<\/title>/i);
  assert.match(html, /<h1>Je relatie eindigde\.<br\/><em>Je leven niet\.<\/em><\/h1>/i);
  assert.match(html, /De Verkenning/);
  assert.match(html, /mailto:info@losverbonden\.nl/);
  assert.match(html, /tel:\+31643574633/);
  assert.match(html, /property="og:image" content="https:\/\/losverbonden\.nl\/og\.png"/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps mobile-first UX, metadata and project assets wired", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-controls="mobile-menu"/);
  assert.match(page, /role="dialog" aria-modal="true"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /document\.body\.style\.overflow/);
  for (const id of ["aanpak", "voor-wie", "verhalen", "agenda", "over-ons"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(css, /@media \(min-width: 860px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.mobile-sticky-cta/);
  assert.match(layout, /ProfessionalService/);
  assert.match(layout, /metadataBase: new URL\("https:\/\/losverbonden\.nl"\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/images/hero-dunes.png", import.meta.url)),
    access(new URL("../public/images/music-reflection.png", import.meta.url)),
    access(new URL("../public/icons/icons8/heart.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
