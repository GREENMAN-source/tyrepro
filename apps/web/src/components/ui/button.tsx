import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({ className, asChild, variant = "default", size = "md", ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-primary text-primary-foreground shadow-sm hover:bg-red-700",
        variant === "secondary" && "bg-muted text-foreground hover:bg-muted/80",
        variant === "outline" && "border bg-background hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        size === "sm" && "h-9 px-3",
        size === "md" && "h-10 px-4",
        size === "lg" && "h-12 px-6",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}
