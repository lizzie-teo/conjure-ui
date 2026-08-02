import type { MotionDivProps } from '../../../lib/prop-types';
export type DetailListProps = MotionDivProps;
export interface RowProps {
    label: string;
    value: React.ReactNode;
    className?: string;
}
export declare function DetailList({ className, children, ...props }: DetailListProps): import("react").JSX.Element;
export declare namespace DetailList {
    var Row: ({ label, value, className }: RowProps) => import("react").JSX.Element;
}
