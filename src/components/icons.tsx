import { cn } from "@/lib/utils";

export const AiSparklesIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={cn("w-5 h-5", className)}
  >
    <path
      fillRule="evenodd"
      d="M10 2.5a.75.75 0 01.75.75v3.66l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 5.83a.75.75 0 111.1-1.02l1.95 2.1V3.25A.75.75 0 0110 2.5zM10 8a.75.75 0 01.75.75v3.66l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 11.83a.75.75 0 111.1-1.02l1.95 2.1V8.75A.75.75 0 0110 8zM13.25 15.75a.75.75 0 00-1.5 0v.66l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1v-.66z"
      clipRule="evenodd"
    />
  </svg>
);
