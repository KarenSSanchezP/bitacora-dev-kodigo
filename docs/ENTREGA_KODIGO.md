# Guía de entrega · KODIGO

## Dos enlaces obligatorios

1. Sitio en producción: `https://<tu-proyecto>.vercel.app`
2. Repositorio público: `https://github.com/<usuario>/bitacora-dev-kodigo`

## Checklist antes de entregar

- [ ] Node.js instalado (`node -v`, mínimo v20.9).
- [ ] Proyecto Supabase creado y `supabase/schema.sql` ejecutado.
- [ ] Supabase Table Editor muestra **6 artículos**.
- [ ] Tabla `public.articles` con RLS **habilitado**.
- [ ] Política `Public read published articles` permite **SELECT** en filas publicadas.
- [ ] `.env.local` contiene **URL + publishable key** (no secret/service role).
- [ ] `npm install` y `npm run dev` funcionan localmente.
- [ ] `/` carga los seis artículos; funcionan las tarjetas y categorías.
- [ ] `/articulos/primeros-pasos-nextjs-app-router` carga desde Supabase.
- [ ] `/categorias/frontend` muestra dos artículos.
- [ ] URL inexistente muestra 404.
- [ ] `npm run typecheck`, `npm run lint` y `npm run build` terminan sin errores.
- [ ] Repositorio público GitHub incluye README, SQL y código; **no** `.env.local`.
- [ ] Vercel tiene variables en Production; despliegue en verde.
- [ ] Comprobaste la **URL de producción** en incógnito y en pantalla pequeña.

## Creación de repo desde PowerShell (si no usas GitHub Desktop)

Desde el directorio del proyecto, después de verificar localmente:

```powershell
git init
git add .
git commit -m "feat: landing Next.js App Router Supabase y rutas dinamicas"
git branch -M main
```

Crea un repositorio público **vacío** `bitacora-dev-kodigo` en GitHub, sin inicializar README ni .gitignore (ya existen localmente). Después:

```powershell
git remote add origin https://github.com/TU_USUARIO/bitacora-dev-kodigo.git
git push -u origin main
```

## Vercel

1. `https://vercel.com/new` > importar repositorio.
2. Framework **Next.js** (detección automática).
3. Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (valores de Supabase).
4. Selecciona entorno **Production** y despliega.
5. Si agregas variables después, realiza un **Redeploy**.
6. Prueba la URL principal y ambas rutas dinámicas.

## Nota académica

La consigna proporcionada indica cierre el 6 de septiembre de 2026. Antes del envío, consulta si el aula virtual permite entregas posteriores a esa fecha.
