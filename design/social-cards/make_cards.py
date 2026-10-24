# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright>=1.50"]
# ///
"""
Render each card page in this folder to img/social-card-<name>.png.

For example, tutoring.html becomes img/social-card-tutoring.png. The cards
are drawn by Chrome, so they look the same on every machine. The font (Inter)
comes from Google Fonts, so rendering needs an internet connection, but
nothing needs installing apart from Chrome itself. If Chrome isn't installed,
this falls back to Playwright's own Chromium, which needs a one-off download
first:

    uv run --with playwright playwright install chromium

Usage:

    uv run design/social-cards/make_cards.py
"""

import re
import sys
from pathlib import Path

from playwright.sync_api import (
    Browser,
    Error,
    Page,
    Playwright,
    sync_playwright,
)

HERE = Path(__file__).resolve().parent
OUTPUT_DIR = HERE.parents[1] / "img"
WIDTH, HEIGHT = 1200, 630


def font_weights(css: Path) -> list[str]:
    """Return the font weights the cards' CSS uses, e.g. ["400", "700"]."""
    return sorted(set(re.findall(r"font-weight:\s*(\d+)", css.read_text())))


def launch(p: Playwright) -> Browser:
    """Start Chrome, or Playwright's Chromium if Chrome isn't installed."""
    try:
        return p.chromium.launch(channel="chrome")
    except Error:
        return p.chromium.launch()


def check_loaded(page: Page, card: Path) -> None:
    """Exit with an error if the card's photo or font failed to load.

    Chrome draws a missing photo as a broken-image icon, and falls back to
    another font without complaint, so check rather than write a bad card.
    """
    broken = page.evaluate(
        "[...document.images]"
        ".filter(i => !i.complete || i.naturalWidth === 0)"
        ".map(i => i.getAttribute('src'))"
    )
    if broken:
        sys.exit(f"error: {card.name} couldn't load {', '.join(broken)}")
    for weight in font_weights(HERE / "card.css"):
        # Resolves to the font faces loaded, so an empty list means the font
        # isn't available in this weight.
        loaded = page.evaluate(
            "w => document.fonts.load(w + ' 16px Inter')"
            ".then(faces => faces.length, () => 0)",
            weight,
        )
        if not loaded:
            sys.exit(f"error: couldn't load Inter at weight {weight}")
    page.evaluate("document.fonts.ready.then(() => null)")


def main() -> None:
    cards = sorted(HERE.glob("*.html"))
    with sync_playwright() as p:
        browser = launch(p)
        page = browser.new_page(viewport={"width": WIDTH, "height": HEIGHT})
        for card in cards:
            page.goto(card.as_uri())
            check_loaded(page, card)
            output = OUTPUT_DIR / f"social-card-{card.stem}.png"
            page.screenshot(path=output)
            print(f"Wrote {output}")
        browser.close()


if __name__ == "__main__":
    main()
