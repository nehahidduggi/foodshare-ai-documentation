import { useEffect, useRef, useState } from 'react'
export default function useInView(opts = { threshold: 0.2 }) {
  const ref = useRef(null); const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, opts)
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, seen]
}
