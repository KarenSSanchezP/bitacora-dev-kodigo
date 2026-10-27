import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { Article } from '@/lib/types';
import { prettyDate } from '@/lib/format';

type Props = { article: Article; index?: number };

export function ArticleCard({ article, index = 0 }: Props) {
  return (
    <article className="article-card">
      <Link className={`article-art accent-${article.accent}`} href={`/articulos/${article.slug}`} aria-label={`Leer ${article.title}`}>
        <span className="article-art-index">{String(index + 1).padStart(2, '0')} / DEV NOTES</span>
        <span className="article-art-symbol" aria-hidden="true">{'{ }'}</span>
        <span className="article-art-arrow"><ArrowUpRight size={20} /></span>
      </Link>
      <div className="article-card-body">
        <div className="card-meta"><Link href={`/categorias/${article.category_slug}`}>{article.category}</Link><span className="meta-separator" /><span><Clock3 size={13} /> {article.read_time} min</span></div>
        <h3><Link href={`/articulos/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <div className="card-bottom"><span>{prettyDate(article.published_at)}</span><Link href={`/articulos/${article.slug}`} aria-label={`Abrir artículo ${article.title}`}><ArrowUpRight size={17} /></Link></div>
      </div>
    </article>
  );
}
