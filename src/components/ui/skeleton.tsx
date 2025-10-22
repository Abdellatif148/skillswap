import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "rectangular" | "text";
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    text: "rounded-sm h-4",
  };

  return (
    <div 
      className={cn(
        "animate-pulse bg-muted loading-shimmer",
        variantClasses[variant],
        className
      )} 
      {...props} 
    />
  );
}