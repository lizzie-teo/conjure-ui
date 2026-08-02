import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export type CardStripProps = MotionDivProps;
type ItemProps = ComponentPropsWithRef<'div'>;
export declare function CardStrip({ children, className, ...props }: CardStripProps): import("react").JSX.Element;
export declare namespace CardStrip {
    var Item: ({ children, className, ...props }: ItemProps) => import("react").JSX.Element;
}
export {};
