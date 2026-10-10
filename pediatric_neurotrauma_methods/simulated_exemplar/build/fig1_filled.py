"""Participant-flow figure for the simulated exemplar, drawn from simulated_values.json."""
import json
import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

V = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
plt.rcParams["font.family"] = "Liberation Sans"
W, H = 13.0, 12.6
fig, ax = plt.subplots(figsize=(W, H), dpi=200)
ax.set_xlim(0, W); ax.set_ylim(0, H); ax.axis("off")


def box(x, y, w, h, lines, bold_first=False, fs=12.5):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="square,pad=0", lw=1.4, ec="black", fc="white"))
    lh = 0.36
    y0 = y + h / 2 + (len(lines) - 1) * lh / 2
    for i, t in enumerate(lines):
        ax.text(x + w / 2, y0 - i * lh, t, ha="center", va="center", fontsize=fs,
                fontweight="bold" if (bold_first and i == 0) else "normal")


def arrow(x1, y1, x2, y2):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle="-|>", lw=1.4, color="black", mutation_scale=16))


top_w = 8.4; top_x = (W - top_w) / 2
box(top_x, 10.55, top_w, 1.6, ["Eligible and consented: 450 students",
                               "15 laboratory sections (90 groups of five); 5 facilitators",
                               "Baseline assessment complete: 450 (reasoning, procedural skills, knowledge)"])
arrow(W / 2, 10.55, W / 2, 10.05)
box(top_x, 8.75, top_w, 1.3, ["Nonrandom section allocation, 12 February 2026",
                              "Deterministic balance rule within facilitator; 5 sections per arm"])
arms = [("AI-generated maps", "AI", 144), ("Student-generated maps", "SM", 142), ("Worksheets without maps", "WS", 143)]
cw = 3.9; gap = (W - 3 * cw) / 4
for i, (name, key, obs) in enumerate(arms):
    x = gap + i * (cw + gap); cx = x + cw / 2
    att = V["attend"][key]; ms = V["missing"][key]
    arrow(W / 2, 8.75, cx, 8.25)
    box(x, 6.75, cw, 1.5, [name, "Allocated: 150 students", "5 sections; 30 groups"], bold_first=True)
    arrow(cx, 6.75, cx, 6.35)
    box(x, 4.75, cw, 1.6, ["Received instruction", f"Attended ≥3 of 4 sessions: {att[0]}",
                           f"Attended 1–2 sessions: {att[1]}", f"Attended no session: {att[2]}"], bold_first=True)
    arrow(cx, 4.75, cx, 4.35)
    box(x, 2.25, cw, 2.1, [f"Post-instruction assessment: {obs}", f"Not assessed: {150 - obs}",
                           f"Illness {ms['illness']}; holiday travel {ms['travel']}",
                           f"Placement conflict {ms['placement']}; withdrawal {ms['withdrawal']}"], bold_first=True)
    arrow(cx, 2.25, cx, 1.85)
    box(x, 0.2, cw, 1.65, ["Primary analysis (as allocated)", f"{obs} students; 5 sections",
                           "Imputation sensitivity analysis:", "150 students; 5 sections"], bold_first=True)
fig.savefig(OUT, bbox_inches="tight", dpi=200, facecolor="white")
