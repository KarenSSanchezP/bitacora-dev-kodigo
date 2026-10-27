import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { getCategoryArticles } from '@/lib/supabase';

type Props = { params: Promise<{slug: string}> };
export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const articles = await getCategoryArticles(slug);
  if (articles.length === 0) notFound();
  const name = articles[0].category;
  return <section className="shell category-page"><Link href="/#categorias" className="back-link back-dark"><ArrowLeft size={16}/> Ver categorías</Link><div className="section-top category-page-intro"><div><span className="kicker">/ CATEGORÍA · {String(articles.length).padStart(2,'0')} ARTÍCULOS</span><h1>Todo sobre <i>{name}.</i></h1><p>Contenido seleccionado para aprender a tu propio ritmo.</p></div></div><div className="article-grid">{articles.map((article,index)=><ArticleCard key={article.id} article={article} index={index}/>)}</div></section>;
}
