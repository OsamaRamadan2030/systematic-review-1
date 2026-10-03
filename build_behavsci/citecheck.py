import re,sys
from studies import STUDIES
refs=open('refs.txt').read().split('\n')
text=open('manuscript.txt').read()+' '.join(s[0] for s in STUDIES)
extra=' '.join(open(f).read() for f in sys.argv[1:])
def surnames(r):
    au=r.split(' (')[0]
    if not re.search(r'\b[A-Z]\.',au): return [au.rstrip('.')]
    parts=re.split(r',? & |, (?=[A-ZÄÅÖØÆÜÉ][^,]*, [A-Z]\.)',au)
    return [p.split(',')[0].strip() for p in parts if p.strip() and p.strip()!='...']
miss=[]
for r in refs:
    y=re.search(r'\((\d{4}(?:–\d{4})?|n\.d\.)',r).group(1)
    s=surnames(r)
    if r.startswith('Corrigendum'): pats=['Corrigendum, 2021']
    elif len(s)==1: S=re.escape(s[0]); pats=[f'{S}, {y}',f'{S} \\({y}',f'{S}, \\d{{4}}, {y}' ]
    elif len(s)==2: pats=[f'{s[0]} & {s[1]}, {y}',f'{s[0]} and {s[1]} \({y}',f'{s[0]} & {s[1]}, \d{{4}}, {y}',f'{s[0]} and {s[1]} \(\d{{4}}, {y}']
    else: pats=[f'{s[0]}[^()]{{0,25}}et al\.,? \(?(\d{{4}}, )?{y}']
    hit=any(re.search(p,text) for p in pats); hitx=any(re.search(p,extra) for p in pats)
    if not hit: miss.append((s[:2],y,'supp-only' if hitx else 'UNCITED'))
for m in miss: print(m)
# in-text citations without reference
cites=set(re.findall(r'([A-Z][A-Za-zÄÅÖØÆÜÉäåöøæüéóíñ’\-]+(?: [A-Z][a-zäöé\-]+)?(?: et al\.| & [A-Z][\w\-]+| and [A-Z][\w\-]+)?),? \(?(\d{4})\b',text))
print(len(cites))
