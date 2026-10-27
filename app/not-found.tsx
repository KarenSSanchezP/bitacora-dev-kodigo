import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {return <div className="shell not-found"><span className="not-found-number">404<span>✳</span></span><h1>Esta página todavía no existe.</h1><p>Puede que el artículo o la categoría no estén publicados.</p><Link href="/" className="button button-dark"><ArrowLeft size={17}/> Volver al inicio</Link></div>}
