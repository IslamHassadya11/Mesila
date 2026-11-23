# Institution logos (optional)

Mesila draws its own monogram for every institution and ships with no official logos.

To show an official logo instead:

1. Check the institution's brand guidelines. Universities publish rules for using their logo, and some ask you to request permission.
2. Save the file here as `logos/<id>.svg` (or `.png`). SVG on a transparent background looks best. The app shows it on a white rounded tile.
3. List it in `data/logos.js`, e.g. `window.MESILA_LOGOS = { tau: 'logos/tau.svg' };`

The ids are listed in `data/logos.js`. Any institution left out keeps its monogram.
