import P from '../data/project.json'
import useInView from '../hooks/useInView'
import { Counter } from './Ui'
const Demo = () => <span className="chip border-amber/40 text-amber">Illustrative Demo Data</span>
export function Forecast() {
  const v = [40, 55, 48, 70, 62, 38, 30]
  return <figure className="card"><svg viewBox="0 0 280 130" className="w-full" role="img" aria-label="Illustrative bar chart of predicted versus prepared meals">
    {v.map((h, i) => <g key={i}><rect className="rise" style={{ animationDelay: i * 0.1 + 's' }} x={15 + i * 38} y={110 - h} width="24" height={h} rx="4" fill="#22c58b" /><circle cx={27 + i * 38} cy={110 - h * 0.9} r="3" fill="#ff9a3c" /></g>)}
    <line x1="10" x2="275" y1="110" y2="110" stroke="#334" /></svg><figcaption className="mt-2 flex items-center gap-2 text-sm text-slate-400"><Demo />Predicted meals (bars) vs. a demo reference (dots)</figcaption></figure>
}
export function Scan() {
  return <figure className="card"><svg viewBox="0 0 160 130" className="mx-auto w-48" role="img" aria-label="Food image being scanned"><rect x="20" y="15" width="120" height="100" rx="12" fill="#0f1f45" stroke="#4fd8e8" /><circle cx="80" cy="65" r="30" fill="#ff9a3c" opacity=".8" /><circle cx="68" cy="58" r="8" fill="#22c58b" /><rect className="scan" x="22" y="18" width="116" height="3" fill="#4fd8e8" /></svg>
    <figcaption className="mt-2 text-center text-sm text-slate-400">Fresh · Borderline · Spoiled + confidence</figcaption></figure>
}
export function Route() {
  const [ref, seen] = useInView()
  return <figure ref={ref} className="card"><svg viewBox="0 0 400 190" className="w-full" role="img" aria-label="Route from food source to NGO">
    <rect width="400" height="190" rx="12" fill="#0b1836" />{[40, 90, 140].map(y => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#16264f" />)}
    <path className={seen ? 'draw in' : 'draw'} d="M50 150 C120 150 120 60 200 80 S320 130 350 40" fill="none" stroke="#22c58b" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="150" r="9" fill="#ff9a3c" /><circle cx="350" cy="40" r="9" fill="#a99bff" />
    <text x="60" y="176" fill="#fff" fontSize="11">Food source (pickup)</text><text x="258" y="28" fill="#fff" fontSize="11">NGO destination</text>
    <circle r="6" fill="#4fd8e8"><animateMotion dur="5s" repeatCount="indefinite" path="M50 150 C120 150 120 60 200 80 S320 130 350 40" /></circle>
    <rect x="150" y="110" width="110" height="30" rx="8" fill="#0f1f45" stroke="#4fd8e8" /><text x="205" y="129" textAnchor="middle" fill="#fff" fontSize="11">ETA: [ADD HERE]</text></svg>
    <figcaption className="mt-2 text-sm text-slate-400">Pickup → Optimized Route → NGO → OTP → Delivered (OpenStreetMap · OSRM · Leaflet)</figcaption></figure>
}
export function Pins() {
  return <figure className="card"><svg viewBox="0 0 200 120" className="mx-auto w-56" role="img" aria-label="Surplus source connected to nearby NGOs">
    {[[40, 30], [160, 35], [150, 100]].map(([x, y], i) => <line key={i} x1="90" y1="60" x2={x} y2={y} stroke="#4fd8e8" className="flow" />)}
    <circle cx="90" cy="60" r="12" fill="#ff9a3c" />{[[40, 30], [160, 35], [150, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill="#a99bff" />)}</svg>
    <figcaption className="text-center text-sm text-slate-400">Verified NGOs within radius</figcaption></figure>
}
const ILL = [<svg key="s" viewBox="0 0 60 40" className="h-16"><circle cx="15" cy="20" r="8" fill="#ff9a3c" className="bob" /><circle cx="30" cy="20" r="8" fill="#4fd8e8" /><circle cx="45" cy="20" r="8" fill="#22c58b" /></svg>, <svg key="e" viewBox="0 0 60 40" className="h-16"><path className="bob" d="M30 4c10 8 14 18 6 28H24C16 22 20 12 30 4z" fill="#22c58b" /></svg>, <svg key="m" viewBox="0 0 60 40" className="h-16"><rect className="rise" x="10" y="20" width="10" height="16" fill="#ff9a3c" /><rect className="rise" x="25" y="10" width="10" height="26" fill="#22c58b" /><rect className="rise" x="40" y="4" width="10" height="32" fill="#4fd8e8" /></svg>]
export function ImpactCards() {
  return <div className="grid gap-4 sm:grid-cols-3">{P.impact.map(([t, l], i) => (<article key={t} className="card">{ILL[i]}<h3 className="mt-2 font-display text-xl text-white">{t}</h3><ul className="mt-2 space-y-1 text-sm text-slate-300">{l.map(x => <li key={x}>• {x}</li>)}</ul></article>))}</div>
}
export function Dashboard() {
  const m = [['Food saved', 1280, 'kg', 'Estimated'], ['Meals redistributed', 3400, '', 'Project calculation'], ['CO₂e avoided', 3200, 'kg', 'Estimated'], ['Value recovered', 96000, '', 'Project calculation']]
  return (<div><div className="mb-3"><Demo /></div><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{m.map(([t, n, u, tag], i) => (<div key={t} className="card"><p className="text-sm text-slate-400">{t}</p><p className="mt-1 font-display text-3xl font-bold text-white">{i === 3 && '₹'}<Counter to={n} />{u && <span className="text-lg text-leaf"> {u}</span>}</p><span className="text-xs text-amber">{tag}</span></div>))}</div>
    <div className="mt-4 grid gap-4 md:grid-cols-2"><Forecast /><figure className="card"><svg viewBox="0 0 280 130" className="w-full" role="img" aria-label="Illustrative waste and redistribution trend lines"><polyline fill="none" stroke="#ff9a3c" strokeWidth="3" points="10,30 55,40 100,55 145,60 190,80 235,90 270,100" /><polyline fill="none" stroke="#22c58b" strokeWidth="3" points="10,100 55,90 100,80 145,65 190,50 235,40 270,30" /></svg>
      <figcaption className="text-sm text-slate-400"><span className="text-amber">Waste trend</span> vs <span className="text-leaf">redistribution trend</span> (demo)</figcaption></figure></div></div>)
}
