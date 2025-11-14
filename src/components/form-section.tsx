import type { ReactNode } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FormSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function FormSection({ title, description, action, children }: FormSectionProps) {
  return (
    <div className="bg-transparent">
      <CardHeader className="flex-row items-center justify-between p-0 pb-4">
        <div>
          <CardTitle className="text-lg font-medium text-foreground font-headline">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      </CardContent>
    </div>
  );
}
