export type Accent = 'violet' | 'mint' | 'peach' | 'blue';

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  category_slug: string;
  read_time: number;
  accent: Accent;
  featured: boolean;
  published_at: string;
};

export type Category = { name: string; slug: string; count: number; accent: Accent };
