import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const movementBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      type: {
        entry: "bg-success/15 text-success",
        exit: "bg-warning/15 text-warning",
      },
    },
  },
);

interface MovementBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof movementBadgeVariants> {}

export function MovementBadge({ className, type, ...props }: MovementBadgeProps) {
  return <span className={cn(movementBadgeVariants({ type }), className)} {...props} />;
}