import type { MotionDivProps } from '../../../lib/prop-types';
export interface AuthStatusProps extends Omit<MotionDivProps, 'children'> {
    state: 'success' | 'error';
    message?: string;
}
export declare function AuthStatus({ state, message, className, ...props }: AuthStatusProps): import("react").JSX.Element;
