import type { ComponentPropsWithRef } from 'react';
export interface SkeletonBlockProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    shape: 'line' | 'heading' | 'code' | 'bullet-list';
    lines?: number;
}
export declare function SkeletonBlock({ shape, lines, className, style, ...props }: SkeletonBlockProps): import("react").JSX.Element;
