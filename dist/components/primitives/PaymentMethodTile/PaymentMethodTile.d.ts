import type { ComponentPropsWithRef } from 'react';
export interface PaymentMethodTileProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    type: 'card' | 'apple-pay' | 'google-pay' | 'bank';
    label: string;
    /** URL of a card network logo (e.g. `/payment-logos/cards/mastercard.svg`). When provided for `type="card"`, replaces the generic card icon. */
    networkLogoSrc?: string;
    selected?: boolean;
}
export declare function PaymentMethodTile({ type, label, networkLogoSrc, selected, onClick, className, ...props }: PaymentMethodTileProps): import("react").JSX.Element;
