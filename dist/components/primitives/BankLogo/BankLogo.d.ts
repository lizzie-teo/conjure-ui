import type { ComponentPropsWithRef } from 'react';
export interface BankLogoProps extends Omit<ComponentPropsWithRef<'img'>, 'size'> {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare function BankLogo({ src, alt, size, className, ...props }: BankLogoProps): import("react").JSX.Element;
