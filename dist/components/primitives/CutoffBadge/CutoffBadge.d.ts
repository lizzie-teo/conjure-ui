import type { ComponentPropsWithRef } from 'react';
export interface CutoffBadgeProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
    cutoffAt: string;
    missed?: boolean;
}
export declare function CutoffBadge({ cutoffAt, missed, className, ...props }: CutoffBadgeProps): import("react").JSX.Element;
