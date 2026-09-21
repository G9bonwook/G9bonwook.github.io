"""Version assets and page links so cached HTML cannot reopen stale assets."""
from hashlib import sha256
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
versions = {
    asset: sha256((root / asset).read_bytes()).hexdigest()[:12]
    for asset in ("css/style.css", "js/main.js")
}

pages = [root / "index.html", *sorted((root / "projects").glob("*.html"))]
page_link = re.compile(
    r'((?:href|value)="(?:\.\./)?(?:projects/)?[\w-]+\.html)'
    r'(?:\?v=[a-f0-9]+)?(?=[#"])'
)
contents = {}
for page in pages:
    # Normalize old page versions before hashing to make reruns idempotent.
    updated = page_link.sub(r"\1", page.read_text(encoding="utf-8"))
    for asset, version in versions.items():
        pattern = r'((?:href|src)="(?:\.\./)*' + re.escape(asset) + r')(?:\?[^"\s]*)?(?=")'
        updated = re.sub(pattern, lambda match: f"{match[1]}?v={version}", updated)
    contents[page] = updated

page_version = sha256("\n".join(contents.values()).encode("utf-8")).hexdigest()[:12]
for page, content in contents.items():
    updated = page_link.sub(lambda match: f"{match[1]}?v={page_version}", content)
    if updated != page.read_text(encoding="utf-8"):
        page.write_text(updated, encoding="utf-8")
        print(page.relative_to(root))
