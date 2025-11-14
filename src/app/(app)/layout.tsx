import { Card } from '@/components/ui/card';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="rounded-2xl shadow-lg">
        <main>{children}</main>
      </Card>
    </div>
  );
}
