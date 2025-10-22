import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
  size = "md"
}: EmptyStateProps) => {
  const sizeClasses = {
    sm: "py-8 px-4",
    md: "py-12 px-4", 
    lg: "py-16 px-6"
  };

  const titleClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", sizeClasses[size], className)}>
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className={cn("font-semibold text-foreground mb-2", titleClasses[size])}>
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant={action.variant || "default"}>
          {action.label}
        </Button>
      )}
    </div>
  );
};