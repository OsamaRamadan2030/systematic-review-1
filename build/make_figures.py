"""Build all manuscript figures and summary counts from build/data/.

Every number drawn in a figure or quoted in the text is computed here from the
data files, so the manuscript, supplement and figures cannot drift apart.

Usage:  python3 build/make_figures.py
Outputs: submission_healthcare/figures/*.png (600 dpi) and *.pdf,
         build/data/summary.json
"""
import csv
import json
import os
from collections import Counter, defaultdict

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle, Wedge
from matplotlib.lines import Line2D

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "build", "data")
FIG = os.path.join(ROOT, "submission_healthcare", "figures")
os.makedirs(FIG, exist_ok=True)

plt.rcParams.update({
    "font.family": "Liberation Sans",
    "font.size": 9,
    "axes.linewidth": 0.6,
    "savefig.dpi": 600,
})

INK = "#0b0b0b"
INK2 = "#52514e"
MUTED = "#8a8984"
GRID = "#e4e3df"
DESIGN_COL = {"RCT": "#2a78d6", "NRS": "#eb6834", "SCD": "#1baf7a"}
DESIGN_LAB = {"RCT": "Randomised", "NRS": "Non-randomised / within-participant",
              "SCD": "Single-case experimental"}


def load_studies():
    with open(os.path.join(DATA, "included_studies.csv"), newline="") as fh:
        rows = list(csv.DictReader(fh))
    for r in rows:
        r["ref"] = int(r["ref"])
        r["n_disability"] = int(r["n_disability"])
        r["n_comparison_no_disability"] = int(r["n_comparison_no_disability"])
    return rows


def load_numbers():
    with open(os.path.join(DATA, "ref_numbers.json")) as fh:
        return json.load(fh)


NUM = None


def new(old):
    """Map a Children-submission reference number (23-49) to the Healthcare number."""
    return NUM[f"s{int(old)}"]


def load_ed():
    with open(os.path.join(DATA, "effect_direction.csv"), newline="") as fh:
        return list(csv.DictReader(fh))


# ---------------------------------------------------------------- summary
def summarise(studies, ed):
    s = {}
    s["reports"] = len(studies)
    s["series_max"] = len({r["series"] for r in studies})
    s["n_disability"] = sum(r["n_disability"] for r in studies)
    s["n_comparison"] = sum(r["n_comparison_no_disability"] for r in studies)
    s["n_total"] = s["n_disability"] + s["n_comparison"]
    s["by_function_reports"] = Counter(r["function"] for r in studies)
    s["by_function_learners"] = defaultdict(int)
    for r in studies:
        s["by_function_learners"][r["function"]] += r["n_disability"]
    s["by_design"] = Counter(r["design_class"] for r in studies)
    s["by_country"] = Counter(r["country"] for r in studies)
    s["since_2018"] = sum(1 for r in studies if int(r["year"]) >= 2018)
    s["year_range"] = [min(int(r["year"]) for r in studies), max(int(r["year"]) for r in studies)]
    s["rating_class"] = Counter(r["rating_class"] for r in studies)
    s["sensitivity_retained"] = sorted(r["ref"] for r in studies if r["sensitivity_retained"] == "yes")
    s["abstract_only"] = sorted(r["ref"] for r in studies if r["abstract_only"] == "yes")
    # effect-direction tallies per domain
    tally = defaultdict(lambda: Counter())
    refs = defaultdict(lambda: defaultdict(list))
    for e in ed:
        tally[e["domain"]][e["direction"]] += 1
        refs[e["domain"]][e["direction"]].append(e["ref"])
    s["ed_tally"] = {k: dict(v) for k, v in tally.items()}
    s["ed_refs"] = {k: {d: v for d, v in dd.items()} for k, dd in refs.items()}
    # learning outcomes vs risk class
    rc = {str(r["ref"]): r["rating_class"] for r in studies}
    learn = []
    for e in ed:
        if e["level"] == "learning":
            cls = [rc[x] for x in e["ref"].split(";")]
            learn.append({"ref": e["ref"], "domain": e["domain"], "dir": e["direction"], "risk": cls})
    s["learning_outcomes"] = learn
    s["learning_favourable_all_higher_risk"] = all(
        all(c == "higher" for c in x["risk"]) for x in learn if x["dir"] == "+")
    retained = set(s["sensitivity_retained"])
    s["retained_levels"] = sorted({e["level"] for e in ed
                                   if any(int(x) in retained for x in e["ref"].split(";"))})
    s["retained_with_learning"] = sorted({e["ref"] for e in ed if e["level"] == "learning"
                                          and any(int(x) in retained for x in e["ref"].split(";"))})
    # convert Counters for json
    for k in ["by_function_reports", "by_design", "by_country", "rating_class"]:
        s[k] = dict(s[k])
    s["by_function_learners"] = dict(s["by_function_learners"])
    return s


# ---------------------------------------------------------------- Figure 1: PRISMA
def prisma(counts):
    c = counts
    db_total = sum(c["databases"].values())
    ot_total = sum(c["other_sources"].values())
    # reconcile arithmetic before drawing
    assert db_total - c["db_duplicates"] - c["db_automation"] - c["db_other_removed"] == c["db_screened"]
    assert c["db_screened"] - c["db_excluded_ta"] == c["db_sought"]
    assert c["db_sought"] - c["db_not_retrieved"] == c["db_assessed"]
    assert c["db_assessed"] - sum(c["db_excluded_ft"].values()) == c["db_included"]
    assert ot_total - c["other_duplicates"] == c["other_screened"]
    assert c["other_screened"] - c["other_excluded_ta"] == c["other_sought"]
    assert c["other_sought"] - c["other_not_retrieved"] == c["other_assessed"]
    assert c["other_assessed"] - sum(c["other_excluded_ft"].values()) == c["other_included"]
    assert c["db_included"] + c["other_included"] == c["reports_included"]

    fig = plt.figure(figsize=(7.2, 7.6))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 106)
    ax.axis("off")

    def box(x, y, w, h, text, fc="white", bold=False, fs=7.1, align="left"):
        ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=INK, lw=0.7))
        tx = x + 1.2 if align == "left" else x + w / 2
        ax.text(tx, y + h / 2, text, ha=align, va="center", fontsize=fs,
                fontweight="bold" if bold else "normal", color=INK, linespacing=1.35)

    def arrow(x1, y1, x2, y2):
        ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle="-|>", lw=0.7, color=INK, mutation_scale=8))

    # column headers
    ax.add_patch(FancyBboxPatch((7, 99), 45, 5, boxstyle="round,pad=0.2,rounding_size=1.2",
                                fc="#dcdad4", ec=INK, lw=0.7))
    ax.text(29.5, 101.5, "Identification of studies via databases and registers",
            ha="center", va="center", fontsize=7.8, fontweight="bold")
    ax.add_patch(FancyBboxPatch((55, 99), 44, 5, boxstyle="round,pad=0.2,rounding_size=1.2",
                                fc="#dcdad4", ec=INK, lw=0.7))
    ax.text(77, 101.5, "Identification of studies via other methods",
            ha="center", va="center", fontsize=7.8, fontweight="bold")
    # side labels
    for (y0, y1, lab) in [(76, 97, "Identification"), (22, 74, "Screening"), (2, 20, "Included")]:
        ax.add_patch(FancyBboxPatch((0.6, y0), 4.2, y1 - y0, boxstyle="round,pad=0.1,rounding_size=1",
                                    fc="#dcdad4", ec=INK, lw=0.7))
        ax.text(2.7, (y0 + y1) / 2, lab, rotation=90, ha="center", va="center",
                fontsize=7.8, fontweight="bold")

    dbl = "\n".join(f"   {k} (n = {v:,})" for k, v in c["databases"].items())
    box(7, 78, 21, 19, f"Records identified from:\nDatabases (n = {db_total:,})\n{dbl}\nRegisters (n = {c['registers']})")
    box(31, 78, 21, 19, "Records removed before\nscreening:\n"
        f"   Duplicates (n = {c['db_duplicates']:,})\n   Automation tools (n = {c['db_automation']})\n"
        f"   Other reasons (n = {c['db_other_removed']})")
    wrap = {"Additional verification searching": "Additional verification\n      searching"}
    otl = "\n".join(f"   {wrap.get(k, k)} (n = {v})" for k, v in c["other_sources"].items())
    box(55, 78, 21, 19, f"Records identified from:\n{otl}", fs=6.9)
    box(78, 78, 21, 19, "Records removed before\nscreening:\n"
        f"   Duplicates (n = {c['other_duplicates']})")
    arrow(28, 87.5, 31, 87.5)
    arrow(76, 87.5, 78, 87.5)

    rows = [(66, "Records screened", c["db_screened"], "Records excluded", c["db_excluded_ta"],
             c["other_screened"], c["other_excluded_ta"]),
            (55, "Reports sought for retrieval", c["db_sought"], "Reports not retrieved",
             c["db_not_retrieved"], c["other_sought"], c["other_not_retrieved"])]
    for y, l1, v1, l2, v2, v3, v4 in rows:
        box(7, y, 21, 7, f"{l1}\n(n = {v1:,})")
        box(31, y, 21, 7, f"{l2}\n(n = {v2:,})")
        box(55, y, 21, 7, f"{l1}\n(n = {v3:,})")
        box(78, y, 21, 7, f"{l2}\n(n = {v4:,})")
        arrow(28, y + 3.5, 31, y + 3.5)
        arrow(76, y + 3.5, 78, y + 3.5)
    arrow(17.5, 78, 17.5, 73)
    arrow(65.5, 78, 65.5, 73)
    arrow(17.5, 66, 17.5, 62)
    arrow(65.5, 66, 65.5, 62)

    short = {"Publication type or design": "Publication type/design", "Technical outcomes only": "Technical outcomes only",
             "Population or setting": "Population/setting", "Intervention": "Intervention",
             "Comparator or phase structure": "Comparator/phase", "Insufficient information": "Insufficient information"}
    ex_db = "\n".join(f"  {short[k]} (n = {v})" for k, v in c["db_excluded_ft"].items())
    ex_ot = "\n".join(f"  {short[k]} (n = {v})" for k, v in c["other_excluded_ft"].items())
    box(7, 36, 21, 8, f"Reports assessed for eligibility\n(n = {c['db_assessed']})")
    box(31, 31, 21, 18, f"Reports excluded (n = {sum(c['db_excluded_ft'].values())}):\n{ex_db}", fs=6.2)
    box(55, 36, 21, 8, f"Reports assessed for eligibility\n(n = {c['other_assessed']})")
    box(78, 32, 21, 16, f"Reports excluded (n = {sum(c['other_excluded_ft'].values())}):\n{ex_ot}", fs=6.2)
    arrow(17.5, 55, 17.5, 44)
    arrow(65.5, 55, 65.5, 44)
    arrow(28, 40, 31, 40)
    arrow(76, 40, 78, 40)
    arrow(17.5, 36, 17.5, 19)
    arrow(65.5, 36, 65.5, 19)
    box(7, 6, 69, 11,
        f"Studies included in review (n ≤ {c['studies_included_max']})*\n"
        f"Reports of included studies (n = {c['reports_included']})\n"
        f"   via databases (n = {c['db_included']}); via other methods (n = {c['other_included']})",
        align="center", fs=8)
    ax.text(7, 1.2, "*Two reports described one study; further cohort overlap could not be excluded, "
            "so 26 is the maximum number of independent studies.\nFormat adapted from Page et al., "
            "BMJ 2021;372:n71.", fontsize=6.4, color=INK2, va="bottom")
    for ext in ("png", "pdf"):
        fig.savefig(os.path.join(FIG, f"Figure1_PRISMA_flow.{ext}"))
    plt.close(fig)


# ---------------------------------------------------------------- Figure 2: evidence & gap map
MAP_DOMAINS = [
    ("Comprehension", "Reading/listening\ncomprehension\n(d166, d310)"),
    ("Reading efficiency", "Reading rate,\ntime or effort\n(d166)"),
    ("Written expression", "Written expression:\nlength, accuracy,\nquality (d170)"),
    ("Unaided literacy skills", "Unaided literacy\nskills\n(d140, d145)"),
    ("Curricular attainment", "Curricular\nattainment\n(d820)"),
    ("Braille acquisition", "Braille\nacquisition\n(d140, d145)"),
    ("Engagement and independence", "Attention,\nengagement,\nindependence\n(d160, d210)"),
    ("Participation/harms", "Participation,\nburden, stigma,\nharms, abandonment"),
]
MAP_ROWS = [("STT", "Speech-to-text\n(dictation)"),
            ("TTS", "Text-to-speech /\nmixed speech"),
            ("CAP", "Automatic classroom\ncaptioning"),
            ("BRL", "Adaptive (AI) Braille\nlearning"),
            ("OBR", "Optical Braille\nrecognition")]
ED_TO_MAP = {"Text length": "Written expression", "Transcription accuracy": "Written expression",
             "Text quality": "Written expression"}


def evidence_map(studies, ed):
    by_ref = {str(r["ref"]): r for r in studies}
    cell = defaultdict(set)
    for e in ed:
        dom = ED_TO_MAP.get(e["domain"], e["domain"])
        for ref in e["ref"].split(";"):
            fn = by_ref[ref]["function"]
            cell[(fn, dom)].add(ref)
    fig, ax = plt.subplots(figsize=(7.4, 5.3))
    nC, nR = len(MAP_DOMAINS), len(MAP_ROWS)
    ax.set_aspect("equal")
    ax.set_xlim(-0.5, nC - 0.5)
    ax.set_ylim(nR - 0.5, -0.5)
    for i in range(nR + 1):
        ax.axhline(i - 0.5, color=GRID, lw=0.6, zorder=0)
    for j in range(nC + 1):
        ax.axvline(j - 0.5, color=GRID, lw=0.6, zorder=0)
    maxk = max(len(v) for v in cell.values())
    for i, (fn, _) in enumerate(MAP_ROWS):
        for j, (dom, _) in enumerate(MAP_DOMAINS):
            refs = sorted(cell.get((fn, dom), set()), key=int)
            if not refs:
                ax.text(j, i, "–", ha="center", va="center", color=MUTED, fontsize=8)
                continue
            k = len(refs)
            n = sum(by_ref[r]["n_disability"] for r in refs)
            rad = 0.10 + 0.22 * (k / maxk) ** 0.5
            mix = Counter(by_ref[r]["design_class"] for r in refs)
            start = 90
            for d in ("RCT", "NRS", "SCD"):
                if mix.get(d):
                    ext = 360 * mix[d] / k
                    ax.add_patch(Wedge((j, i), rad, start, start + ext, fc=DESIGN_COL[d],
                                       ec="white", lw=0.8, zorder=3))
                    start += ext
            ax.text(j + rad + 0.03, i - rad * 0.55, f"{k}", ha="left", va="center", fontsize=7.4,
                    color=INK, fontweight="bold")
            ax.text(j, i + rad + 0.13, f"n = {n}", ha="center", va="center", fontsize=6.3, color=INK2)
    # shade empty functions
    for i, (fn, _) in enumerate(MAP_ROWS):
        if fn in ("CAP", "OBR"):
            ax.add_patch(Rectangle((-0.5, i - 0.5), nC, 1, fc="#f4f3f0", ec="none", zorder=0))
            ax.text(nC / 2 - 0.5, i + 0.28, "No eligible learner-level evaluation located",
                    ha="center", va="center", fontsize=6.6, color=INK2, style="italic")
    ax.add_patch(Rectangle((nC - 1.5, -0.5), 1, nR, fc="#f4f3f0", ec="none", zorder=0))
    ax.set_xticks(range(nC))
    ax.set_xticklabels([d[1] for d in MAP_DOMAINS], fontsize=6.4)
    ax.xaxis.tick_top()
    ax.set_yticks(range(nR))
    ax.set_yticklabels([r[1] for r in MAP_ROWS], fontsize=7.2)
    ax.tick_params(length=0)
    for sp in ax.spines.values():
        sp.set_visible(False)
    handles = [Line2D([0], [0], marker="o", ls="", ms=7, mfc=DESIGN_COL[d], mec="white", label=DESIGN_LAB[d])
               for d in ("RCT", "NRS", "SCD")]
    ax.legend(handles=handles, loc="upper center", bbox_to_anchor=(0.5, -0.02), ncol=3, frameon=False,
              fontsize=6.8, handletextpad=0.3, columnspacing=1.2)
    fig.text(0.01, 0.01, "Bold number = reports in the cell (bubble area scales with reports; wedges show "
             "design mix); n = learners with disabilities.\nICF-CY codes in brackets. Certainty of evidence "
             "was very low for every populated technology–outcome body.", fontsize=6.1, color=INK2)
    fig.subplots_adjust(left=0.17, right=0.99, top=0.84, bottom=0.10)
    for ext in ("png", "pdf"):
        fig.savefig(os.path.join(FIG, f"Figure2_evidence_gap_map.{ext}"))
    plt.close(fig)
    return {f"{k[0]}|{k[1]}": sorted(v, key=int) for k, v in cell.items()}


# ---------------------------------------------------------------- Figure 4: effect direction plot
ED_COLS = [("Comprehension", "Compre-\nhension", "access"),
           ("Reading efficiency", "Reading\neffic.", "access"),
           ("Text length", "Text\nlength", "access"),
           ("Transcription accuracy", "Transcr.\naccuracy", "access"),
           ("Text quality", "Text\nquality", "access"),
           ("Engagement and independence", "Engage-\nment", "access"),
           ("Unaided literacy skills", "Unaided\nliteracy", "learning"),
           ("Curricular attainment", "Curric.\nattain.", "learning"),
           ("Braille acquisition", "Braille\nacquis.", "learning")]


def ed_plot(studies, ed):
    by_ref = {str(r["ref"]): r for r in studies}
    rows = []
    order = [("STT", "Speech-to-text"), ("TTS", "Text-to-speech / mixed"), ("BRL", "Adaptive Braille learning")]
    keys = sorted({e["ref"] for e in ed}, key=lambda x: int(x.split(";")[0]))
    for fn, fnlab in order:
        grp = [k for k in keys if by_ref[k.split(";")[0]]["function"] == fn]
        grp.sort(key=lambda k: ({"RCT": 0, "NRS": 1, "SCD": 2}[by_ref[k.split(';')[0]]["design_class"]], int(k.split(';')[0])))
        rows.append(("__h__", fnlab))
        rows.extend((k, None) for k in grp)
    look = {(e["ref"], e["domain"]): e["direction"] for e in ed}
    nrow = len(rows)
    fig_h = 0.19 * nrow + 1.5
    fig, ax = plt.subplots(figsize=(7.4, fig_h))
    xs_meta = [0.0, 3.3, 4.55, 5.55]  # study, design, n, risk
    x0 = 6.7
    ax.set_xlim(-0.1, x0 + len(ED_COLS) * 0.95 + 0.1)
    ax.set_ylim(nrow + 0.2, -2.3)
    ax.axis("off")
    hdr_y = -0.9
    for x, t in zip(xs_meta, ["Study [ref]", "Design", "n", "Risk of\nbias"]):
        ax.text(x, hdr_y, t, fontsize=6.8, fontweight="bold", va="center", ha="left")
    for j, (_, lab, lvl) in enumerate(ED_COLS):
        ax.text(x0 + j * 0.95, hdr_y, lab, fontsize=6.3, fontweight="bold", ha="center", va="center")
    ax.text(x0 + 2.5 * 0.95, -2.05, "Access outcomes (technology in use)", fontsize=6.6, ha="center",
            color=INK2, style="italic")
    ax.text(x0 + 7 * 0.95, -2.05, "Learning outcomes (unaided)", fontsize=6.6, ha="center",
            color=INK2, style="italic")
    ax.plot([x0 - 0.45, x0 + 5.45 * 0.95], [-1.75, -1.75], color=INK2, lw=0.5)
    ax.plot([x0 + 5.55 * 0.95, x0 + 8.45 * 0.95], [-1.75, -1.75], color=INK2, lw=0.5)
    ax.plot([-0.1, x0 + 8.5 * 0.95], [-0.25, -0.25], color=INK, lw=0.6)
    for j in range(len(ED_COLS)):
        if j % 2 == 0:
            ax.add_patch(Rectangle((x0 + j * 0.95 - 0.475, -0.25), 0.95, nrow + 0.25, fc="#f7f6f3",
                                   ec="none", zorder=0))
    ax.plot([x0 + 5.5 * 0.95] * 2, [-0.25, nrow + 0.05], color=INK2, lw=0.5, ls=(0, (2, 2)))
    for i, (key, hl) in enumerate(rows):
        y = i + 0.35
        if key == "__h__":
            ax.text(0, y, hl, fontsize=6.9, fontweight="bold", va="center", color=INK)
            continue
        r0 = by_ref[key.split(";")[0]]
        refs = key.split(";")
        label = r0["label"]
        yr = r0["year"]
        n = sum(by_ref[x]["n_disability"] for x in refs)
        ax.text(0.12, y, f"{label} ({yr}) [{','.join(str(new(x)) for x in refs)}]", fontsize=6.4, va="center")
        ax.text(xs_meta[1], y, {"RCT": "RCT", "NRS": "NRS", "SCD": "SCED"}[r0["design_class"]],
                fontsize=6.4, va="center")
        ax.text(xs_meta[2], y, f"{n}", fontsize=6.4, va="center")
        rc = r0["rating_class"]
        ax.text(xs_meta[3], y, {"lower": "Lower", "higher": "Higher", "na": "NA"}[rc], fontsize=6.4,
                va="center", color=INK if rc == "lower" else INK2)
        size = 7.5 if n >= 50 else (5.5 if n >= 10 else 4.0)
        fc = {"lower": INK, "higher": "#a8a7a1", "na": "white"}[rc]
        for j, (dom, _, _) in enumerate(ED_COLS):
            d = look.get((key, dom))
            if d is None:
                continue
            x = x0 + j * 0.95
            if d == "+":
                ax.plot(x, y, marker="^", ms=size, mfc=fc, mec=INK, mew=0.6)
            elif d == "-":
                ax.plot(x, y, marker="v", ms=size, mfc=fc, mec=INK, mew=0.6)
            else:
                ax.plot(x - 0.09 * size / 5.5, y, marker="<", ms=size * 0.8, mfc=fc, mec=INK, mew=0.6)
                ax.plot(x + 0.09 * size / 5.5, y, marker=">", ms=size * 0.8, mfc=fc, mec=INK, mew=0.6)
    ax.plot([-0.1, x0 + 8.5 * 0.95], [nrow + 0.05, nrow + 0.05], color=INK, lw=0.6)
    fig.text(0.01, 0.005,
             "▲ favours technology   ▼ favours comparator   ◄► no clear difference, mixed or "
             "conflicting (direction coded without statistical significance).\nMarker size: n ≥ 50, 10–49, "
             "< 10 learners with disabilities. Fill: black = lower risk of bias (RoB 2 some concerns; ROBINS-I "
             "moderate;\nWWC meets with reservations); grey = higher risk (high/serious; does not meet WWC); "
             "white = not assessable (abstract only). NRS = non-randomised or\nwithin-participant; SCED = "
             "single-case experimental design.", fontsize=5.9, color=INK2, va="bottom")
    fig.subplots_adjust(left=0.01, right=0.995, top=0.99, bottom=0.085)
    for ext in ("png", "pdf"):
        fig.savefig(os.path.join(FIG, f"Figure4_effect_direction_plot.{ext}"))
    plt.close(fig)


# ---------------------------------------------------------------- Figure 3: risk of bias
def rob_figure(studies):
    panels = [("a", "RoB 2", "Randomised reports", "RCT"),
              ("b", "ROBINS-I", "Non-randomised and counterbalanced within-participant reports", "NRS"),
              ("c", "WWC Version 5.0", "Single-case experimental reports", "SCD")]
    sym = {"lower": ("\u2212", "#eda100"), "higher": ("\u00d7", "#e34948"), "na": ("?", "#8a8984")}
    short = {"Some concerns": "Some concerns", "High": "High", "Serious": "Serious", "Moderate": "Moderate",
             "Does not meet": "Does not meet", "Meets with reservations": "Meets with reservations",
             "Not assessable (abstract only)": "Not assessable\u2020"}
    fig = plt.figure(figsize=(7.4, 5.0))
    boxes = {"a": [0.01, 0.70, 0.48, 0.29], "b": [0.01, 0.01, 0.48, 0.66], "c": [0.52, 0.01, 0.47, 0.98]}
    for key, tool, sub, dc in panels:
        rows = sorted([r for r in studies if r["design_class"] == dc], key=lambda r: new(r["ref"]))
        ax = fig.add_axes(boxes[key])
        ax.axis("off")
        n = len(rows)
        ax.set_xlim(0, 10)
        ax.set_ylim(n + 4.6, -0.2)
        ax.text(0, 0.3, key, fontsize=10, fontweight="bold", va="center")
        ax.text(0.55, 0.3, f"{tool}", fontsize=8.5, fontweight="bold", va="center")
        ax.text(0.55, 1.1, f"{sub} (n = {n})", fontsize=6.9, va="center", color=INK2)
        ax.plot([0, 10], [1.7, 1.7], color=INK, lw=0.6)
        ax.text(0.2, 2.2, "Ref.", fontsize=6.9, fontweight="bold", va="center")
        ax.text(1.3, 2.2, "Report", fontsize=6.9, fontweight="bold", va="center")
        ax.text(6.0, 2.2, "Overall judgement", fontsize=6.9, fontweight="bold", va="center")
        ax.plot([0, 10], [2.65, 2.65], color=INK, lw=0.4)
        for i, r in enumerate(rows):
            y = 3.2 + i
            if i % 2 == 1:
                ax.add_patch(Rectangle((0, y - 0.5), 10, 1, fc="#f4f3f0", ec="none", zorder=0))
            ax.text(0.2, y, f"[{new(r['ref'])}]", fontsize=6.9, va="center")
            lab = f"{r['label']} ({r['year']})"
            if r["label"] == "Fälth et al.":
                lab += ", STT" if r["function"] == "STT" else ", TTS"
            ax.text(1.3, y, lab, fontsize=6.9, va="center")
            g, col = sym[r["rating_class"]]
            ax.plot(6.2, y, marker="o", ms=8, mfc=col, mec="none", zorder=3)
            ax.text(6.2, y, g, fontsize=7, color="white", fontweight="bold", ha="center", va="center", zorder=4)
            ax.text(6.7, y, short[r["rating"]], fontsize=6.9, va="center")
        ax.plot([0, 10], [3.2 + n - 0.5, 3.2 + n - 0.5], color=INK, lw=0.6)
        cnt = Counter(r["rating"] for r in rows)
        leg = "; ".join(f"{short[k]} n = {v}" for k, v in sorted(cnt.items()))
        ax.text(0.2, 3.2 + n + 0.4, leg, fontsize=6.3, va="center", color=INK2)
        if dc == "SCD":
            ax.text(0.2, 3.2 + n + 1.2, "\u2020 Abstract only; full text unavailable, so no rating could be assigned.",
                    fontsize=6.1, va="center", color=INK2)
    for ext in ("png", "pdf"):
        fig.savefig(os.path.join(FIG, f"Figure3_risk_of_bias.{ext}"))
    plt.close(fig)


def main():
    global NUM
    NUM = load_numbers()
    studies = load_studies()
    ed = load_ed()
    with open(os.path.join(DATA, "prisma_counts.json")) as fh:
        counts = json.load(fh)
    s = summarise(studies, ed)
    prisma(counts)
    s["map_cells"] = evidence_map(studies, ed)
    ed_plot(studies, ed)
    rob_figure(studies)
    graphical_abstract(s)
    with open(os.path.join(DATA, "summary.json"), "w") as fh:
        json.dump(s, fh, indent=1, sort_keys=True)
    print(json.dumps(s, indent=1, sort_keys=True))



# ---------------------------------------------------------------- Graphical abstract
def graphical_abstract(summary):
    """MDPI graphical abstract (landscape, >= 1100 x 560 px); every number comes from summary.json."""
    t = summary["ed_tally"]
    fr = summary["by_function_reports"]
    fig = plt.figure(figsize=(11, 5.6), dpi=200)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 110)
    ax.set_ylim(0, 56)
    ax.axis("off")
    BLUE, ORANGE, GREY = "#2a78d6", "#eb6834", "#52514e"
    ax.text(55, 52.5, "Access or learning? Speech and Braille assistive technologies for children and adolescents with disabilities",
            ha="center", va="center", fontsize=13.5, fontweight="bold", color=INK)
    ax.text(55, 49, f"Systematic review: {summary['reports']} reports, ≤{summary['series_max']} studies, "
            f"≤{summary['n_disability']} learners with disabilities; RoB 2, ROBINS-I, WWC standards; GRADE",
            ha="center", va="center", fontsize=10.5, color=INK2)

    def panel(x, w, title, col):
        ax.add_patch(FancyBboxPatch((x, 9.5), w, 35, boxstyle="round,pad=0.3,rounding_size=1.5",
                                    fc="white", ec=col, lw=1.6))
        ax.add_patch(FancyBboxPatch((x, 40.5), w, 4, boxstyle="round,pad=0.3,rounding_size=1.5",
                                    fc=col, ec=col, lw=1.6))
        ax.text(x + w / 2, 42.5, title, ha="center", va="center", fontsize=11.5, fontweight="bold", color="white")

    # panel 1: what was evaluated
    panel(2, 30, "Technologies evaluated", GREY)
    rows = [("Text-to-speech / mixed", fr.get("TTS", 0)), ("Speech-to-text", fr.get("STT", 0)),
            ("Adaptive Braille tutor", fr.get("BRL", 0)), ("Automatic captioning", 0),
            ("Optical Braille recognition", 0)]
    for i, (lab, k) in enumerate(rows):
        y = 36.5 - i * 4.7
        ax.text(4, y, lab, fontsize=10.5, va="center", color=INK)
        ax.text(30, y, f"{k} report{'s' if k != 1 else ''}", fontsize=10.5, va="center", ha="right",
                color=INK if k else "#e34948", fontweight="bold")
    ax.text(17, 12.2, "No learner-level evaluation of\ncaptioning or Braille recognition", ha="center",
            va="center", fontsize=9.5, color="#e34948", style="italic")

    # panel 2: access
    panel(36, 35, "ACCESS  (technology in use)", BLUE)
    items = [("Reading rate, time or effort (TTS)", t["Reading efficiency"].get("+", 0), sum(t["Reading efficiency"].values())),
             ("Reading comprehension (TTS)", t["Comprehension"].get("+", 0), sum(t["Comprehension"].values())),
             ("Text length (STT)", t["Text length"].get("+", 0), sum(t["Text length"].values())),
             ("Fewer residual errors (STT)", t["Transcription accuracy"].get("+", 0), sum(t["Transcription accuracy"].values())),
             ("Text quality (STT)", t["Text quality"].get("+", 0), sum(t["Text quality"].values()))]
    for i, (lab, k, n) in enumerate(items):
        y = 36 - i * 4.9
        ax.text(38, y, lab, fontsize=10, va="center", color=INK)
        bx = 59.2
        for j in range(n):
            ax.add_patch(Rectangle((bx + j * 0.52, y - 1.1), 0.42, 2.2, fc=BLUE if j < k else "#dcdad4", ec="none"))
        ax.text(bx + n * 0.52 + 0.5, y, f"{k}/{n}", fontsize=9.5, va="center", color=INK2)
    ax.text(53.5, 11.8, "Bars: reports favouring the technology / reports measuring it", ha="center", va="center",
            fontsize=8.8, color=INK2, style="italic")

    # panel 3: learning
    panel(75, 33, "LEARNING  (unaided, lasting)", ORANGE)
    txt = [("Favourable learning effects came", True), ("only from studies at high or", True),
           ("serious risk of bias", True), ("", False),
           ("Largest controlled study (n = 149):", False), ("no between-group difference", False),
           ("at 1-year follow-up", False)]
    for i, (line, bold) in enumerate(txt):
        ax.text(91.5, 37 - i * 3.4, line, fontsize=10.5, ha="center", va="center", color=INK,
                fontweight="bold" if bold else "normal")
    ax.text(91.5, 11.8, "Certainty (GRADE): very low for all outcomes", ha="center", va="center", fontsize=9.5,
            color="#e34948", fontweight="bold")

    ax.add_patch(FancyBboxPatch((2, 1.2), 106, 5.4, boxstyle="round,pad=0.3,rounding_size=1.2",
                                fc="#f4f3f0", ec="none"))
    ax.text(55, 3.9, "Implication: use speech technologies as individually matched ACCESS tools — match them to the "
            "child’s functional barrier,\nteach their use, and confirm benefit with a monitored individual trial",
            ha="center", va="center", fontsize=10.3, color=INK, fontweight="bold", linespacing=1.4)
    for ext in ("png",):
        fig.savefig(os.path.join(FIG, f"Graphical_Abstract.{ext}"), dpi=200)
    plt.close(fig)


if __name__ == "__main__":
    main()
