import type { ComponentPropsWithRef } from 'react';
export interface QuantityStepperProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onChange'> {
    value: number;
    min?: number;
    max?: number;
    /** Note: replaces the DOM `onChange` — receives the new quantity, not an event. */
    onChange: (value: number) => void;
    disabled?: boolean;
}
export declare function QuantityStepper({ value, min, max, onChange, disabled, className, ...props }: QuantityStepperProps): import("react").JSX.Element;
