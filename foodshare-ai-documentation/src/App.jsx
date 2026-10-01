import { useEffect, useState } from 'react'
import P from './data/project.json'
import { Navbar, Sidebar, Footer, Progress, NAV } from './components/Layout'
import Hero from './components/Hero'
import { Section } from './components/Ui'
import { Workflow, MatchFlow, Architecture } from './components/Flow'
import { Forecast, Scan, Route, Pins, ImpactCards, Dashboard } from './components/Visuals'
import { Matrix, ER, Glossary, Tests, Risks, Copy } from './components/Docs'

const Grid = ({ items, cols = 'sm:grid-cols-2 lg:grid-cols-3' }) => <div className={`grid gap-4 ${cols}`}>{items}</div>
const Cd = ({ t, d, tag }) => <article className="card">{tag && <span className="chip mb-2">{tag}</span>}<h3 className="font-display text-lg font-semibold text-white">{t}</h3>{d && <p className="mt-1 text-sm text-slate-300">{d}</p>}</article>

export default function App() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState('overview'); const [top, setTop] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-30% 0px -60% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    const f = () => setTop(scrollY > 600); addEventListener('scroll', f); return () => { io.disconnect(); removeEventListener('scroll', f) }
  }, [])
  return (<>
    <a href="#how" className="sr-only focus:not-sr-only focus:fixed focus:z-[70] focus:bg-white focus:p-2 focus:text-black">Skip to content</a>
    <Progress /><Navbar open={open} setOpen={setOpen} /><Sidebar open={open} setOpen={setOpen} active={active} />
    <main className="pt-0 lg:pl-64">
      <Hero />
      <div className="mx-auto max-w-5xl px-5"><Grid items={P.caps.map(([t, d]) => <Cd key={t} t={t} d={d} />)} /></div>
      <Section id="problem" title="Problem" kicker="Static menus, manual estimates and informal calls leave edible food wasted while NGOs lack real-time visibility.">
        <Grid items={P.problems.map(p => <Cd key={p} t={p} />)} /></Section>
      <Section id="solution" title="Solution" kicker="Predict → Prevent → Verify → Match → Deliver → Measure">
        <Grid items={P.why.map(([t, d]) => <Cd key={t} t={t} d={d} />)} />
        <h3 className="mt-10 font-display text-2xl text-white">Why FoodShare AI?</h3><p className="mt-1 text-slate-400">Prevent waste first. When surplus occurs, verify it, match it and redistribute it, then measure the impact.</p></Section>
      <Section id="how" title="How It Works" kicker="Eleven connected stages from forecast to sustainable impact. Select a stage to expand it.">
        <Workflow />
        <div className="mt-10 grid gap-4 md:grid-cols-2"><Forecast /><Scan /><Pins /><Route /></div>
        <h3 className="mb-3 mt-10 font-display text-2xl text-white">Smart NGO Matching</h3><MatchFlow />
        <p className="mt-3 text-sm text-slate-400">If food stays unclaimed, the search radius can be expanded according to system rules. This is a food-redistribution matching engine, not a generic recommender.</p></Section>
      <Section id="ai" title="AI & Intelligence" kicker="Target specifications, not independently verified real-world performance.">
        <Grid cols="md:grid-cols-2" items={P.ai.map(([t, m, d]) => <Cd key={t} t={t} tag={m} d={d} />)} />
        <p className="mt-4 text-sm text-amber">Quality output is an AI-assisted freshness assessment, not an absolute guarantee of food safety. Spoiled items never proceed to redistribution.</p></Section>
      <Section id="users" title="Users & Roles"><Grid cols="md:grid-cols-2" items={P.roles.map(([t, d]) => <Cd key={t} t={t} d={d} />)} /><div className="mt-6"><Matrix /></div></Section>
      <Section id="architecture" title="System Architecture" kicker="Hover or focus a layer to learn what it does."><Architecture /></Section>
      <Section id="stack" title="Technology Stack"><div className="grid gap-4 sm:grid-cols-2">{Object.entries(P.stack).map(([k, v]) => <div key={k} className="card"><p className="mb-2 font-display text-white">{k}</p><div className="flex flex-wrap gap-2">{v.map(x => <span key={x} className="chip">{x}</span>)}</div></div>)}</div></Section>
      <Section id="database" title="Database Design" kicker="PostgreSQL + PostGIS. Hover a table to highlight it."><ER /></Section>
      <Section id="security" title="Security & Reliability" kicker="Security controls specified in the project architecture."><Grid items={P.security.map(s => <Cd key={s} t={s} />)} /></Section>
      <Section id="requirements" title="Functional Requirements"><div className="space-y-2">{P.fr.map(([i, t]) => <div key={i} className="card flex gap-3 py-3"><b className="w-14 shrink-0 text-sky">{i}</b><span>{t}</span><span className="ml-auto"><Copy text={`${i}: ${t}`} /></span></div>)}</div></Section>
      <Section id="rules" title="Business Rules"><Grid items={P.br.map(([i, t]) => <Cd key={i} tag={i} t={t} />)} /></Section>
      <Section id="mvp" title="MVP Scope"><Grid cols="sm:grid-cols-2" items={Object.entries(P.mvp).map(([k, v]) => <div key={k} className={`card ${k === 'Not in MVP' ? 'opacity-70' : ''}`}><p className={`font-display text-lg ${k === 'Must have' ? 'text-leaf' : k === 'Should have' ? 'text-sky' : k === 'Could have' ? 'text-amber' : 'text-slate-400'}`}>{k}</p><ul className="mt-2 text-sm">{v.map(x => <li key={x}>• {x}</li>)}</ul></div>)} /></Section>
      <Section id="testing" title="Testing & Acceptance"><Tests /><h3 className="mb-3 mt-10 font-display text-2xl text-white">Acceptance Criteria</h3><Grid items={P.accept.map(a => <Cd key={a} t={'✔ ' + a} />)} />
        <h3 className="mb-3 mt-10 font-display text-2xl text-white">Risks & Mitigation</h3><Risks /></Section>
      <Section id="roadmap" title="Implementation Roadmap">
        <div className="relative"><svg viewBox="0 0 10 100" className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-2 sm:block" preserveAspectRatio="none" aria-hidden><line x1="5" y1="0" x2="5" y2="100" stroke="#4fd8e8" className="flow" strokeWidth="2" /></svg>
          <ol className="space-y-3 sm:pl-10">{P.impl.map(([w, t]) => <li key={w} className="card"><b className="text-leaf">{w}</b> · {t}</li>)}</ol></div></Section>
      <Section id="future" title="Future Roadmap" kicker="Not implemented yet."><Grid items={P.future.map(([p, t, l]) => <div key={p} className="card"><span className="chip border-amber/40 text-amber">Future Enhancement</span><p className="mt-2 text-sm text-slate-400">{p}</p><h3 className="font-display text-lg text-white">{t}</h3><ul className="mt-2 text-sm">{l.map(x => <li key={x}>• {x}</li>)}</ul></div>)} /></Section>
      <Section id="impact" title="From Surplus to Social Impact"><ImpactCards /><div className="mt-10"><Dashboard /></div></Section>
      <Section id="glossary" title="Glossary"><Glossary /></Section>
      <Section id="references" title="References" kicker="Add real URLs where marked."><div className="grid gap-3 sm:grid-cols-2">{P.refs.map(([c, d]) => <div key={c} className="card"><h3 className="font-semibold text-white">{c}</h3><p className="text-sm text-slate-400">{d}</p><p className="mt-1 font-mono text-xs text-amber">REFERENCE_URL_PLACEHOLDER</p></div>)}</div></Section>
      <Footer />
    </main>
    {top && <button aria-label="Back to top" onClick={() => scrollTo({ top: 0 })} className="fixed bottom-5 right-5 z-40 h-11 w-11 rounded-full bg-leaf font-bold text-navy-950">↑</button>}
  </>)
}
