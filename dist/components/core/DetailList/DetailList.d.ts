import type { MotionDivProps } from '../../../lib/prop-types';
export type DetailListProps = MotionDivProps;
export interface RowProps extends Omit<MotionDivProps, 'children'> {
    label: string;
    value: React.ReactNode;
}
export declare function DetailList({ className, children, ...props }: DetailListProps): import("react").JSX.Element;
export declare namespace DetailList {
    var Row: ({ label, value, className, ...props }: RowProps) => import("react").JSX.Element;
}
