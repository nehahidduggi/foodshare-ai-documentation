import P from '../data/project.json'
const NODES = [['Kitchen', 40, '#ff9a3c'], ['AI', 150, '#4fd8e8'], ['Food', 260, '#22c58b'], ['NGO', 370, '#a99bff'], ['Delivery', 480, '#ff9a3c'], ['Impact', 590, '#22c58b']]
export default function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden px-5 pb-16 pt-28" aria-labelledby="hero-h">
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-leaf/15 blur-3xl" />
      <div className="mx-auto max-w-5xl">
        <p className="chip">{P.category} · MoFPI · {P.theme}</p>
        <h1 id="hero-h" className="mt-5 font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl">FoodShare <span className="text-leaf">AI</span></h1>
        <p className="mt-3 font-display text-xl text-amber sm:text-2xl">“{P.tagline}”</p>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">An AI-powered ecosystem that helps institutional kitchens reduce food overproduction, assess surplus, connect safe food with verified NGOs, optimize delivery and measure sustainability impact.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#solution" className="btn bg-leaf text-navy-950 hover:brightness-110">Explore the Solution</a>
          <a href="#architecture" className="btn border border-white/20 hover:border-sky">View System Architecture</a>
        </div>
        <svg viewBox="0 0 640 170" className="mt-12 w-full" role="img" aria-label="Animated flow: Kitchen to AI to Food to NGO to Delivery to Impact">
          <path className="flow" d="M60 80H570" stroke="#4fd8e8" strokeWidth="2" fill="none" opacity=".6" />
          {[0, 1, 2, 3].map(i => <circle key={i} r="5" fill="#ff9a3c"><animateMotion dur="5s" begin={i * 1.2 + 's'} repeatCount="indefinite" path="M60 80H150" /></circle>)}
          {NODES.map(([n, x, c], i) => (<g key={n} className={i % 2 ? 'bob' : ''}>
            <circle cx={x + 20} cy="80" r="30" fill="#0f1f45" stroke={c} strokeWidth="2" />
            <text x={x + 20} y="85" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">{n}</text>
            <text x={x + 20} y="135" textAnchor="middle" fill="#8aa0c4" fontSize="10">{['Predict', 'Verify', 'Prepare', 'Match', 'Deliver', 'Measure'][i]}</text></g>))}
        </svg>
      </div>
    </section>)
}
