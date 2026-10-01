import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'
export function Section({ id, title, kicker, children }) {
  const [ref, seen] = useInView({ threshold: 0.08 })
  return (<section id={id} ref={ref} className={`reveal ${seen ? 'in' : ''} mx-auto max-w-5xl px-5 py-14`} aria-labelledby={id + '-h'}>
    <h2 id={id + '-h'} className="h2">{title}</h2>{kicker && <p className="mt-2 max-w-2xl text-slate-400">{kicker}</p>}<div className="mt-8">{children}</div></section>)
}
export function Counter({ to, suffix = '' }) {
  const [ref, seen] = useInView(); const [v, setV] = useState(0)
  useEffect(() => { if (!seen) return; let t0; const run = t => { t0 ??= t; const k = Math.min((t - t0) / 1400, 1); setV(Math.round(to * k)); if (k < 1) requestAnimationFrame(run) }; requestAnimationFrame(run) }, [seen])
  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>
}
export const Tag = ({ children }) => <span className="chip">{children}</span>
