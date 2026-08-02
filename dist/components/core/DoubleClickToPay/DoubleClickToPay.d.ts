import type { Ref } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export interface DoubleClickToPayProps extends Omit<MotionDivProps, 'children' | 'ref'> {
    /** Called after Face ID finishes scanning — use to advance payment state */
    onActivate?: () => void;
    /**
     * The root element swaps between a `<button>` (idle) and a `<div>` (scanning),
     * so the ref is typed as their common `HTMLElement`.
     */
    ref?: Ref<HTMLElement>;
}
export declare function DoubleClickToPay({ onActivate, className, ...props }: DoubleClickToPayProps): import("react").JSX.Element;
