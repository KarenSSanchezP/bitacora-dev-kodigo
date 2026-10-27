import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { categoriesFrom, getArticles } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const articles = await getArticles();
  const categories = categoriesFrom(articles);
  const featured = articles.find(a => a.featured) ?? articles[0];
  return <>
    <section className="hero"><div className="shell hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse-dot"/> PUBLICACIÓN INDEPENDIENTE · EDICIÓN 01</div>
        <h1>Ideas para <em>crear</em><br/>el siguiente<br/><span className="highlight-word">gran proyecto<span className="hero-asterisk">✳</span></span></h1>
        <p className="hero-subtitle">Una bitácora para quienes disfrutan entender cómo funciona la web, escribir mejor código y aprender haciendo.</p>
        <div className="hero-actions"><a href="#articulos" className="button button-dark">Explorar artículos <ArrowRight size={17}/></a><span className="hero-small-note"><Sparkles size={15}/> Sin relleno. Solo ideas útiles.</span></div>
      </div>
      <div className="hero-visual" aria-label="Ilustración abstracta de código y creatividad">
        <div className="hero-circle circle-one"/><div className="hero-circle circle-two"/>
        <div className="floating-tag tag-top">HELLO, WORLD ✳</div>
        <div className="visual-center"><span className="visual-code">&lt;/&gt;</span><span className="visual-caption">IMAGINE. BUILD. REPEAT.</span></div>
        <div className="floating-tag tag-bottom"><CheckCircle2 size={17}/> idea → código → impacto</div>
        <div className="visual-stamp">BUILD<br/>WITH<br/>CURIOSITY ↗</div>
      </div>
    </div></section>

    <section className="ticker" aria-label="Tecnologías"><div className="shell ticker-inner"><span>EN ESTE ESPACIO</span><span><Code2 size={16}/> FRONTEND</span><span>✳ BACKEND</span><span><BookOpen size={16}/> CALIDAD</span><span>↗ DEVOPS</span><span>✦ ARQUITECTURA</span></div></section>

    <section className="shell main-section" id="articulos"><div className="section-top"><div><span className="kicker">/ 01 · PARA LEER Y PROBAR</span><h2>Ideas recién <i>compiladas.</i></h2><p>Lecturas breves sobre tecnología, buenas prácticas y creatividad digital.</p></div><span className="counter">{String(articles.length).padStart(2,'0')} PUBLICACIONES</span></div>
      {featured && <Link href={`/articulos/${featured.slug}`} className={`featured-card accent-${featured.accent}`}><div className="featured-label">✳ LECTURA DESTACADA</div><div className="featured-content"><div><span className="featured-category">{featured.category} / {featured.read_time} MIN DE LECTURA</span><h3>{featured.title}</h3><p>{featured.excerpt}</p><span className="featured-cta">Leer este artículo <ArrowRight size={18}/></span></div><div className="feature-graphic" aria-hidden="true">&lt;code /&gt;<span className="feature-graphic-detail">01. THINK<br/>02. SHIP<br/>03. LEARN</span></div></div></Link>}
      {articles.length === 0 && <div className="empty-panel">Todavía no hay artículos publicados. Ejecuta el script SQL incluido para cargar los seis registros de ejemplo.</div>}
      <div className="article-grid">{articles.filter(a=>a.id !== featured?.id).map((article,index)=><ArticleCard key={article.id} article={article} index={index}/>)}</div>
    </section>

    <section className="category-section" id="categorias"><div className="shell"><div className="section-top"><div><span className="kicker">/ 02 · ELIGE TU CAMINO</span><h2>Aprende por <i>categoría.</i></h2><p>Ve directo a los temas que te interesan.</p></div></div>
    <div className="category-grid">{categories.map((category, i)=><Link href={`/categorias/${category.slug}`} className={`category-tile accent-${category.accent}`} key={category.slug}><span className="category-number">{String(i+1).padStart(2,'0')} / TOPIC</span><div className="category-tile-bottom"><div><h3>{category.name}</h3><span>{category.count} {category.count === 1 ? 'lectura' : 'lecturas'}</span></div><span className="category-arrow"><ArrowUpRight size={23}/></span></div></Link>)}</div>
    </div></section>

    <section className="closing-section"><div className="shell closing-inner"><span className="kicker">EL CÓDIGO ES SOLO EL COMIENZO</span><h2>La curiosidad también<br/><i>se entrena.</i></h2><a href="#articulos" className="button button-light">Seguir explorando <ArrowRight size={18}/></a></div></section>
  </>;
}
