"""Seeded simulation that generates every numerical value reported in the simulated-exemplar Methods.

All values are fictitious and produced for teaching. Running this script reproduces simulated_values.json exactly.
"""
import itertools
import json
import math
import sys
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
rng = np.random.default_rng(20260212)
OUT = sys.argv[1] if len(sys.argv) > 1 else "simulated_values.json"
V = {}

# ------------------------------------------------------------------ cohort
N_SEC, SEC_SIZE, N_FAC = 15, 30, 5
ARMS = ["AI", "SM", "WS"]
sec = pd.DataFrame({"section": range(1, 16), "facilitator": np.repeat(range(1, 6), 3)})
sec["weekday"] = np.tile([1, 2, 3], 5)                   # Sunday, Monday, Tuesday
sec["afternoon"] = [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1]   # 6 afternoon sections (2 per weekday)
stu = pd.DataFrame({"id": range(1, 451), "section": np.repeat(range(1, 16), 30)})
stu["group"] = (stu["section"] - 1) * 6 + np.tile(np.repeat(range(6), 5), 15) + 1
sec_eff = rng.normal(0, 0.18, 16)
stu["gpa"] = np.clip(rng.normal(2.95 + sec_eff[stu.section], 0.42), 1.8, 4.0).round(2)
stu["english"] = np.clip(rng.normal(74 + 8 * (stu.gpa - 2.95), 8.5), 50, 100).round(0)
stu["sim_sessions"] = rng.poisson(3.1, 450)
stu["mapping_use"] = rng.binomial(1, 0.34, 450)
stu["ai_use"] = rng.binomial(1, 0.71, 450)
stu["age"] = np.round(rng.normal(21.1, 0.8, 450), 1)
stu["female"] = rng.binomial(1, 0.78, 450)

# ------------------------------------------------------------------ knowledge pilot: 96 items, 104 examinees
n_pilot = 104
b = rng.normal(-0.1, 0.65, 96)
a = rng.uniform(0.6, 1.6, 96)
a[rng.choice(96, 6, replace=False)] = rng.uniform(0.05, 0.2, 6)   # weakly discriminating items
theta_p = rng.normal(0, 1, n_pilot)
P = 0.25 + 0.75 / (1 + np.exp(-1.7 * a * (theta_p[:, None] - b[None, :])))
X = (rng.random(P.shape) < P).astype(int)
diff = X.mean(0)
tot = X.sum(1)
pbis = np.array([np.corrcoef(X[:, i], tot - X[:, i])[0, 1] for i in range(96)])
ok = (diff >= 0.30) & (diff <= 0.80) & (pbis >= 0.20)
V["pilot_items_retained"] = int(ok.sum())
cand = np.where(ok)[0]
# assemble two parallel 40-item forms by alternating sorted difficulty
order = cand[np.argsort(diff[cand])][: 80]
formA, formB = order[0::2], order[1::2]
def kr20(M):
    k = M.shape[1]; p = M.mean(0); var = M.sum(1).var(ddof=1)
    return k / (k - 1) * (1 - (p * (1 - p)).sum() / var)
V["pilot_kr20_A"], V["pilot_kr20_B"] = round(kr20(X[:, formA]), 2), round(kr20(X[:, formB]), 2)
V["pilot_diff_A"], V["pilot_diff_B"] = round(diff[formA].mean(), 2), round(diff[formB].mean(), 2)

# ------------------------------------------------------------------ baseline knowledge (random groups)
theta = 0.55 * (stu.gpa - 2.95) / 0.42 + rng.normal(0, 0.83, 450)
stu["theta"] = theta
seq = np.array(["AB"] * 225 + ["BA"] * 225); rng.shuffle(seq)
stu["seq"] = seq
def take(form_items, th, shift=0.0):
    P = 0.25 + 0.75 / (1 + np.exp(-1.7 * a[form_items][None, :] * ((th + shift)[:, None] - b[form_items][None, :] - 0.35)))
    return (rng.random(P.shape) < P).astype(int)
XA = take(formA, theta.values); XB = take(formB, theta.values)
base_raw = np.where(stu.seq == "AB", XA.sum(1), XB.sum(1))
stu["know0_raw"] = base_raw
gA, gB = stu.seq == "AB", stu.seq == "BA"
mA, sA = base_raw[gA].mean(), base_raw[gA].std(ddof=1)
mB, sB = base_raw[gB].mean(), base_raw[gB].std(ddof=1)
slope, icpt = sA / sB, mA - sA / sB * mB
V.update(eq_nA=int(gA.sum()), eq_nB=int(gB.sum()), eq_mA=round(mA, 2), eq_sA=round(sA, 2), eq_mB=round(mB, 2),
         eq_sB=round(sB, 2), eq_slope=round(slope, 3), eq_icpt=round(icpt, 3))
V["kr20_base_A"] = round(kr20(XA[gA.values]), 2); V["kr20_base_B"] = round(kr20(XB[gB.values]), 2)
stu["know0"] = np.where(gA, base_raw, slope * base_raw + icpt)

# ------------------------------------------------------------------ allocation: 6^5 within-facilitator assignments
perms = list(itertools.permutations(range(3)))
fac_secs = [sec[sec.facilitator == f].section.tolist() for f in range(1, 6)]
smeans = stu.groupby("section").agg(gpa=("gpa", "mean"), know=("know0", "mean"), eng=("english", "mean"),
                                    sim=("sim_sessions", "mean"), mapu=("mapping_use", "mean"))
z = (smeans - smeans.mean()) / smeans.std(ddof=1)
best, n_adm, n_all = None, 0, 0
for combo in itertools.product(perms, repeat=5):
    n_all += 1
    arm_of = {}
    for f, pm in enumerate(combo):
        for k, s in enumerate(fac_secs[f]):
            arm_of[s] = pm[k]
    arms = np.array([arm_of[s] for s in range(1, 16)])
    pm_ok = all(1 <= ((arms == g) & (sec.weekday.values == d)).sum() <= 2 for g in range(3) for d in (1, 2, 3))
    aft = [((arms == g) & (sec.afternoon.values == 1)).sum() for g in range(3)]
    if not (pm_ok and max(aft) - min(aft) <= 1):
        continue
    n_adm += 1
    means = np.array([z.values[arms == g].mean(0) for g in range(3)])
    obj = sum(np.abs(means[i] - means[j]).sum() for i, j in ((0, 1), (0, 2), (1, 2)))
    if best is None or obj < best[0] - 1e-12:
        best = (obj, arms)
V["alloc_total"], V["alloc_admissible"] = n_all, n_adm
sec["arm"] = [ARMS[g] for g in best[1]]
stu = stu.merge(sec[["section", "arm", "facilitator", "weekday", "afternoon"]], on="section")
# max absolute standardised difference (student level) between arms for the five balancing variables
def smd(x, g1, g2):
    return abs(x[g1].mean() - x[g2].mean()) / math.sqrt((x[g1].var() + x[g2].var()) / 2)
mx = 0
for v in ["gpa", "know0", "english", "sim_sessions", "mapping_use"]:
    for g1, g2 in (("AI", "SM"), ("AI", "WS"), ("SM", "WS")):
        mx = max(mx, smd(stu[v], stu.arm == g1, stu.arm == g2))
V["alloc_max_smd"] = round(mx, 3)

# ------------------------------------------------------------------ attendance and follow-up (fixed design counts)
V["attend"] = {"AI": [141, 7, 2], "SM": [139, 9, 2], "WS": [140, 8, 2]}
V["missing"] = {"AI": {"illness": 3, "travel": 2, "placement": 1, "withdrawal": 0},
                "SM": {"illness": 2, "travel": 3, "placement": 2, "withdrawal": 1},
                "WS": {"illness": 3, "travel": 2, "placement": 1, "withdrawal": 1}}
for g, n in zip(ARMS, (6, 8, 7)):
    assert sum(V["missing"][g].values()) == n and sum(V["attend"][g]) == 150
assert [sum(V["missing"][g][k] for g in ARMS) for k in ("illness", "travel", "placement", "withdrawal")] == [8, 7, 4, 2]

# ------------------------------------------------------------------ content validity (8 experts, two rounds)
def cvi_block(n_items, n_weak, rng):
    """Return per-item counts of experts rating 3 or 4."""
    counts = rng.choice([7, 8], size=n_items, p=[0.22, 0.78])
    weak = rng.choice(n_items, n_weak, replace=False)
    counts[weak] = rng.choice([5, 6], size=n_weak)
    return counts
def mk(c, n=8):
    pc = math.comb(n, c) * 0.5 ** n
    return (c / n - pc) / (1 - pc)
cvi = {}
for name, n_items, n_weak in (("PN-CRER", 32, 3), ("PNNKT", 96, 7), ("PNPSC", 15, 1), ("cases", 8, 1)):
    r1 = cvi_block(n_items, n_weak, rng)
    r2 = r1.copy()
    low = r2 < 7
    r2[low] = rng.choice([7, 8], size=low.sum(), p=[0.5, 0.5])   # revised items re-rated
    i2 = r2 / 8
    cvi[name] = dict(items=n_items, revised=int(low.sum()), r1_below=int((r1 / 8 < 0.78).sum()),
                     icvi_min=round(i2.min(), 2), scvi_ave=round(i2.mean(), 2), scvi_ua=round((r2 == 8).mean(), 2),
                     kappa_min=round(min(mk(c) for c in r2), 2))
V["cvi"] = cvi

# ------------------------------------------------------------------ rating data (case totals built from domain scores)
cases = {c: rng.normal(0, 0.10) for c in range(1, 9)}           # case difficulty on the domain metric
rater_sev = {1: 0.05, 2: -0.04, 3: 0.02, 4: -0.03}
# post-instruction gain (generic, not reported)
rec = []
ass_cases = {}
for i, s in stu.iterrows():
    young = rng.permutation([1, 2, 3, 4]); school = rng.permutation([5, 6, 7, 8])
    ass_cases[s.id] = {0: (young[0], school[0]), 1: (young[1], school[1])}
miss_ids = []
for g, n in zip(ARMS, (6, 8, 7)):
    miss_ids += list(rng.choice(stu[stu.arm == g].id.values, n, replace=False))
miss_ids = set(miss_ids)
pc_dev = {}
for _, s in stu.iterrows():
    for occ in (0, 1):
        if occ == 1 and s.id in miss_ids:
            continue
        for c in ass_cases[s.id][occ]:
            mu = 1.25 + 0.42 * s.theta + 0.35 * occ + cases[c]
            dev = rng.normal(0, 0.20)
            pc_dev[(s.id, occ, c)] = (mu + dev, s.arm)
rec_keys = list(pc_dev.keys())
V["n_case_recordings"] = len(rec_keys)
V["n_proc_recordings"] = 450 + 429

pr_dev = {}
def rate(key, r):
    true, _ = pc_dev[key]
    sid = key[0]
    if (sid, r) not in pr_dev:
        pr_dev[(sid, r)] = rng.normal(0, 0.05)
    lat = true + rater_sev[r] + pr_dev[(sid, r)] + rng.normal(0, 0.05) + rng.normal(0, 0.40, 8) + np.linspace(-0.25, 0.25, 8)
    return np.clip(np.round(lat), 0, 3).astype(int)

keys_df = pd.DataFrame([(k[0], k[1], k[2], pc_dev[k][1]) for k in rec_keys], columns=["id", "occ", "case", "arm"])
keys_df["primary"] = rng.choice([1, 2, 3], len(keys_df))

def icc1(Y):
    n, k = Y.shape
    gm = Y.mean(); msb = k * ((Y.mean(1) - gm) ** 2).sum() / (n - 1)
    msw = ((Y - Y.mean(1, keepdims=True)) ** 2).sum() / (n * (k - 1))
    return (msb - msw) / (msb + (k - 1) * msw)
def icc2(Y):
    n, k = Y.shape
    gm = Y.mean()
    msr = k * ((Y.mean(1) - gm) ** 2).sum() / (n - 1)
    msc = n * ((Y.mean(0) - gm) ** 2).sum() / (k - 1)
    sse = ((Y - Y.mean(1, keepdims=True) - Y.mean(0, keepdims=True) + gm) ** 2).sum()
    mse = sse / ((n - 1) * (k - 1))
    return (msr - mse) / (msr + (k - 1) * mse + k * (msc - mse) / n)
def boot(fn, Y, ids, B=2000):
    uid = np.unique(ids); idx = {u: np.where(ids == u)[0] for u in uid}; out = []
    for _ in range(B):
        sel = np.concatenate([idx[u] for u in rng.choice(uid, len(uid))])
        out.append(fn(Y[sel]))
    return np.percentile(out, [2.5, 97.5])

# monitoring sample: 360 recordings, 60 per arm x occasion stratum
mon = keys_df.groupby(["arm", "occ"]).sample(n=60, random_state=7)
D1, D2 = [], []
for _, k in mon.iterrows():
    key = (k.id, k.occ, k.case)
    D1.append(rate(key, k.primary)); D2.append(rate(key, 4))
D1, D2 = np.array(D1), np.array(D2)
Y = np.c_[D1.sum(1), D2.sum(1)].astype(float)
ci = boot(icc1, Y, mon.id.values)
V["icc_mon"] = [round(icc1(Y), 2), round(ci[0], 2), round(ci[1], 2)]
V["dom_exact"] = round((D1 == D2).mean() * 100, 1); V["dom_adj"] = round((np.abs(D1 - D2) <= 1).mean() * 100, 1)
V["case_total_sd"] = round(Y.std(ddof=1), 2)

# common subset: 60 students (10 per stratum), both cases at one occasion, four raters
parts = []
for g in ARMS:
    ids = rng.choice(sorted(set(stu[stu.arm == g].id) - miss_ids), 20, replace=False)
    parts.append(keys_df[(keys_df.id.isin(ids[:10])) & (keys_df.occ == 0)])
    parts.append(keys_df[(keys_df.id.isin(ids[10:])) & (keys_df.occ == 1)])
common = pd.concat(parts).reset_index(drop=True)
rows = []
for _, k in common.iterrows():
    for r in (1, 2, 3, 4):
        rows.append(dict(id=k.id, case=k.case, rater=r, rec=f"{k.id}-{k.occ}-{k.case}", y=rate((k.id, k.occ, k.case), r).sum()))
G = pd.DataFrame(rows)
V["common_n_rec"], V["common_n_stu"] = int(G.rec.nunique()), int(G.id.nunique())
Yc = G.pivot(index="rec", columns="rater", values="y").values.astype(float)
recid = G.drop_duplicates("rec").set_index("rec").loc[G.pivot(index="rec", columns="rater", values="y").index].id.values
ci = boot(icc2, Yc, recid)
V["icc_common"] = [round(icc2(Yc), 2), round(ci[0], 2), round(ci[1], 2)]

# generalisability: REML crossed random effects (direct likelihood maximisation)
from scipy.optimize import minimize
from scipy.linalg import solve_triangular
G["pr"] = G.id.astype(str) + "_" + G.rater.astype(str)
G["cr"] = G.case.astype(str) + "_" + G.rater.astype(str)
FAC = {"p": "id", "c": "case", "r": "rater", "pc": "rec", "pr": "pr", "cr": "cr"}
def zz(col):
    codes = pd.factorize(col)[0]; Z = np.zeros((len(col), codes.max() + 1)); Z[np.arange(len(col)), codes] = 1
    return Z @ Z.T
def reml(df):
    y = df.y.values.astype(float); n = len(y)
    K = {k: zz(df[c].values) for k, c in FAC.items()}
    names = list(K)
    def nll(lv):
        v = np.exp(lv)
        Vm = sum(v[i] * K[k] for i, k in enumerate(names)) + v[-1] * np.eye(n)
        L = np.linalg.cholesky(Vm)
        Li1 = solve_triangular(L, np.ones(n), lower=True); Liy = solve_triangular(L, y, lower=True)
        xvx = Li1 @ Li1; beta = (Li1 @ Liy) / xvx
        r = Liy - beta * Li1
        return 0.5 * (2 * np.log(np.diag(L)).sum() + np.log(xvx) + r @ r)
    start = np.log(np.r_[np.full(len(names), y.var() / 10), y.var() / 3])
    res = minimize(nll, start, method="L-BFGS-B", bounds=[(-12, 6)] * (len(names) + 1))
    v = np.exp(res.x)
    out = {k: (v[i] if v[i] > 1e-4 else 0.0) for i, k in enumerate(names)}; out["e"] = v[-1]
    return out
def gcoef(cp, nc=2, nr=1):
    rel = cp["p"] / (cp["p"] + cp["pc"] / nc + cp["pr"] / nr + cp["e"] / (nc * nr))
    ab = cp["p"] / (cp["p"] + cp["c"] / nc + cp["r"] / nr + cp["pc"] / nc + cp["pr"] / nr + cp["cr"] / (nc * nr) + cp["e"] / (nc * nr))
    return rel, ab
comp = reml(G)
tot = sum(comp.values())
V["g_comp"] = {k: [round(v, 2), round(100 * v / tot, 1)] for k, v in comp.items()}
rel, ab = gcoef(comp)
bs = []
uid = G.id.unique()
NBOOT = int(__import__('os').environ.get('NBOOT', '200'))
boot_sets = []
for bi in range(NBOOT):
    pick = rng.choice(uid, len(uid))
    parts = []
    for j, u in enumerate(pick):
        d = G[G.id == u].copy(); d["id"] = f"b{j}"; d["rec"] = d["rec"] + f"_{j}"; d["pr"] = d["id"] + "_" + d.rater.astype(str)
        parts.append(d)
    boot_sets.append(pd.concat(parts))
import multiprocessing as mp
def _fit(df):
    return gcoef(reml(df))
with mp.get_context("fork").Pool(4) as pool:
    bs = pool.map(_fit, boot_sets)
bs = np.array(bs)
V["g_rel"] = [round(rel, 2)] + [round(x, 2) for x in np.percentile(bs[:, 0], [2.5, 97.5])]
V["g_abs"] = [round(ab, 2)] + [round(x, 2) for x in np.percentile(bs[:, 1], [2.5, 97.5])]
V["g_boot_n"] = int(len(bs))
V["g_rel_4cases"] = round(gcoef(comp, 4, 1)[0], 2)

# procedural checklist: 225 double-rated recordings, rotating primary-rater pairs
pairs = [(1, 2), (1, 3), (2, 3)]
pp = []
for i in range(225):
    occ = 0 if i < 113 else 1
    true = np.clip(rng.normal(17.5 + 5.0 * occ, 4.2), 2, 29)
    r1, r2 = pairs[i % 3]
    pp.append([true + rng.normal(0, 1.25) + 0.2 * (r1 == 1), true + rng.normal(0, 1.25), i])
pp = np.array(pp)
Yp = np.clip(np.round(pp[:, :2]), 0, 30)
ci = boot(icc1, Yp, pp[:, 2])
V["icc_proc"] = [round(icc1(Yp), 2), round(ci[0], 2), round(ci[1], 2)]

# LCJR: 270 recordings (45 per stratum), 135 double-rated
lc = keys_df.groupby(["arm", "occ"]).sample(n=45, random_state=11).reset_index(drop=True)
pn, l1, l2 = [], [], []
for _, k in lc.iterrows():
    key = (k.id, k.occ, k.case)
    pn.append(rate(key, k.primary).sum())
    t = 11 + (pc_dev[key][0] / 3.0) * 33 * 0.62 + rng.normal(0, 2.6)
    l1.append(np.clip(round(t + rng.normal(0, 1.3)), 11, 44)); l2.append(np.clip(round(t + rng.normal(0, 1.3)), 11, 44))
pn, l1, l2 = map(np.array, (pn, l1, l2))
dbl = rng.choice(270, 135, replace=False)
Yl = np.c_[l1[dbl], l2[dbl]].astype(float)
ci = boot(icc1, Yl, lc.id.values[dbl])
V["icc_lcjr"] = [round(icc1(Yl), 2), round(ci[0], 2), round(ci[1], 2)]
corr = lambda M: np.corrcoef(M[:, 0], M[:, 1])[0, 1]
M = np.c_[pn, l1].astype(float)
ci = boot(corr, M, lc.id.values)
V["r_lcjr"] = [round(corr(M), 2), round(ci[0], 2), round(ci[1], 2)]
V["lcjr_n_students"] = int(lc.id.nunique())

# ------------------------------------------------------------------ fidelity double coding (8 sessions x 18 checklist items)
agree_table = np.array([[121, 3], [4, 16]])          # coder1 rows (present, absent) x coder2 cols
po = np.trace(agree_table) / agree_table.sum()
pe = (agree_table.sum(1) * agree_table.sum(0)).sum() / agree_table.sum() ** 2
V["fid_agree"] = round(po * 100, 1); V["fid_kappa"] = round((po - pe) / (1 - pe), 2); V["fid_items"] = int(agree_table.sum())

# ------------------------------------------------------------------ AI map change log
V["map_nodes"] = dict(unchanged=148, modified=41, added=25, deleted=19)
V["map_nodes"]["final"] = 148 + 41 + 25

# ------------------------------------------------------------------ planning precision
from scipy import stats
from scipy.optimize import brentq
DE = 1 + (4.5 - 1) * 0.08 + (27 - 4.5) * 0.03
neff = 135 / DE / 0.75; se = math.sqrt(2 / neff); tc = stats.t.ppf(0.975, 8)
V["power"] = round(1 - stats.nct.cdf(tc, 8, 0.5 / se) + stats.nct.cdf(-tc, 8, 0.5 / se), 2)
V["mdd"] = round(brentq(lambda d: 1 - stats.nct.cdf(tc, 8, d / se) - 0.8, 0.01, 3), 2)
V["DE"] = round(DE, 2)

json.dump(V, open(OUT, "w"), indent=1, default=lambda o: o.item() if hasattr(o, "item") else str(o))
print(json.dumps(V, indent=1, default=lambda o: o.item() if hasattr(o, "item") else str(o)))
