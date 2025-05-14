import type { FC, ElementType } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: ElementType;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, className }) => {
  return (
    <Card className={cn("h-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-card group", className)}>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="bg-primary/10 p-3 rounded-lg mt-1"> {/* Adjusted padding and margin */}
          <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
        </div>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-foreground/80 ml-16 -mt-2">{description}</CardDescription> {/* Adjusted margin for alignment */}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
