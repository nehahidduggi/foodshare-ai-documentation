import { useState } from 'react'
import P from '../data/project.json'
export function Matrix() {
  const [f, setF] = useState(-1)
  return (<div><div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter by role"><button className={`chip ${f < 0 ? 'bg-leaf/20' : ''}`} onClick={() => setF(-1)}>All</button>{P.perms.cols.map((c, i) => <button key={c} className={`chip ${f === i ? 'bg-leaf/20' : ''}`} onClick={() => setF(i)}>{c}</button>)}</div>
    <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[520px] text-sm"><thead className="bg-navy-800"><tr><th className="p-3 text-left">Capability</th>{P.perms.cols.map((c, i) => (f < 0 || f === i) && <th key={c} className="p-3">{c}</th>)}</tr></thead>
      <tbody>{P.perms.rows.map(([n, v]) => <tr key={n} className="border-t border-white/5 hover:bg-white/5"><td className="p-3">{n}</td>{v.map((x, i) => (f < 0 || f === i) && <td key={i} className="p-3 text-center">{x ? <span className="text-leaf" aria-label="Allowed">✔</span> : <span className="text-slate-600" aria-label="Not allowed">–</span>}</td>)}</tr>)}</tbody></table></div>
    <p className="mt-2 text-xs text-slate-500">{P.perms.note}</p></div>)
}
export function ER() {
  const [h, setH] = useState(null); const T = Object.entries(P.db)
  return <div className="grid gap-4 sm:grid-cols-2">{T.map(([t, f]) => (<div key={t} onMouseEnter={() => setH(t)} onMouseLeave={() => setH(null)} className={`card ${h === t ? 'border-sky' : ''}`}><p className="font-mono font-semibold text-leaf">{t}</p><ul className="mt-2 grid grid-cols-1 gap-x-4 font-mono text-xs text-slate-300 sm:grid-cols-2">{f.map(x => <li key={x} className={/_id$/.test(x) ? 'text-amber' : ''}>{x}</li>)}</ul></div>))}
    <svg viewBox="0 0 400 40" className="hidden sm:col-span-2 sm:block" aria-hidden><text fill="#8aa0c4" fontSize="12" x="200" y="22" textAnchor="middle">users ⟶ surplus_food_logs ⟶ claims_and_deliveries · users ⟶ demand_forecasts (via *_id keys)</text></svg></div>
}
export function Glossary() {
  const [q, setQ] = useState(''); const r = P.glossary.filter(([t, d]) => (t + d).toLowerCase().includes(q.toLowerCase()))
  return <div><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search glossary…" aria-label="Search glossary" className="mb-4 w-full rounded-lg border border-white/15 bg-navy-900 px-3 py-2" /><dl className="grid gap-3 sm:grid-cols-2">{r.map(([t, d]) => <div key={t} className="card"><dt className="font-semibold text-leaf">{t}</dt><dd className="text-sm text-slate-300">{d}</dd></div>)}</dl>{!r.length && <p className="text-slate-500">No terms match.</p>}</div>
}
export function Tests() {
  const [o, setO] = useState(null)
  return <div className="space-y-2">{P.tests.map(([id, t]) => <div key={id} className="card py-3"><button className="flex w-full justify-between text-left" aria-expanded={o === id} onClick={() => setO(o === id ? null : id)}><span><b className="text-sky">{id}</b> {t}</span><span>{o === id ? '–' : '+'}</span></button>{o === id && <p className="mt-2 text-sm text-slate-400">Steps / expected result: [ADD HERE]</p>}</div>)}
    <div className="flex flex-wrap gap-2 pt-2">{P.testTypes.map(x => <span key={x} className="chip">{x}</span>)}</div></div>
}
export function Copy({ text }) {
  const [d, setD] = useState(false)
  return <button className="chip" onClick={() => { navigator.clipboard?.writeText(text); setD(true); setTimeout(() => setD(false), 1500) }}>{d ? 'Copied' : 'Copy'}</button>
}
export function Risks() {
  const c = { High: 'text-red-400', Medium: 'text-amber' }
  return <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-sm"><thead className="bg-navy-800"><tr><th className="p-3 text-left">Risk</th><th className="p-3">Severity</th><th className="p-3 text-left">Mitigation</th></tr></thead><tbody>{P.risks.map(([r, s, m]) => <tr key={r} className="border-t border-white/5"><td className="p-3">{r}</td><td className={`p-3 text-center font-semibold ${c[s]}`}>● {s}</td><td className="p-3 text-slate-300">{m}</td></tr>)}</tbody></table></div>
}
