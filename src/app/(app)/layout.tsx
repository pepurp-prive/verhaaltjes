import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <nav className="mb-4">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Home
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
