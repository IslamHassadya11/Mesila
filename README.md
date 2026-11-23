# Mesila

Mesila (מסילה, "track") checks an Israeli applicant's bagrut, psychometric and previous-degree grades against the admission rules of Israel's universities and colleges. It shows which programs you clear, which are close, and what you'd need for the rest.

- 615 programs at 9 universities and 21 colleges, with acceptance and rejection lines where they're published
- A five-step flow: school type, bagrut, psychometric, previous degree, results
- Every campus on a map, sorted by distance from any of 1,244 Israeli towns and villages
- Results as cards or a list. You can save programs, hide programs or whole institutions, and choose what each card shows
- Dark neon theme by default, with a light theme one click away
- Sign-in with a Claude account when the page runs as a Claude artifact; guest mode keeps everything in the browser

## Run it locally

It's a static page with no build step.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` straight from disk mostly works, but browsers block font preloading on `file://`.

## Layout

```
index.html              markup only
css/fonts.css           @font-face rules for the bundled fonts
css/app.css             all styles (light and dark)
js/app.js               the app: admission maths, views, map, customize panel
data/universities.js    formulas, bonuses and cutoffs for the 7 research universities
data/colleges.js        Reichman, the Open University and 21 colleges: routes and minimums
data/towns.js           generated: every locality with coordinates (see below)
fonts/                  Bricolage Grotesque and IBM Plex Sans Hebrew (SIL OFL 1.1)
scripts/build_towns.py  rebuilds data/towns.js
```

## Data sources

- **Admission rules and cutoffs**: each institution's own published formulas and cutoff tables for 2026–27, plus milgapo.co.il for college routes. Every program card says whether its numbers are official or third-party. Estimates are labelled on the Institutions page.
- **Towns**: the Israel Central Bureau of Statistics locality list, via [arikw/israeli-localities](https://github.com/arikw/israeli-localities). A few localities added after 2019 come from the npm package `israel-geolocation` (MIT), with positions checked by hand. Industrial parks and other places with no residents are left out. To rebuild:

  ```sh
  git clone --depth 1 https://github.com/arikw/israeli-localities /tmp/cbs
  npm pack israel-geolocation && tar -xzf israel-geolocation-*.tgz
  python3 scripts/build_towns.py /tmp/cbs/dist/localities.json package/dist/locations.json data/towns.js
  ```

## Versions

| Tag | What changed |
| --- | --- |
| `v0.3-prototype` | First full prototype: sign-in, stepper, campus map, 30 institutions, one HTML file |
| `v0.4` | Split into files; every Israeli town; new fonts; customize panel, list view, save and hide |
| `v0.5` | "Night line" look: dark-first neon theme with a light toggle, one colour per field, glowing route, map and status |

## Caveats

Cutoffs change every year and during each registration round. The institution's own calculator and admissions office have the final word. The institution emblems are illustrative monograms, not official logos.
