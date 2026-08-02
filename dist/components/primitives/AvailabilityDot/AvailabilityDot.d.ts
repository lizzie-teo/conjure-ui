import type { ComponentPropsWithRef } from 'react';
export type AvailabilityLevel = 'available' | 'limited' | 'unavailable';
export declare const availabilityColorClasses: Record<AvailabilityLevel, string>;
export declare const availabilityLabelColorClasses: Record<AvailabilityLevel, string>;
export interface AvailabilityDotProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
    level: AvailabilityLevel;
    showLabel?: boolean;
}
export declare function AvailabilityDot({ level, showLabel, className, 'aria-hidden': ariaHidden, ...props }: AvailabilityDotProps): import("react").JSX.Element;
