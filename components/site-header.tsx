import Link from 'next/link';
import { ArrowUpRight, Layers3 } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Bitácora Dev, inicio"><span className="brand-icon"><Layers3 size={21}/></span><span>bitácora<span className="brand-accent">.</span>dev</span></Link>
        <nav aria-label="Navegación principal" className="header-nav">
          <Link href="/#articulos">Artículos</Link>
          <Link href="/#categorias">Categorías</Link>
          <a href="https://nextjs.org/docs/app" target="_blank" rel="noopener noreferrer" className="nav-guide">Explorar Next.js <ArrowUpRight size={15}/></a>
        </nav>
      </div>
    </header>
  );
}
