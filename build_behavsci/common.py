import re
from xml.sax.saxutils import escape

ITALIC_STATS = re.compile(r'(?<![\w*])(p|d|n|F|t|r|β)(?= ?[=<>≈]| \()')

def runs(text, size=None, base_bold=False, stats=True):
    """Convert inline markup (*italic*, **bold**, ^sup^) to w:r elements."""
    out = []
    tokens = re.split(r'(\*\*.+?\*\*|\*[^*]+?\*|\^[^^]+?\^)', text)
    for tok in tokens:
        if not tok:
            continue
        b, i, sup = base_bold, False, False
        if tok.startswith('**'):
            tok, b = tok[2:-2], True
        elif tok.startswith('*') and tok.endswith('*') and len(tok) > 1:
            tok, i = tok[1:-1], True
        elif tok.startswith('^'):
            tok, sup = tok[1:-1], True
        parts = [(tok, i)]
        if stats and not i:
            parts = []
            pos = 0
            for m in ITALIC_STATS.finditer(tok):
                parts.append((tok[pos:m.start()], False)); parts.append((m.group(0), True)); pos = m.end()
            parts.append((tok[pos:], False))
        for t, it in parts:
            if not t:
                continue
            rpr = ''
            if b: rpr += '<w:b/>'
            if it: rpr += '<w:i/>'
            if sup: rpr += '<w:vertAlign w:val="superscript"/>'
            if size: rpr += f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>'
            out.append(f'<w:r>{"<w:rPr>"+rpr+"</w:rPr>" if rpr else ""}<w:t xml:space="preserve">{escape(t)}</w:t></w:r>')
    return ''.join(out)

def para(style, text, ppr_extra='', size=None, bold=False, stats=True):
    return f'<w:p><w:pPr><w:pStyle w:val="{style}"/>{ppr_extra}</w:pPr>{runs(text, size, bold, stats)}</w:p>'
