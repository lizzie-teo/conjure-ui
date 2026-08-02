import { Button } from '../../ui/button';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
export type ActionStripProps = ComponentPropsWithRef<'div'>;
/**
 * Props land on the inner `<Button>` — that is the element a consumer wants to
 * reference, label or measure, not the motion wrapper that drives the entrance.
 */
type ActionProps = ComponentProps<typeof Button>;
export declare function ActionStrip({ className, children, ...props }: ActionStripProps): import("react").JSX.Element;
export declare namespace ActionStrip {
    var Primary: ({ className, children, ...props }: ActionProps) => import("react").JSX.Element;
    var Secondary: ({ className, children, ...props }: ActionProps) => import("react").JSX.Element;
}
export {};
