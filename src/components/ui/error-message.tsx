import { TriangleAlert as AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "minimal";
  showIcon?: boolean;
}

export const ErrorMessage = ({
  title = "Something went wrong",
  message,
  onRetry,
  className,
  variant = "default",
  showIcon = true
}: ErrorMessageProps) => {
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2 text-destructive text-sm", className)}>
        {showIcon && <AlertTriangle className="h-4 w-4 flex-shrink-0" />}
        <span>{message}</span>
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="h-auto p-1 text-destructive hover:text-destructive"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={cn(
      "p-6 text-center",
      variant === "destructive" && "border-destructive/50 bg-destructive/5",
      className
    )}>
      {showIcon && <AlertTriangle className={cn(
        "h-12 w-12 mx-auto mb-4",
        variant === "destructive" ? "text-destructive" : "text-muted-foreground"
      )} />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant={variant === "destructive" ? "destructive" : "default"}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </Card>
  );
};