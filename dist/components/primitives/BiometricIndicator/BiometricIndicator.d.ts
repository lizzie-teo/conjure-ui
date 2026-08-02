import type { ComponentPropsWithRef } from 'react';
export interface BiometricIndicatorProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    state: 'idle' | 'pending' | 'success' | 'error';
}
export declare function BiometricIndicator({ state, className, ...props }: BiometricIndicatorProps): import("react").JSX.Element;
