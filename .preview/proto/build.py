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
import sys
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "site"
SRC = HERE / "src"
PLUGIN_DIR = HERE.parent.parent / "plugins" / "drmejia-motion"
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


PLUGIN_MODE = "--plugin" in sys.argv
PLUGIN_URL = "/wp-content/plugins/drmejia-motion/assets/"


def inject_like_plugin(html: str, path: str, slug: str) -> str:
    """The tags drmejia-motion.php prints: styles in the head, deferred scripts in the footer."""
    if path in LAYER1_SKIP:
        return html
    ver = re.search(r"Version:\s*([\d.]+)", (PLUGIN_DIR / "drmejia-motion.php").read_text()).group(1)
    css = ["motion"]
    js = ["motion", "cursor"]
    if (PLUGIN_DIR / "assets" / f"hero-{slug}.js").exists():
        css.append("hero-shared")
        js += [f"hero-{slug}", "scenes"]
    if (PLUGIN_DIR / "assets" / f"sig-{slug}.js").exists():
        js.append(f"sig-{slug}")
    head = "".join(f"<link rel='stylesheet' href='{PLUGIN_URL}{n}.css?ver={ver}' media='all' />\n" for n in css)
    foot = "".join(f"<script src='{PLUGIN_URL}{n}.js?ver={ver}' defer data-wp-strategy='defer'></script>\n" for n in js)
    html = html.replace("</head>", head + "</head>", 1)
    return re.sub(r"</body>(?!.*</body>)", lambda m: foot + "</body>", html, count=1, flags=re.S)


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
    if PLUGIN_MODE:
        html = inject_like_plugin(html, path, slug)
    else:
        inject = []
        if path not in LAYER1_SKIP:
            inject.append('<link rel="stylesheet" href="/proto/motion.css">')
            inject.append('<script src="/proto/motion.js" defer></script>')
            inject.append('<script src="/proto/cursor.js" defer></script>')   # cursor layer: cards, buttons, helix fields
        if (SRC / f"hero-{slug}.js").exists():   # particle scene for the page (engine + host)
            inject.append('<link rel="stylesheet" href="/proto/hero-shared.css">')
            inject.append(f'<script src="/proto/hero-{slug}.js" defer></script>')
            inject.append('<script src="/proto/scenes.js" defer></script>')
        if (SRC / f"sig-{slug}.js").exists():
            inject.append(f'<script src="/proto/sig-{slug}.js" defer></script>')
        html = html.replace("</head>", "\n".join(inject) + "\n</head>", 1)

    dest = OUT / path.lstrip("/") / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8")


def main() -> None:
    if "--src-only" in sys.argv and OUT.exists():   # pages unchanged: refresh only the proto files
        shutil.rmtree(OUT / "proto", ignore_errors=True)
        shutil.copytree(SRC, OUT / "proto")
        if PLUGIN_MODE:
            shutil.rmtree(OUT / PLUGIN_URL.strip("/"), ignore_errors=True)
            shutil.copytree(PLUGIN_DIR / "assets", OUT / PLUGIN_URL.strip("/"))
        print("refreshed", OUT / "proto")
        return
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    for path in PAGES:
        build_page(path)
    shutil.copytree(SRC, OUT / "proto")
    if PLUGIN_MODE:
        shutil.copytree(PLUGIN_DIR / "assets", OUT / PLUGIN_URL.strip("/"))
    print("built", OUT, f"({len(PAGES)} live pages + proto layer)")


if __name__ == "__main__":
    main()
