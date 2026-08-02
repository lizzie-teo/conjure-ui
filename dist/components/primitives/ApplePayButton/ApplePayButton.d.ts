import type { ComponentPropsWithRef } from 'react';
export interface ApplePayButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
    /**
     * Verb label rendered before the Apple Pay mark.
     * Follows Apple's button-type spec: "Pay with", "Buy with", "Book with", etc.
     * Pass an empty string to show the mark only.
     */
    label?: string;
}
export declare function ApplePayButton({ label, className, style, ...props }: ApplePayButtonProps): import("react").JSX.Element;
