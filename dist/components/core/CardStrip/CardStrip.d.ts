import type { MotionDivProps } from '../../../lib/prop-types';
export type CardStripProps = MotionDivProps;
interface ItemProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CardStrip({ children, className, ...props }: CardStripProps): import("react").JSX.Element;
export declare namespace CardStrip {
    var Item: ({ children, className }: ItemProps) => import("react").JSX.Element;
}
export {};
