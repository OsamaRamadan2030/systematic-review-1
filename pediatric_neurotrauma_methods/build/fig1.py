import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
plt.rcParams["font.family"] = "Liberation Sans"
W, H = 13.0, 12.6
fig, ax = plt.subplots(figsize=(W, H), dpi=200)
ax.set_xlim(0, W); ax.set_ylim(0, H); ax.axis("off")
HL = "#FFF2A8"

def box(x, y, w, h, lines, fill="white", bold_first=False, fs=12.5):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="square,pad=0", lw=1.4, ec="black", fc=fill))
    n = len(lines); lh = 0.36
    y0 = y + h/2 + (n-1)*lh/2
    for i, (t, hl) in enumerate(lines):
        kw = dict(ha="center", va="center", fontsize=fs, fontweight="bold" if (bold_first and i == 0) else "normal")
        if hl:
            kw["bbox"] = dict(boxstyle="square,pad=0.12", fc=HL, ec="none")
        ax.text(x + w/2, y0 - i*lh, t, **kw)

def arrow(x1, y1, x2, y2):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle="-|>", lw=1.4, color="black", mutation_scale=16))

# side stage labels
stages = [(11.15, "Enrolment"), (9.35, "Allocation"), (7.55, "Allocation"), (5.55, "Exposure"), (3.45, "Follow-up"), (1.15, "Analysis")]
top_w = 8.4; top_x = (W - top_w)/2
box(top_x, 10.55, top_w, 1.6, [("Eligible and consented: 450 students", False), ("15 laboratory sections (90 groups of five); 5 facilitators", False),
                                 ("Baseline assessment complete: 450 (reasoning, procedural skills, knowledge)", False)])
arrow(W/2, 10.55, W/2, 10.05)
box(top_x, 8.75, top_w, 1.3, [("Nonrandom section allocation, 12 February 2026", False),
                               ("Deterministic balance rule within facilitator; 5 sections per arm", False)])
cols = [("AI-generated maps", 6, ["Illness [n]", "Travel [n]", "Placement [n]", "Withdrawal [n]"], 144),
        ("Student-generated maps", 8, None, 142),
        ("Worksheets without maps", 7, None, 143)]
cw = 3.9; gap = (W - 3*cw)/4
xs = [gap + i*(cw+gap) for i in range(3)]
for i, (name, miss, _, obs) in enumerate(cols):
    x = xs[i]; cx = x + cw/2
    arrow(W/2, 8.75, cx, 8.25)
    box(x, 6.75, cw, 1.5, [(name, False), ("Allocated: 150 students", False), ("5 sections; 30 groups", False)], bold_first=True)
    arrow(cx, 6.75, cx, 6.35)
    box(x, 4.75, cw, 1.6, [("Received instruction", False), ("Attended ≥3 of 4 sessions: [n]", True), ("Attended 1–2 sessions: [n]", True), ("Attended no session: [n]", True)], bold_first=True)
    arrow(cx, 4.75, cx, 4.35)
    box(x, 2.25, cw, 2.1, [("Post-instruction assessment: %d" % obs, False), ("Not assessed: %d" % miss, False),
                           ("Illness [n]; travel [n]", True), ("Placement [n]; withdrawal [n]", True)], bold_first=True)
    arrow(cx, 2.25, cx, 1.85)
    box(x, 0.2, cw, 1.65, [("Primary analysis (as allocated)", False), ("%d students; 5 sections" % obs, False),
                           ("Imputation sensitivity analysis:", False), ("150 students; 5 sections", False)], bold_first=True)
fig.savefig("figure1.png", bbox_inches="tight", dpi=200, facecolor="white")
