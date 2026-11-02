"""Package the motion layer as the drmejia-motion WordPress plugin.

Copies src/ into plugins/drmejia-motion/assets/ (the plugin in the repo, as it will be on the
server) and writes .deploys/drmejia-motion-<version>.zip for upload in wp-admin.
Run: python3 -I .preview/proto/package.py
"""
import re
import shutil
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
SRC = HERE / "src"
PLUGIN = REPO / "plugins" / "drmejia-motion"
ASSETS = PLUGIN / "assets"


def main() -> None:
    version = re.search(r"Version:\s*([\d.]+)", (PLUGIN / "drmejia-motion.php").read_text()).group(1)
    if ASSETS.exists():
        shutil.rmtree(ASSETS)
    shutil.copytree(SRC, ASSETS)
    out = REPO / ".deploys" / f"drmejia-motion-{version}.zip"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(PLUGIN.rglob("*")):
            if f.is_file() and f.name != ".DS_Store":
                z.write(f, Path("drmejia-motion") / f.relative_to(PLUGIN))
    print(out, f"{out.stat().st_size // 1024} KB", len(z.namelist()), "files")


if __name__ == "__main__":
    main()
