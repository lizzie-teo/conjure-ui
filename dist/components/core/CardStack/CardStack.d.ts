import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export interface CardStackProps extends MotionDivProps {
    /** Controlled expanded state. Omit to use internal state. */
    expanded?: boolean;
    /** Called whenever the stack expands or collapses. */
    onExpandChange?: (expanded: boolean) => void;
    /** Initial expanded state when uncontrolled. */
    defaultExpanded?: boolean;
}
type ItemProps = ComponentPropsWithRef<'div'>;
export declare function CardStack({ children, expanded, onExpandChange, defaultExpanded, className, ...props }: CardStackProps): import("react").JSX.Element;
export declare namespace CardStack {
    var Item: ({ children, className, ...props }: ItemProps) => import("react").JSX.Element;
}
export {};
