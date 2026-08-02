import type { MotionSpanProps } from '../../../lib/prop-types';
export interface TagProps extends MotionSpanProps {
    label: string;
    onRemove?: () => void;
}
export declare function Tag({ label, onRemove, className, ...props }: TagProps): import("react").JSX.Element;
