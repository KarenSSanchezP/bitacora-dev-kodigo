import { createClient } from '@supabase/supabase-js';
import type { Article, Category } from '@/lib/types';

const columns = 'id,slug,title,excerpt,content,category,category_slug,read_time,accent,featured,published_at';

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || url.includes('TU-PROYECTO') || key.includes('REEMPLAZAR')) {
    throw new Error('Supabase no está configurado. Añade NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY a .env.local y Vercel.');
  }
  // Solo utilizamos la publishable key: las políticas RLS se aplican a todas las lecturas.
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await db().from('articles').select(columns)
    .eq('published', true).order('featured', { ascending: false })
    .order('published_at', { ascending: false });
  if (error) throw new Error(`No se pudieron obtener los artículos: ${error.message}`);
  return (data ?? []) as Article[];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await db().from('articles').select(columns)
    .eq('slug', slug).eq('published', true).maybeSingle();
  if (error) throw new Error(`No se pudo obtener el artículo: ${error.message}`);
  return data as Article | null;
}

export async function getCategoryArticles(slug: string): Promise<Article[]> {
  const { data, error } = await db().from('articles').select(columns)
    .eq('category_slug', slug).eq('published', true)
    .order('published_at', { ascending: false });
  if (error) throw new Error(`No se pudo obtener la categoría: ${error.message}`);
  return (data ?? []) as Article[];
}

export function categoriesFrom(articles: Article[]): Category[] {
  const map = new Map<string, Category>();
  for (const article of articles) {
    const found = map.get(article.category_slug);
    if (found) found.count++;
    else map.set(article.category_slug, { name: article.category, slug: article.category_slug, count: 1, accent: article.accent });
  }
  return [...map.values()];
}
