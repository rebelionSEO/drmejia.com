"""Prototype preview: the LIVE site exactly as it is (theme 0.3.5 and everything WordPress renders),
plus new motion layered on top from /proto/. Nothing in the theme or on the server is changed.

- Fetches each live page (cache-busted) and mirrors the live theme files it references
  (CSS, JS, fonts) into site/, so fonts load from the same origin as the page.
- Strips tracking (GTM, Hostinger Reach) so previews never count as visits.
- Injects /proto/motion.css + motion.js (shared scroll language), /proto/cursor.js (cards, buttons and
  the dark surfaces react to the mouse) and /proto/sig-<page>.js (the page's own signature) where it exists.

    python3 -I .preview/proto/build.py
    python3 -m http.server 8770 --bind 127.0.0.1 --directory .preview/proto/site
"""
import re
import shutil
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "site"
SRC = HERE / "src"
SITE = "https://doctorgerardomejia.com"
THEME_PATH = "/wp-content/themes/drmejia/"
PAGES = ["/", "/servicios/", "/tamizaje/", "/adn-fetal/", "/sobre/", "/profesionales/", "/faq/", "/contacto/", "/legal/", "/politica-de-privacidad/"]
LAYER1_SKIP = {"/"}   # the homepage already has its own motion


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=30).read()


def mirror(rel: str) -> None:
    """Copy one live theme file (and fonts referenced by CSS) into site/."""
    dest = OUT / rel.lstrip("/")
    if dest.exists():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    data = get(SITE + rel)
    dest.write_bytes(data)
    if rel.endswith(".css"):
        for u in re.findall(rb"url\([\"']?([^\"')]+\.woff2)[\"']?\)", data):
            mirror(str(Path(rel).parent / u.decode()))


def build_page(path: str) -> None:
    html = get(f"{SITE}{path}?proto={int(time.time())}").decode("utf-8")
    for rel in sorted(set(re.findall(re.escape(SITE + THEME_PATH) + r"([\w./-]+?)(?:\?ver=[\w.]+)?(?=[\"'])", html))):
        mirror(THEME_PATH + rel)
    html = html.replace(SITE + THEME_PATH, THEME_PATH)
    html = re.sub(r"<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->", "", html, flags=re.S)
    html = re.sub(r"<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->", "", html, flags=re.S)
    html = re.sub(r"<script[^>]*hostinger-reach-embed-js[^>]*></script>", "", html)
    assert "googletagmanager.com/gtm.js" not in html, "GTM still present"

    slug = path.strip("/") or "home"
    inject = []
    if path not in LAYER1_SKIP:
        inject.append('<link rel="stylesheet" href="/proto/motion.css">')
        inject.append('<script src="/proto/motion.js" defer></script>')
        inject.append('<script src="/proto/cursor.js" defer></script>')   # cursor layer: cards, buttons, helix fields
    if (SRC / f"sig-{slug}.js").exists():
        inject.append(f'<script src="/proto/sig-{slug}.js" defer></script>')
    html = html.replace("</head>", "\n".join(inject) + "\n</head>", 1)

    dest = OUT / path.lstrip("/") / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8")


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    for path in PAGES:
        build_page(path)
    shutil.copytree(SRC, OUT / "proto")
    print("built", OUT, f"({len(PAGES)} live pages + proto layer)")


if __name__ == "__main__":
    main()
