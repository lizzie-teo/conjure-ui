import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "xs" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, ...props }: React.ComponentPropsWithRef<'button'> & VariantProps<typeof buttonVariants>): React.JSX.Element;
export { Button, buttonVariants };
