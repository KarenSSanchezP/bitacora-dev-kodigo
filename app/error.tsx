'use client';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({reset}: {error: Error; reset: ()=>void}) {
  return <section className="shell error-state" role="alert"><AlertCircle size={38}/><span className="kicker">ERROR DE CONEXIÓN</span><h1>No pudimos cargar los artículos.</h1><p>Comprueba que Supabase esté configurado, que ejecutaste el SQL inicial y que las políticas RLS permitan la lectura pública.</p><div className="error-actions"><button onClick={reset} className="button button-dark"><RefreshCw size={17}/> Reintentar</button><Link className="button button-outline" href="/">Ir al inicio</Link></div></section>;
}
