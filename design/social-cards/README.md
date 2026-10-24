# Social preview cards

The images LinkedIn, Slack, WhatsApp etc. show when someone shares a link to the site. Each card page here becomes `img/social-card-<name>.png`:

| Card | Used on |
| --- | --- |
| `general.html` | Every page, unless it sets `socialImage` |
| `tutoring.html` | The tutoring pages (set in `src/tutoring/tutoring.11tydata.js`) |

`card.css` holds the shared layout, and `photo.jpg` is the photo, cropped square. None of this folder is published: only the PNGs in `img/` are.

## Changing a card

1. Edit the card's HTML (or `card.css` for both). Lines are broken by hand with `<br>`, so check a longer line still fits.
2. From the root of the repository, run:

   ```sh
   uv run design/social-cards/make_cards.py
   ```

   It uses your installed Chrome to draw the cards, so they look the same on any machine. It needs an internet connection to fetch the font (Inter), and stops with an error rather than use a different font if it can't. If you don't have Chrome, run `uv run --with playwright playwright install chromium` once first.
3. Commit the changed files and the new PNGs together.
4. After the site has deployed, paste the page's URL into LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/). Otherwise LinkedIn keeps showing the old image for about a week.

To add a card for another section, add `<name>.html` here, run the script, and set `socialImage: '/img/social-card-<name>.png'` in that section's data file.

Keep the cards at 1200×630, the size LinkedIn and others expect. `src/_includes/title-and-meta.njk` tells them that size.
