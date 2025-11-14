import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockStories } from '@/lib/mock-data';
import type { Story } from '@/lib/types';

function StoryCard({ story }: { story: Story }) {
  return (
    <Card className="p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-800/50">
      <CardContent className="p-0">
        <h3 className="text-xl font-semibold text-foreground font-headline mb-2">{story.title}</h3>
        <p className="text-foreground/60 italic mb-3">"{story.prompt}"</p>
        <p className="text-foreground/80 line-clamp-3 mb-4">{story.excerpt}</p>
        <div className="flex gap-2">
           <Button variant="secondary" size="sm" asChild>
            <Link href="#">Lees</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="#">Bewerk/Vervolg</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


export default function StoryOverviewPage() {
    return (
    <Card className="rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold font-headline mb-6">Mijn Verhalen</h2>
        <div className="space-y-4">
            {mockStories.map(story => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>
    </Card>
    )
}
