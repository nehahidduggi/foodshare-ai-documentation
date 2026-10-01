import { useEffect, useState } from 'react'
import P from '../data/project.json'
export const NAV = [['overview','Overview'],['problem','Problem'],['solution','Solution'],['how','How It Works'],['ai','AI & ML'],['users','Users & Roles'],['architecture','Architecture'],['stack','Technology Stack'],['database','Database'],['security','Security'],['requirements','Requirements'],['rules','Business Rules'],['mvp','MVP'],['testing','Testing'],['roadmap','Roadmap'],['future','Future'],['impact','Impact'],['glossary','Glossary'],['references','References']]
export const Logo = ({ s = 30 }) => (<img src="/icons/logo.svg" width={s} height={s} alt="FoodShare AI logo" />)

export function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => { const f = () => { const d = document.documentElement; setP(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) }; addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  return <div className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-leaf via-sky to-amber" style={{ width: p + '%' }} role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(p)} />
}

export function Navbar({ open, setOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/75 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:pl-[17rem]">
        <button className="btn border border-white/15 px-3 lg:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        <a href="#overview" className="flex items-center gap-2 font-display font-bold text-white lg:hidden"><Logo s={26} />FoodShare AI</a>
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
          {[['how','Documentation'],['architecture','Architecture'],['ai','AI/ML'],['impact','Impact']].map(([i, l]) => <a key={i} href={'#' + i} className="text-slate-300 hover:text-leaf">{l}</a>)}
          <a href={P.github} target="_blank" rel="noreferrer" className="rounded-lg border border-white/15 px-3 py-1.5 hover:border-sky">GitHub</a>
          <a href="#solution" className="rounded-lg bg-leaf px-3 py-1.5 font-semibold text-navy-950">Explore Project</a>
        </nav>
      </div>
    </header>
  )
}

export function Sidebar({ open, setOpen, active }) {
  const [q, setQ] = useState('')
  const items = NAV.filter(([, l]) => l.toLowerCase().includes(q.toLowerCase()))
  return (<>
    {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
    <aside aria-label="Documentation navigation" className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-white/10 bg-navy-900 p-4 transition-transform lg:translate-x-0 ${open ? '' : '-translate-x-full'}`}>
      <a href="#overview" className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white"><Logo />FoodShare AI</a>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search docs…" aria-label="Search documentation" className="mb-3 w-full rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-sm" />
      <nav>{items.map(([id, l]) => (
        <a key={id} href={'#' + id} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined}
          className={`block rounded-lg border-l-2 px-3 py-2 text-sm ${active === id ? 'border-leaf bg-leaf/10 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>{l}</a>))}
        {!items.length && <p className="text-sm text-slate-500">No matching section.</p>}
      </nav>
    </aside></>)
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-navy-900 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
        <div><p className="font-display text-xl font-bold text-white">FoodShare AI</p><p className="italic">“{P.tagline}”</p>
          <p className="mt-3">Project: {P.title}</p><p>Target Organization: Ministry of Food Processing Industries</p><p>Category: {P.category}</p><p>Theme: {P.theme}</p></div>
        <div><p className="mb-2 font-semibold text-white">Links</p>
          {[['overview','Overview'],['architecture','Architecture'],['ai','AI/ML'],['impact','Impact'],['references','References']].map(([i, l]) => <a key={i} className="block py-1 hover:text-leaf" href={'#' + i}>{l}</a>)}
          <p className="mt-4">Built as a hackathon project.</p></div>
      </div>
    </footer>)
}
