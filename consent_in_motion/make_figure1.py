"""Draws Figure 1: Consent in motion conceptual model."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

plt.rcParams["font.family"] = "DejaVu Sans"
fig, ax = plt.subplots(figsize=(13, 9.2), dpi=300)
ax.set_xlim(0, 130); ax.set_ylim(0, 92); ax.axis("off")

INK, MUTED = "#1f2a36", "#5b6773"
TEAL, TEAL_L = "#1f6f78", "#e3f0f1"
SAND = "#f6f1e7"

def box(x, y, w, h, fc, ec, lw=1.2, r=1.6, z=1):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0,rounding_size={r}",
                                fc=fc, ec=ec, lw=lw, zorder=z))

def text(x, y, s, size=10, w="normal", c=INK, ha="center", va="center", z=5, style="normal"):
    ax.text(x, y, s, fontsize=size, fontweight=w, color=c, ha=ha, va=va, zorder=z,
            fontstyle=style, linespacing=1.3)

# Outer conditions layer
box(1, 1, 128, 90, SAND, "#c9b98f", lw=1.4, r=3)
text(65, 87.6, "RELATIONAL AND ORGANISATIONAL CONDITIONS", 10.5, "bold", "#7a6531")
conds = ["Room arrangement and\ncontrol of access", "Companion presence\nand chosen role",
         "Language concordance and\ninterpreter access", "Staffing, time pressure\nand mobilisation targets",
         "Continuity of carer and\nhandover of preferences", "Professional scripts and\nreferral pathways"]
for i, c in enumerate(conds):
    text(11.5 + i * 21.4, 82.4, c, 8.3, c="#6b5a2e")

# Inner core
box(5, 5, 120, 72, "white", TEAL, lw=1.6, r=2.5, z=2)
text(65, 72.5, "CONSENT IN MOTION", 15, "bold", TEAL)
text(65, 68.6, "Permission reopened at each movement threshold, held by the woman's authority over her body",
     9.3, c=MUTED, style="italic")

# Thresholds
labels = ["Turning\nto the side", "Sitting at\nbed edge", "Standing", "Walking", "Bathroom /\ntoileting"]
fills = ["#e3f0f1", "#c8e2e4", "#a6cfd3", "#7fb8be", "#1f6f78"]
x0, bw, gap = 10, 18.6, 4.2
for i, (lab, fc) in enumerate(zip(labels, fills)):
    x = x0 + i * (bw + gap)
    box(x, 55, bw, 9, fc, TEAL, lw=1.1, z=3)
    text(x + bw / 2, 59.5, lab, 9.4, "bold", "white" if i == 4 else INK)
    if i < 4:
        ax.add_patch(FancyArrowPatch((x + bw + 0.4, 59.5), (x + bw + gap - 0.4, 59.5),
                     arrowstyle="-|>", mutation_scale=13, color=TEAL, lw=1.4, zorder=4))
    text(x + bw / 2, 53.3, "re-ask", 7.8, c=TEAL, style="italic")
text(x0 + 4 * (bw + gap) + bw / 2, 66, "most sensitive threshold", 7.8, c=TEAL, style="italic")

# Channels
chans = [("TALK", "naming each contact and transition before it happens"),
         ("TOUCH", "predictable hand placement, away from the wound, open to adjustment"),
         ("COVER (sitr)", "covering and controlling access before contact, not after"),
         ("TIMING", "the woman sets the pace; a pause is explored, not only treated as pain")]
for i, (k, d) in enumerate(chans):
    y = 45 - i * 5.4
    box(10, y - 2.1, 110, 4.2, TEAL_L, "#9cc6ca", lw=0.8, r=1, z=3)
    text(13, y, k, 9, "bold", TEAL, ha="left")
    text(36, y, d, 8.8, c=INK, ha="left")
text(65, 49.4, "Four channels that carry consent across every threshold", 8.6, "bold", MUTED)

# Outcomes
box(10, 7.5, 53, 16.5, "#e8f3ea", "#3d8b55", lw=1.3, z=3)
text(36.5, 21.4, "CONSENT SUSTAINED", 10, "bold", "#2e6e42")
text(12.5, 13.8, "• thresholds made visible and revocable\n• cover before contact\n"
     "• pause read as a question\n• woman chooses the form of companion help",
     8.5, ha="left")
box(67, 7.5, 53, 16.5, "#f7e9e7", "#a3473b", lw=1.3, z=3)
text(93.5, 21.4, "CONSENT ERODED", 10, "bold", "#8a3a2f")
text(69.5, 13.8, "• 'yes' to rising treated as standing permission\n• touch first, cover after\n"
     "• explanation reduced to demonstration\n• each profession assumes the other asked",
     8.5, ha="left")
ax.add_patch(FancyArrowPatch((36.5, 27.6), (36.5, 24.4), arrowstyle="-|>", mutation_scale=12,
             color="#3d8b55", lw=1.4, zorder=4))
ax.add_patch(FancyArrowPatch((93.5, 27.6), (93.5, 24.4), arrowstyle="-|>", mutation_scale=12,
             color="#a3473b", lw=1.4, zorder=4))

fig.savefig("Figure1_Consent_in_Motion.png", bbox_inches="tight", facecolor="white")
fig.savefig("Figure1_Consent_in_Motion.svg", bbox_inches="tight", facecolor="white")
