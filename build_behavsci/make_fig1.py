import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
plt.rcParams["font.family"]="DejaVu Sans"
W,H=8.27,11.0
fig=plt.figure(figsize=(W,H)); ax=fig.add_axes([0,0,1,1]); ax.set_xlim(0,W); ax.set_ylim(0,H); ax.axis("off")
EDGE="#3a4a5a"; FILL="#ffffff"; HEAD="#dbe6f0"; INC="#e8f1e4"; STAGE="#c9d8e8"
FS=7.7
def box(x,y,w,h,txt,fill=FILL,bold=False,fs=FS,ha="center"):
    ax.add_patch(FancyBboxPatch((x,y),w,h,boxstyle="round,pad=0,rounding_size=0.04",fc=fill,ec=EDGE,lw=0.8))
    tx = x+w/2 if ha=="center" else x+0.08
    ax.text(tx,y+h/2,txt,ha=ha,va="center",fontsize=fs,fontweight="bold" if bold else "normal",linespacing=1.3)
    return (x,y,w,h)
def arr(x1,y1,x2,y2):
    ax.annotate("",xy=(x2,y2),xytext=(x1,y1),arrowprops=dict(arrowstyle="-|>",color=EDGE,lw=0.8,mutation_scale=7,shrinkA=0,shrinkB=0))
def down(b1,b2): arr(b1[0]+b1[2]/2,b1[1],b1[0]+b1[2]/2,b2[1]+b2[3])
def right(b1,b2): y=b2[1]+b2[3]/2; arr(b1[0]+b1[2],y,b2[0],y)
def stage(y0,y1,label):
    ax.add_patch(FancyBboxPatch((0.12,y0),0.26,y1-y0,boxstyle="round,pad=0,rounding_size=0.04",fc=STAGE,ec="none"))
    ax.text(0.25,(y0+y1)/2,label,rotation=90,ha="center",va="center",fontsize=8,fontweight="bold")
# columns
L1,L2,R1,R2=0.48,2.30,4.42,6.24; MW,SW=1.62,1.88
# ---------- Phase 1 ----------
ax.text(0.12,10.80,"Phase 1: database and supplementary searches (22–23 July 2026)",fontsize=9.0,fontweight="bold",va="center")
box(L1,10.38,MW+SW+0.2,0.28,"Identification of studies via databases",fill=HEAD,bold=True)
box(R1,10.38,MW+SW+0.12,0.28,"Identification of studies via other methods",fill=HEAD,bold=True)
a=box(L1,9.34,MW,0.96,"Records identified from\ndatabases (n = 4025):\nPubMed (n = 437)\nWeb of Science (n = 1286)\nScopus (n = 1704)\nAPA PsycInfo (n = 598)")
a2=box(L2+0.2,9.62,SW-0.2,0.5,"Records removed before\nscreening: duplicates\n(n = 1564)")
b=box(R1,9.34,MW,0.96,"Records identified from:\nGoogle Scholar (n = 200)\nCitation searching (n = 43)\nPublisher websites (n = 19)\nVerification searches (n = 8)")
b2=box(R2+0.12,9.62,SW-0.2,0.5,"Records removed before\nscreening: duplicates\n(n = 22)")
right(a,a2); right(b,b2)
a3=box(L1,8.78,MW,0.4,"Records screened\n(n = 2461)"); a4=box(L2+0.2,8.78,SW-0.2,0.4,"Records excluded\n(n = 2354)")
b3=box(R1,8.78,MW,0.4,"Records screened\n(n = 248)"); b4=box(R2+0.12,8.78,SW-0.2,0.4,"Records excluded\n(n = 219)")
down(a,a3); down(b,b3); right(a3,a4); right(b3,b4)
a5=box(L1,8.18,MW,0.4,"Reports sought for retrieval\n(n = 107)"); a6=box(L2+0.2,8.18,SW-0.2,0.4,"Reports not retrieved\n(n = 6)")
b5=box(R1,8.18,MW,0.4,"Reports sought for retrieval\n(n = 29)"); b6=box(R2+0.12,8.18,SW-0.2,0.4,"Reports not retrieved\n(n = 2)")
down(a3,a5); down(b3,b5); right(a5,a6); right(b5,b6)
a7=box(L1,7.18,MW,0.4,"Reports assessed for\neligibility (n = 101)")
a8=box(L2+0.2,6.88,SW-0.2,1.0,"Reports excluded (n = 84):\nPublication type/design (n = 21)\nTechnical outcomes only (n = 25)\nPopulation/setting (n = 15)\nIntervention (n = 8)\nComparator/phases (n = 11)\nInsufficient information (n = 4)",ha="left",fs=6.5)
b7=box(R1,7.18,MW,0.4,"Reports assessed for\neligibility (n = 27)")
b8=box(R2+0.12,6.88,SW-0.2,1.0,"Reports excluded (n = 17):\nPublication type/design (n = 6)\nTechnical outcomes only (n = 3)\nPopulation/setting (n = 4)\nIntervention (n = 1)\nComparator/phases (n = 3)",ha="left",fs=6.5)
down(a5,a7); down(b5,b7); right(a7,(0,0,0,a8[1]*2+a8[3]-a7[1]*2-0.0)) if False else None
arr(a7[0]+a7[2],a7[1]+0.2,a8[0],a7[1]+0.2); arr(b7[0]+b7[2],b7[1]+0.2,b8[0],b7[1]+0.2)
c=box(L1+1.1,6.12,4.2,0.46,"Reports included after Phase 1 (n = 27):\nfrom databases (n = 17); from other methods (n = 10)",fill=INC,bold=True)
# connectors from assessed boxes to included box
for bx in (a7,b7):
    xm=bx[0]+bx[2]/2
    if xm<c[0] or xm>c[0]+c[2]:
        xt=min(max(xm,c[0]+0.3),c[0]+c[2]-0.3); ax.plot([xm,xm,xt],[bx[1],6.72,6.72],color=EDGE,lw=0.8); arr(xt,6.72,xt,c[1]+c[3])
    else: arr(xm,bx[1],xm,c[1]+c[3])
c2=box(R2+0.12,6.12,SW-0.2,0.46,"Excluded on re-checking\n(prerecorded human\nspeech; n = 1)")
right(c,c2)
c3=box(L1+1.1,5.52,4.2,0.36,"Phase 1 reports retained (n = 26)",fill=INC,bold=True)
down(c,c3)
stage(9.34,10.30,"Identification"); stage(6.88,9.18,"Screening"); stage(5.52,6.58,"Included")
ax.plot([0.12,8.15],[5.25,5.25],color="#9aa8b6",lw=0.7,ls=(0,(4,3)))
# ---------- Phase 2 ----------
ax.text(0.12,5.0,"Phase 2: supplementary ERIC and targeted searches (2 October 2026; cutoff 23 July 2026)",fontsize=9.0,fontweight="bold",va="center")
d=box(L1,4.18,MW,0.5,"ERIC records identified\n(n = 267)")
d2=box(L2+0.2,4.08,SW-0.2,0.7,"Records removed:\nduplicates within ERIC (n = 2)\nalready included in\nPhase 1 (n = 15)")
right(d,d2)
d3=box(L1,3.48,MW,0.4,"Records screened\n(n = 250)"); d4=box(L2+0.2,3.48,SW-0.2,0.4,"Records excluded\n(n = 219)")
down(d,d3); right(d3,d4)
d5=box(L1,2.88,MW,0.4,"ERIC reports for\nassessment (n = 31)")
down(d3,d5)
e=box(R1-0.9,2.88,MW,0.4,"Targeted and citation\ncandidates (n = 6)")
f=box(L1+1.1,2.08,4.2,0.46,"Unique candidate reports assessed for eligibility (n = 37)")
for bx in (d5,e):
    xm=bx[0]+bx[2]/2; xt=min(max(xm,f[0]+0.3),f[0]+f[2]-0.3)
    ax.plot([xm,xm,xt],[bx[1],2.68,2.68],color=EDGE,lw=0.8); arr(xt,2.68,xt,f[1]+f[3])
f2=box(R2+0.12,2.62,SW-0.2,0.7,"Reports excluded (n = 7):\nPopulation (n = 4)\nIntervention (n = 2)\nDesign (n = 1)",ha="left",fs=6.5)
f3=box(R2+0.12,1.86,SW-0.2,0.46,"Reports awaiting\nclassification (n = 9)")
xs=f[0]+f[2]; ym=f[1]+f[3]/2; ax.plot([xs,R2-0.05],[ym,ym],color=EDGE,lw=0.8)
ax.plot([R2-0.05,R2-0.05],[f3[1]+f3[3]/2,f2[1]+f2[3]/2],color=EDGE,lw=0.8)
arr(R2-0.05,f2[1]+f2[3]/2,f2[0],f2[1]+f2[3]/2); arr(R2-0.05,f3[1]+f3[3]/2,f3[0],f3[1]+f3[3]/2)
g=box(L1+1.1,1.36,4.2,0.40,"Reports included from Phase 2 (n = 21)",fill=INC,bold=True)
down(f,g)
h=box(L1+0.5,0.42,5.4,0.56,"Total reports included in the review (n = 47)\n26 from Phase 1 + 21 from Phase 2",fill="#cfe3c6",bold=True,fs=8.4)
down(g,h)
stage(2.88,4.78,"Identification/\nscreening"); stage(2.08,2.54,"Eligibility") if False else None
stage(0.42,2.54,"Eligibility/included")
for ext in ("png","pdf","tiff"):
    fig.savefig(f"/home/user/build/fig/Figure1_PRISMA_flow.{ext}",dpi=600 if ext!="pdf" else None, **({"pil_kwargs":{"compression":"tiff_lzw"}} if ext=="tiff" else {}))
