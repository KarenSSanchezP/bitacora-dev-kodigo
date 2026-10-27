# Bitácora Dev · Next.js 16 + Supabase

Landing editorial de contenido tecnológico, creada como actividad académica de KODIGO. Presenta artículos de ejemplo sobre frontend, backend, calidad de software y DevOps, con datos reales persistidos en Supabase.

**Stack:** Next.js 16+ (App Router), React 19, TypeScript, Supabase PostgreSQL + Row Level Security, CSS adaptable, Vercel.

## Requisitos evaluados

- **2 rutas dinámicas:** `app/articulos/[slug]/page.tsx` y `app/categorias/[slug]/page.tsx`.
- **Server Components:** la página principal y ambas rutas dinámicas consultan Supabase en el servidor, usando `lib/supabase.ts`.
- **Lectura de datos:** `getArticles`, `getArticle` y `getCategoryArticles` hacen SELECT a `public.articles`.
- **Datos serverless:** una tabla `articles` y 6 registros educativos de ejemplo.
- **RLS:** la lectura pública de filas con `published = true` está permitida; no se concede INSERT/UPDATE/DELETE a `anon` o `authenticated`.
- **Responsive:** CSS personalizado sin bibliotecas de UI pesadas.
- **Estados y errores:** `loading.tsx`, `error.tsx` y `not-found.tsx`.
- **Despliegue:** compatible con Vercel sin adaptadores especiales.

## Instalación local (Windows PowerShell)

Necesitas Node.js 20.9+ (recomendado 22 LTS), npm, Git y un proyecto de Supabase.

1. Descomprime el proyecto o clónalo desde GitHub.
2. En terminal, desde la raíz:

   ```powershell
   npm install
   ```
3. Abre [Supabase](https://supabase.com/dashboard), crea un proyecto y ejecuta **el archivo completo** `supabase/schema.sql` en **SQL Editor > New query > Run**. El script crea la tabla, activa RLS, añade la política y crea seis artículos.
4. En **Project Settings > API Keys** copia el **Project URL** y la **publishable key** (`sb_publishable_...`).
5. Copia el archivo de variables y completa los dos valores:

   ```powershell
   Copy-Item .env.example .env.local
   notepad .env.local
   ```
6. Inicia:

   ```powershell
   npm run dev
   ```
7. Abre `http://localhost:3000`. Haz clic en un artículo y en una categoría.

> No uses la `secret key` ni la antigua `service_role` en el proyecto. La publishable key es adecuada para este caso porque la tabla está protegida por RLS. `.env.local` está excluido de Git.

## Validación

```powershell
npm run typecheck
npm run lint
npm run build
```

Comprueba manualmente:

- `/` lista los 6 artículos desde Supabase.
- `/articulos/primeros-pasos-nextjs-app-router` muestra su contenido real.
- `/categorias/frontend` filtra artículos de la categoría.
- `/articulos/no-existe` muestra 404.
- `loading.tsx` aparece durante cargas; `error.tsx` ofrece reintento si falla la conexión.
- La interfaz es usable en móvil y desktop.

En Supabase, verifica que `articles` tiene RLS habilitado y una política `SELECT` que solo permite `published = true`.

## Publicación GitHub + Vercel

1. Publica este proyecto en un repositorio **público** de GitHub (sin `.env.local` ni `node_modules`).
2. En [Vercel](https://vercel.com/new) selecciona **Add New > Project**, importa ese repositorio y selecciona **Deploy**.
3. Antes de desplegar (o en **Settings > Environment Variables**), añade:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   en el entorno **Production** (idealmente también Preview).
4. Si añadiste variables después del despliegue, vuelve a desplegar.
5. Abre la URL `https://....vercel.app` que Vercel te entregue y comprueba `/`, `/articulos/...` y `/categorias/...`.
6. Entrega en KODIGO **dos enlaces**: la URL pública de Vercel y la URL del repositorio público GitHub.

> El proyecto usa `export const dynamic = 'force-dynamic'` en las páginas con datos. Esto evita consultas al proyecto Supabase durante la construcción y asegura lecturas desde los Server Components en tiempo de solicitud. La ausencia de variables en producción causará una página de error (intencional, no contenido ficticio).

## Estructura

```text
app/
  page.tsx                       # landing (Server Component)
  articulos/[slug]/page.tsx      # ruta dinámica 1
  categorias/[slug]/page.tsx     # ruta dinámica 2
  loading.tsx, error.tsx, not-found.tsx
components/                      # header, footer, cards
lib/supabase.ts                  # consultas server-side a Supabase
supabase/schema.sql             # SQL + RLS + seis registros
```

## Créditos y alcance

Los seis artículos son **contenido de demostración**, no publicaciones propias verificadas ni textos atribuidos a terceros. Este ejercicio no implementa autenticación ni escritura de usuarios porque la actividad solo exige lecturas con RLS. El objetivo principal es demostrar App Router, rutas dinámicas, Server Components, Supabase y despliegue.
