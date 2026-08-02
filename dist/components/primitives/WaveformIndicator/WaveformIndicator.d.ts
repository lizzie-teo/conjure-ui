import type { ComponentPropsWithRef } from 'react';
export interface WaveformIndicatorProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    barCount?: number;
}
export declare function WaveformIndicator({ barCount, className, ...props }: WaveformIndicatorProps): import("react").JSX.Element;
