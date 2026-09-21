"""Update static asset URLs after CSS/JS edits, without a build dependency."""
from hashlib import sha256
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
versions = {
    asset: sha256((root / asset).read_bytes()).hexdigest()[:12]
    for asset in ("css/style.css", "js/main.js")
}

for page in [root / "index.html", *sorted((root / "projects").glob("*.html"))]:
    original = page.read_text(encoding="utf-8")
    updated = original
    for asset, version in versions.items():
        pattern = r'((?:href|src)="(?:\.\./)*' + re.escape(asset) + r')(?:\?[^"\s]*)?(?=")'
        updated = re.sub(pattern, lambda match: f"{match[1]}?v={version}", updated)
    if updated != original:
        page.write_text(updated, encoding="utf-8")
        print(page.relative_to(root))
