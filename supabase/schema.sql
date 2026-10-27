-- BITÁCORA DEV · Ejecutar en Supabase Dashboard > SQL Editor > New Query.
-- Tabla de contenido público (1 tabla, 6 artículos), acceso público de SOLO LECTURA.

create table if not exists public.articles (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  category_slug text not null,
  read_time smallint not null default 4 check (read_time between 1 and 60),
  accent text not null default 'violet' check (accent in ('violet', 'mint', 'peach', 'blue')),
  featured boolean not null default false,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint articles_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint articles_category_slug_format check (category_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index if not exists articles_published_date_idx on public.articles (published, published_at desc);
create index if not exists articles_category_slug_idx on public.articles (category_slug);

alter table public.articles enable row level security;
-- Revoke amplio para impedir escrituras mediante API; solo lectura pública.
revoke all on public.articles from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.articles to anon, authenticated;

drop policy if exists "Public read published articles" on public.articles;
create policy "Public read published articles" on public.articles
  for select to anon, authenticated using (published = true);

-- Datos ficticios educativos, NO atribuidos a personas reales.
insert into public.articles
  (slug, title, excerpt, content, category, category_slug, read_time, accent, featured, published_at)
values
('primeros-pasos-nextjs-app-router', 'App Router: una nueva forma de pensar tus páginas',
 'Descubre cómo organizar rutas, layouts y componentes del servidor sin perderte entre carpetas.',
 'Cuando empezamos con Next.js, podemos imaginar la carpeta app como un mapa de nuestro sitio. Cada carpeta representa un segmento de URL; un archivo page.tsx convierte ese segmento en una página visible. Este enfoque hace que el proyecto sea más predecible a medida que crece.

Los layouts permiten compartir elementos entre varias páginas, como la barra de navegación y el pie de página. Además, conservan su estado en ciertas navegaciones. Es una forma sencilla de evitar duplicar código y mantener una experiencia consistente.

Los Server Components son la opción predeterminada en App Router. Puedes consultar datos de una base de datos desde el servidor y entregar al navegador el resultado renderizado. Cuando realmente necesitas eventos, estado o acceso a APIs del navegador, utilizas un Client Component.

Una buena práctica es comenzar con componentes de servidor y añadir interactividad solo donde aporta valor. Así reduces JavaScript innecesario y mantienes una arquitectura clara.',
 'Frontend','frontend',5,'violet',true,'2026-08-28T15:00:00Z'),
('supabase-rls-sin-complicaciones','Supabase y RLS: datos públicos sin abrir toda tu base de datos',
 'Aprende por qué una política SELECT es diferente de entregar permisos de escritura.',
 'Supabase utiliza PostgreSQL y permite exponer una API de datos sin programar todos los endpoints manualmente. Pero esa comodidad exige pensar en los permisos. Row Level Security, o RLS, permite decidir qué filas puede ver o modificar cada rol.

Para un blog público, una política de lectura puede permitir que visitantes anónimos consulten únicamente artículos marcados como publicados. No hace falta dar permisos de inserción o modificación para mostrar una landing page.

La clave publishable de Supabase está diseñada para clientes y aplicaciones públicas, pero no debe confundirse con las claves secretas que pueden saltarse RLS. Estas últimas jamás deben incluirse en el navegador o en un repositorio.

La regla práctica es sencilla: habilita RLS, concede solo los permisos imprescindibles y comprueba cada caso desde el rol correspondiente. Seguridad no es ocultar una URL; es definir quién puede hacer qué.',
 'Backend','backend',6,'mint',false,'2026-08-27T12:00:00Z'),
('testing-que-si-aporta-valor','Pruebas que sí aportan valor: empieza por el riesgo',
 'No necesitas cien pruebas triviales. Necesitas cubrir aquello que no puede fallar.',
 'Una estrategia útil de testing comienza identificando los flujos más críticos. Si una aplicación procesa compras, registrar una orden correcta, rechazar montos inválidos y proteger los datos de otros usuarios importa más que comprobar un color decorativo.

Las pruebas unitarias validan piezas pequeñas de lógica. Las de integración revisan la colaboración entre módulos. Las end-to-end se acercan a lo que haría una persona al utilizar el sistema. No se trata de elegir una sola técnica, sino de combinar las necesarias.

También conviene probar caminos negativos: productos sin existencias, credenciales incorrectas, duplicación de eventos o recursos inexistentes. Estos casos suelen revelar riesgos que los escenarios felices no muestran.

Una buena prueba explica el comportamiento esperado, se ejecuta de forma repetible y ayuda a detectar una regresión. Su objetivo no es mejorar una cifra: es aumentar la confianza en los cambios.',
 'Calidad','calidad',4,'peach',false,'2026-08-26T14:00:00Z'),
('deploy-sin-miedo-con-vercel','Del localhost a producción: desplegar con Vercel',
 'Los pasos esenciales para publicar, configurar variables y validar una app Next.js.',
 'Tener una aplicación funcionando en localhost es una gran primera etapa, pero todavía falta comprobar su comportamiento en un entorno accesible a otras personas. Plataformas como Vercel facilitan el despliegue continuo desde GitHub.

Un flujo habitual consiste en subir el proyecto, importar el repositorio en Vercel y agregar las variables de entorno necesarias. Nunca conviene copiar credenciales privadas dentro del código fuente. Cada entorno debe tener sus propios valores.

Una vez desplegada la aplicación, prueba la página principal y también las rutas dinámicas directamente desde la barra de direcciones. Comprueba errores, navegación y lectura de datos; un despliegue exitoso no demuestra automáticamente que todo funcione.

Finalmente, documenta el proceso para que otra persona pueda repetirlo. Un buen README y una validación final son parte del desarrollo profesional, no tareas secundarias.',
 'DevOps','devops',5,'blue',false,'2026-08-25T16:00:00Z'),
('rutas-dinamicas-nextjs-slug','Rutas dinámicas con slug: páginas que crecen con tus datos',
 'Una plantilla puede mostrar decenas de publicaciones gracias a los segmentos dinámicos.',
 'Imagina que tienes seis artículos y no quieres crear seis archivos distintos. En App Router, la carpeta articulos/[slug] permite reutilizar una sola página. El segmento entre corchetes representa una parte variable de la URL.

En Next.js moderno, params se recibe como una promesa en los componentes de página. Espera su resultado y utiliza el slug para consultar el registro correspondiente en Supabase. De este modo, el contenido y la ruta se mantienen sincronizados.

Cuando una consulta no encuentra resultados, la función notFound puede activar una página 404. Y mientras llega la información, un loading.tsx brinda una experiencia más clara que una pantalla en blanco.

Este patrón funciona para blogs, catálogos, proyectos y cualquier sitio donde una colección de datos necesite páginas de detalle. La idea central es separar la plantilla visual del contenido.',
 'Frontend','frontend',4,'violet',false,'2026-08-24T10:00:00Z'),
('apis-seguras-desde-el-diseno','Una API más segura comienza antes del primer endpoint',
 'Validación, control de acceso y consistencia: tres hábitos que conviene practicar.',
 'Una API segura no depende únicamente de un token de autenticación. También debe comprobar si el usuario puede acceder a cada recurso, validar lo que recibe y proteger la consistencia de los datos durante operaciones simultáneas.

Por ejemplo, al registrar una compra, el precio final debe calcularse a partir de la base de datos y no del importe enviado por el cliente. El servidor es responsable de aplicar las reglas de negocio.

Las transacciones ayudan a mantener coherencia cuando una operación modifica varias tablas. Y los mecanismos de idempotencia permiten procesar notificaciones repetidas sin ejecutar dos veces sus efectos.

Finalmente, escribe pruebas para los casos críticos y evita almacenar claves privadas en repositorios. La seguridad es un conjunto de decisiones pequeñas, repetidas de forma consistente.',
 'Backend','backend',6,'mint',false,'2026-08-23T10:00:00Z')
on conflict (slug) do update set
  title=excluded.title, excerpt=excluded.excerpt, content=excluded.content,
  category=excluded.category, category_slug=excluded.category_slug,
  read_time=excluded.read_time, accent=excluded.accent,
  featured=excluded.featured, published=excluded.published,
  published_at=excluded.published_at;

-- Validación rápida (SQL Editor usa rol admin y ve también filas no publicadas):
select slug, category, published from public.articles order by id;
