import type { ComponentPropsWithRef } from 'react';
export interface PriceDisplayProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
    amount: number;
    currency: string;
    strikethrough?: number;
}
export declare function PriceDisplay({ amount, currency, strikethrough, className, ...props }: PriceDisplayProps): import("react").JSX.Element;
