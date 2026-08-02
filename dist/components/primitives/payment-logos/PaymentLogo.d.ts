import type { ComponentPropsWithRef } from 'react';
export interface PaymentLogoProps extends Omit<ComponentPropsWithRef<'img'>, 'size'> {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare function PaymentLogo({ src, alt, size, className, ...props }: PaymentLogoProps): import("react").JSX.Element;
