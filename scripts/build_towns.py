"""Build data/towns.js: every Israeli locality with a position, for the home-town picker.

Sources
  1. CBS locality list (Israel Central Bureau of Statistics), as packaged by
     github.com/arikw/israeli-localities  (dist/localities.json, ITM coordinates
     converted to WGS84, population, district).
  2. npm package israel-geolocation (MIT), used only for English names the CBS
     list leaves blank and for a few localities added after 2019. Its own
     coordinates are not trusted: about 90 of them point to one fallback spot.

Usage
    git clone --depth 1 https://github.com/arikw/israeli-localities /tmp/cbs
    npm pack israel-geolocation && tar -xzf israel-geolocation-*.tgz
    python3 scripts/build_towns.py /tmp/cbs/dist/localities.json package/dist/locations.json data/towns.js

Output rows: [cbsCode, englishName, hebrewName, lat, lon, population]
"""
import json
import re
import sys

# Spellings the general rules below can't produce (keys are CBS names, upper case).
FIXED = {
    "TEL AVIV - YAFO": "Tel Aviv-Yafo",
    "BE'ER SHEVA": "Beersheba",
    "BENE BERAQ": "Bnei Brak",
    "RISHON LEZIYYON": "Rishon LeZion",
    "MODI'IN-MAKKABBIM-RE'UT": "Modi'in-Maccabim-Re'ut",
    "MODI'IN-MAKKABBIM-RE": "Modi'in-Maccabim-Re'ut",
    "NAZERAT": "Nazareth",
    "AKKO": "Acre (Akko)",
    "ZEFAT": "Safed (Tzfat)",
    "ELAT": "Eilat",
    "KARMI'EL": "Karmiel",
    "ROSH HAAYIN": "Rosh HaAyin",
    "HOD HASHARON": "Hod HaSharon",
    "RAMAT HASHARON": "Ramat HaSharon",
    "MIGDAL HAEMEQ": "Migdal HaEmek",
    "NES ZIYYONA": "Ness Ziona",
    "GIV'ATAYIM": "Givatayim",
    "GIV'AT SHEMU'EL": "Giv'at Shmuel",
    "MA'ALE ADUMMIM": "Ma'ale Adumim",
    "YOQNE'AM ILLIT": "Yokneam Illit",
    "ZIKHRON YA'AQOV": "Zikhron Ya'akov",
    "GANNE TIQWA": "Ganei Tikva",
    "SEDEROT": "Sderot",
    "SHEFAR'AM": "Shefa-'Amr",
    "KAFAR QASEM": "Kafr Qasim",
    "KAFAR KANNA": "Kafr Kanna",
    "UMM AL-FAHM": "Umm al-Fahm",
    "BAQA AL-GHARBIYYE": "Baqa al-Gharbiyye",
    "TIRE": "Tira",
    "ARRABE": "Arraba",
    "LAQYE": "Lakiya",
    "ISIFYA": "Isfiya",
    "BET SHE'AN": "Beit She'an",
    "BETAR ILLIT": "Beitar Illit",
    "MA'ALOT-TARSHIHA": "Ma'alot-Tarshiha",
    "OR AQIVA": "Or Akiva",
    "HERZLIYYA": "Herzliya",
    "HERZELIYYA": "Herzliya",
    "RA'ANANNA": "Ra'anana",
    "KEFAR SAVA": "Kfar Saba",
    "QIRYAT SHEMONA": "Kiryat Shmona",
    "ARI'EL": "Ariel",
    "QAZRIN": "Katzrin",
    "MIZPE RAMON": "Mitzpe Ramon",
    "IMMANU'EL": "Immanuel",
    "QARNE SHOMERON": "Karnei Shomron",
    "PARDES HANNA-KARKUR": "Pardes Hanna-Karkur",
}

# Localities added after the 2019 CBS list, with positions checked by hand.
EXTRA = {
    "3400": (31.524, 35.108),   # Hebron (Jewish community)
    "3890": (31.954, 35.128),   # Neria
    "3876": (31.824, 35.320),   # Nofei Prat
    "3873": (32.483, 35.161),   # Tal Menashe
    "3815": (31.880, 35.239),   # Tel Zion
    "1298": (32.859, 35.256),   # Etgar
    "965": (31.254, 34.968), "986": (32.771, 35.136), "1041": (31.243, 35.030),
    "1170": (31.281, 34.932), "939": (31.153, 34.808), "957": (31.283, 34.931),
}
MISSING_EN = {"3777": "Sansana", "3400": "Hebron", "1347": "Qasr al-Sir", "1331": "Kamanneh"}
# CBS "places" that nobody lives in: industrial parks, regional centres, a hospital, hotels.
NOT_HOMES = re.compile(r'^(מפעלי|תעשיון|תעשיות|פארק תעשיות|אזור תעשייה|אזור תעסוקה|מרכז|בית חולים|קרית חינוך|קריית חינוך|בי"ס|ים המלח - בתי מלון|קרית תעופה|נאות חובב|עידן הנגב|מגדל תפן|בר-לב|אילון תבור|תל חי \(מכללה\))')
FIX_WORD = {"Kibuz": "Kibbutz", "Kevuza": "Kvutza", "K.no'ar": "Youth Village"}
WORD = {"QIRYAT": "Kiryat", "KEFAR": "Kfar", "BET": "Beit", "BENE": "Bnei", "GIV'AT": "Giv'at"}


def english(raw: str) -> str:
    raw = re.sub(r"\s+", " ", raw.strip().upper())
    if raw in FIXED:
        return FIXED[raw]
    out = []
    for word in raw.split(" "):
        if word in WORD:
            out.append(WORD[word])
            continue
        w = word.lower().replace("q", "k").replace("w", "v")
        w = re.sub(r"([a-z])\1", r"\1", w)  # ALLON -> alon, NAHARIYYA -> nahariya
        w = "-".join(p[:1].upper() + p[1:] for p in w.split("-"))
        w = "(".join(p[:1].upper() + p[1:] for p in w.split("("))
        out.append(w)
    name = re.sub(r"(\S)\(", r"\1 (", " ".join(out).replace(" - ", "-"))
    for k, v in FIX_WORD.items():
        name = name.replace(k, v)
    return name


def main(cbs_path: str, geo_path: str, dst: str) -> None:
    cbs = json.load(open(cbs_path, encoding="utf-8"))
    geo = {str(x["id"]): x for x in json.load(open(geo_path, encoding="utf-8"))}
    rows, seen = [], set()
    for a in cbs:
        code = str(a["id"])
        if NOT_HOMES.match(a["name"].strip()):
            continue
        w = a["coordinates"]["wgs84"]
        en_raw = (a.get("nameEn") or "").strip() or (geo.get(code, {}).get("nameEn") or "").strip()
        en = MISSING_EN.get(code) or (english(en_raw) if en_raw else "")
        rows.append([code, en, a["name"].strip(), round(w["latitude"], 4), round(w["longitude"], 4), a.get("population") or 0])
        seen.add(code)
    for code, (lat, lon) in EXTRA.items():
        if code in seen or code not in geo:
            continue
        g = geo[code]
        en = MISSING_EN.get(code) or english(g["nameEn"])
        rows.append([code, en, g["name"].strip(), lat, lon, 0])
    for r in rows:
        assert 29.4 < r[3] < 33.4 and 34.2 < r[4] < 35.95, r
    rows.sort(key=lambda r: (r[1] or r[2]).lower())
    body = json.dumps(rows, ensure_ascii=False, separators=(",", ":")).replace("],[", "],\n[")
    with open(dst, "w", encoding="utf-8") as f:
        f.write("// Generated by scripts/build_towns.py. Source: Israel CBS locality list\n")
        f.write("// (via github.com/arikw/israeli-localities) plus a few later localities.\n")
        f.write("// Row: cbsCode, English name, Hebrew name, lat, lon, population\n")
        f.write("window.MESILA_TOWNS=" + body + ";\n")
    print(len(rows), "towns written to", dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
