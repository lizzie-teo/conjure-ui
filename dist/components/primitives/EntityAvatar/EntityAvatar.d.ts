import { type VariantProps } from 'class-variance-authority';
import type { MotionDivProps } from '../../../lib/prop-types';
export declare const entityAvatarBase = "inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium overflow-hidden";
export declare const entityAvatarSizeClasses: {
    sm: string;
    md: string;
    lg: string;
};
declare const avatarVariants: (props?: ({
    size?: "md" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface EntityAvatarProps extends Omit<MotionDivProps, 'children'>, VariantProps<typeof avatarVariants> {
    fallback: string;
    src?: string;
    alt?: string;
    /** Pulse breathe loop while AI is composing — stops as soon as streaming begins */
    isGenerating?: boolean;
}
export declare function EntityAvatar({ fallback, src, alt, size, isGenerating, className, ...props }: EntityAvatarProps): import("react").JSX.Element;
export {};
