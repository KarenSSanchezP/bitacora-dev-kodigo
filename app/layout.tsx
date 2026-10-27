import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Bitácora Dev — Aprende construyendo', template: '%s | Bitácora Dev' },
  description: 'Una revista digital de ideas prácticas sobre desarrollo web, APIs, QA y DevOps. Construida con Next.js App Router y Supabase.',
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="es"><body><SiteHeader/><main id="contenido">{children}</main><SiteFooter/></body></html>;
}
