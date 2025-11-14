import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <nav className="mb-6">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Home
        </Link>
      </nav>
      <Card className="rounded-2xl shadow-lg p-6 md:p-8">
        <main>{children}</main>
      </Card>
    </div>
  );
}
