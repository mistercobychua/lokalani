# Produce photos

Drop real photos here and they'll appear automatically on the marketplace
cards and the listing detail screen. Until a file exists, the app shows the
emoji fallback — so nothing breaks if a photo is missing.

## Filenames (use these exact names)

| File              | Item                        |
|-------------------|-----------------------------|
| `kamatis.jpg`     | 🍅 Kamatis (tomatoes)        |
| `galunggong.jpg`  | 🐟 Galunggong (round scad)   |
| `repolyo.jpg`     | 🥬 Repolyo (cabbage)         |
| `talong.jpg`      | 🍆 Talong (eggplant)         |
| `saging.jpg`      | 🍌 Saging na Saba (bananas)  |
| `kamote.jpg`      | 🥔 Kamote (sweet potato)     |

- Accepted extensions: **.jpg**, **.png**, **.jpeg**, **.webp** (it tries them in that order).
- **Square-ish** images look best (they're shown in rounded tiles, cropped to fit).
- Keep them reasonably small (~800px, under ~300 KB each) so the app stays fast.
- After adding files locally: refresh the browser. To show them on the live
  Vercel site, commit + push them (`git add public/produce && git commit && git push`).
