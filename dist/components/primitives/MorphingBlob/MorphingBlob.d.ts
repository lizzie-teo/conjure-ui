import type { MotionDivProps } from '../../../lib/prop-types';
export interface MorphingBlobProps extends Omit<MotionDivProps, 'children'> {
    size?: 'sm' | 'md';
}
export declare function MorphingBlob({ size, className, ...props }: MorphingBlobProps): import("react").JSX.Element;
