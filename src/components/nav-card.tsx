import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type NavCardProps = {
  href: string;
  icon: ReactNode;
  iconBgClass: string;
  iconTextClass: string;
  title: string;
  description: string;
  disabled?: boolean;
};

export function NavCard({
  href,
  icon,
  iconBgClass,
  iconTextClass,
  title,
  description,
  disabled = false,
}: NavCardProps) {
  const content = (
    <Card
      className={cn(
        'text-left p-6 rounded-2xl shadow-lg border-transparent hover:shadow-xl hover:border-primary transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col',
        disabled && 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-lg hover:border-transparent'
      )}
    >
      <CardContent className="p-0 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <div className={cn('p-2 rounded-lg inline-block mb-3', iconBgClass)}>
              <div className={cn('w-6 h-6', iconTextClass)}>{icon}</div>
            </div>
            <h2 className="text-xl font-semibold text-foreground font-headline">
              {title}
            </h2>
            <p className="text-foreground/80 mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (disabled) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return <Link href={href} className="h-full">{content}</Link>;
}
