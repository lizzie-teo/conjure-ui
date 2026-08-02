import type { ComponentPropsWithRef } from 'react';
export interface AddressTileProps extends Omit<ComponentPropsWithRef<'address'>, 'children'> {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
    className?: string;
}
export declare function AddressTile({ name, line1, line2, city, state, postcode, country, className, ...props }: AddressTileProps): import("react").JSX.Element;
