import Link from 'next/link';
import { ArrowUpRight, Layers3 } from 'lucide-react';

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-inner">
    <div><Link href="/" className="footer-brand"><Layers3 size={18}/> bitácora.dev</Link><p>Ideas, código y aprendizaje continuo. Proyecto académico demostrativo.</p></div>
    <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">Construido con Next.js + Supabase <ArrowUpRight size={15}/></a>
  </div></footer>;
}
