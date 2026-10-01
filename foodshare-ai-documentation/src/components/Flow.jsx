import { useState } from 'react'
import P from '../data/project.json'
import useInView from '../hooks/useInView'
export function Workflow() {
  const [ref, seen] = useInView({ threshold: 0.05 }); const [on, setOn] = useState(null)
  return (
    <div ref={ref} className={`relative ${seen ? 'in' : ''}`}>
      <svg className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-1 sm:block" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden="true"><line x1="1" y1="0" x2="1" y2="100" stroke="#22c58b" strokeWidth="2" className="draw" pathLength="100" style={{ strokeDasharray: 100, strokeDashoffset: seen ? 0 : 100, transition: 'stroke-dashoffset 3s ease' }} /></svg>
      <ol className="space-y-3">{P.flow.map(([t, d], i) => (
        <li key={t}><button onClick={() => setOn(on === i ? null : i)} aria-expanded={on === i} className="card flex w-full items-start gap-4 text-left sm:ml-1">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold ${i === 0 || i === 10 ? 'bg-amber text-navy-950' : 'bg-leaf text-navy-950'}`}>{i + 1}</span>
          <span><span className="block font-display text-lg font-semibold text-white">{t}</span><span className={`block text-sm text-slate-400 ${on === i ? '' : 'line-clamp-1'}`}>{d}</span></span></button></li>))}
      </ol></div>)
}
export function MatchFlow() {
  return <ol className="flex flex-wrap items-center gap-2">{P.matching.map((m, i) => (<li key={m} className="flex items-center gap-2"><span className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm">{m}</span>{i < P.matching.length - 1 && <span className="text-sky" aria-hidden>›</span>}</li>))}</ol>
}
export function Architecture() {
  const [h, setH] = useState(0); const cols = ['#4fd8e8', '#22c58b', '#ff9a3c', '#a99bff']
  return (<div className="grid gap-5 lg:grid-cols-5">
    <svg viewBox="0 0 300 420" className="w-full lg:col-span-3" role="img" aria-label="Architecture: React to Express to FastAPI to PostgreSQL PostGIS">
      {P.arch.map(([t, s], i) => { const y = 10 + i * 105; return (<g key={t} onMouseEnter={() => setH(i)} onFocus={() => setH(i)} onClick={() => setH(i)} tabIndex="0" style={{ cursor: 'pointer' }}>
        <rect x="30" y={y} width="240" height="62" rx="14" fill="#0f1f45" stroke={cols[i]} strokeWidth={h === i ? 3 : 1.2} />
        <text x="150" y={y + 27} textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">{t}</text>
        <text x="150" y={y + 46} textAnchor="middle" fill="#8aa0c4" fontSize="11">{s}</text>
        {i < 3 && <><line x1="150" y1={y + 62} x2="150" y2={y + 105} stroke={cols[i]} strokeWidth="2" className="flow" /><circle r="4" fill="#ff9a3c" cx="150"><animate attributeName="cy" from={y + 62} to={y + 105} dur="1.8s" repeatCount="indefinite" /></circle></>}</g>) })}
    </svg>
    <div className="card lg:col-span-2" aria-live="polite"><p className="chip">{P.arch[h][1]}</p><h3 className="mt-3 font-display text-xl text-white">{P.arch[h][0]}</h3><p className="mt-2 text-slate-300">{P.arch[h][2]}</p>
      <p className="mt-4 text-sm text-slate-400">Route Optimization uses OpenStreetMap / OSRM alongside the backend. ML services: Demand Forecasting and Quality Model.</p></div></div>)
}
