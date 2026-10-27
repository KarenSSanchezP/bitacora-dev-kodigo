import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import { getArticle } from '@/lib/supabase';
import { prettyDate } from '@/lib/format';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const paragraphs = article.content.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  return <>
    <section className={`detail-banner accent-${article.accent}`}><div className="shell detail-head"><Link href="/" className="back-link"><ArrowLeft size={16}/> Volver a inicio</Link><div className="detail-category"><Link href={`/categorias/${article.category_slug}`}>{article.category} <ArrowUpRight size={15}/></Link></div><h1>{article.title}</h1><p>{article.excerpt}</p><div className="detail-meta"><span>BITÁCORA DEV</span><span>•</span><span>{prettyDate(article.published_at)}</span><span>•</span><span><Clock3 size={15}/>{article.read_time} min de lectura</span></div></div></section>
    <section className="shell article-layout"><div className="article-rail"><span>ESTÁS LEYENDO</span><strong>{article.category}</strong><div className="rail-square">{'{ }'}</div></div><article className="article-prose">{paragraphs.map((text,i)=><p key={i}>{text}</p>)}<div className="article-finish"><span>✳</span><strong>Fin del artículo. Ahora, a ponerlo en práctica.</strong><Link href="/#articulos">Seguir leyendo <ArrowUpRight size={17}/></Link></div></article></section>
  </>;
}
