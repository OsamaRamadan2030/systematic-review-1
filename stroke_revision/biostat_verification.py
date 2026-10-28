"""Reproduces every statistic recomputed in the revision (summary-statistic ANCOVA, ordinal logistic model, chi-square, mRS tests).
Run: python3 biostat_verification.py   (needs numpy, scipy)"""
# ---------- 1. ANCOVA reconstructed from summary statistics ----------
import math
import numpy as np
from scipy import stats, optimize
from scipy import stats
n1,n0=75,74
D={'JH-HLM':((2.81,.92,5.94,1.18,3.13,23.47),(2.72,.88,3.81,1.06,1.09,9.21)),
'HADS-A':((13.21,3.14,7.40,2.83,-5.81,-16.32),(13.38,3.28,11.19,3.06,-2.19,-5.94)),
'HADS-D':((12.83,3.17,7.12,2.64,-5.71,-15.84),(12.61,3.41,10.79,3.04,-1.82,-4.76)),
'NIHSS':((12.41,3.82,7.22,3.14,-5.19,-11.94),(12.14,3.64,10.11,3.42,-2.03,-5.11))}
def run(k,pert=0):
    g1,g0=D[k];S=[]
    for g,n in ((g1,n1),(g0,n0)):
        a,sa,b,sb,ch,t=g
        sdd=abs(ch)*math.sqrt(n)/abs(t); r=(sa**2+sb**2-sdd**2)/(2*sa*sb)+pert
        S.append((n,a,sa,b,sb,r))
    Sxx=[(n-1)*sa**2 for n,a,sa,b,sb,r in S];Sxy=[r*sa*sb*(n-1) for n,a,sa,b,sb,r in S];Syy=[(n-1)*sb**2 for n,a,sa,b,sb,r in S]
    # separate slopes SSE
    SSE_sep=sum(Syy[i]-Sxy[i]**2/Sxx[i] for i in range(2));df_sep=n1+n0-4
    b=sum(Sxy)/sum(Sxx);SSE=sum(Syy)-sum(Sxy)**2/sum(Sxx);df=n1+n0-3;MSE=SSE/df
    Fint=((SSE-SSE_sep)/1)/(SSE_sep/df_sep);pint=stats.f.sf(Fint,1,df_sep)
    xbar=(n1*S[0][1]+n0*S[1][1])/(n1+n0)
    adj=[S[i][3]-b*(S[i][1]-xbar) for i in range(2)]
    dx=S[0][1]-S[1][1];se=math.sqrt(MSE*(1/n1+1/n0+dx**2/sum(Sxx)));d=adj[0]-adj[1];tc=stats.t.ppf(.975,df)
    F=(d/se)**2;eta=F/(F+df)
    return dict(slope=b,r=[round(s[5],3) for s in S],adj=adj,d=d,se=se,lo=d-tc*se,hi=d+tc*se,F=F,eta=eta,Fint=Fint,pint=pint,df=df,MSE=MSE,p=stats.f.sf(F,1,df))
for k in D:
    o=run(k);print(k,{a:(round(v,3) if isinstance(v,float) else v) for a,v in o.items() if a!='adj'},'adj',[round(x,2) for x in o['adj']])
    for pe in(-.05,.05):
        q=run(k,pe);print('   r%+.2f F=%.1f'%(pe,q['F']))

# ---------- 2. proportional-odds model for posttest mRS (Table 5 marginals) ----------
i1=np.array([4,11,28,22,9,1]);c1=np.array([0,2,12,34,22,4])
def probs(p,g):
    th=np.cumsum(np.r_[p[0],np.exp(p[1:5])]);b=p[5]
    cum=1/(1+np.exp(-(th+b*g)));cum=np.r_[cum,1];return np.diff(np.r_[0,cum])  # b>0 => lower mRS in g=1
def nll(p):
    a=probs(p,1);c=probs(p,0)
    return -(np.sum(i1*np.log(a))+np.sum(c1[c1>0]*np.log(c[c1>0])))
r=optimize.minimize(nll,np.r_[-2,np.zeros(4),1.0],method='BFGS',options={'gtol':1e-10})
r=optimize.minimize(nll,r.x,method='Nelder-Mead',options={'maxiter':40000,'xatol':1e-10,'fatol':1e-13})
p=r.x;b=p[5];print('nll',r.fun,'beta',b,'cOR',math.exp(b))
# numeric hessian
def hess(f,x,h=1e-4):
    n=len(x);H=np.zeros((n,n))
    for i in range(n):
        for j in range(n):
            xpp=x.copy();xpp[i]+=h;xpp[j]+=h
            xpm=x.copy();xpm[i]+=h;xpm[j]-=h
            xmp=x.copy();xmp[i]-=h;xmp[j]+=h
            xmm=x.copy();xmm[i]-=h;xmm[j]-=h
            H[i,j]=(f(xpp)-f(xpm)-f(xmp)+f(xmm))/(4*h*h)
    return H
H=hess(nll,p);cov=np.linalg.inv(H);se=math.sqrt(cov[5,5])
print('se',se,'Wald CI',math.exp(b-1.96*se),math.exp(b+1.96*se),'z',b/se,'p',2*stats.norm.sf(abs(b/se)))
# profile LR CI
def prof(bf):
    f=lambda q: nll(np.r_[q,bf])
    rr=optimize.minimize(f,p[:5],method='Nelder-Mead',options={'maxiter':20000,'xatol':1e-9,'fatol':1e-12});return rr.fun
L0=r.fun
g=lambda bf: 2*(prof(bf)-L0)-stats.chi2.ppf(.95,1)
lo=optimize.brentq(g,b-3*se,b);hi=optimize.brentq(g,b,b+3*se)
print('profile CI',math.exp(lo),math.exp(hi),'LR chi2 for beta',2*(prof(0)-L0),'p',stats.chi2.sf(2*(prof(0)-L0),1))
# saturated
sat=-(np.sum(i1*np.log(i1/i1.sum()))+np.sum(c1[c1>0]*np.log(c1[c1>0]/c1.sum())))
dev=2*(r.fun-sat);print('deviance vs saturated',dev,'df',4,'p',stats.chi2.sf(dev,4))
# Brant-type: separate binary logits OR at each cut
for j in range(5):
    a=i1[:j+1].sum();bb=c1[:j+1].sum()
    o=(a/(75-a))/(bb/(74-bb)) if bb>0 and a<75 else float('nan');print('cut',j,a,bb,'OR',o)
