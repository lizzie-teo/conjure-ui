import type { ComponentPropsWithRef } from 'react';
export interface CartItemProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    image: string;
    name: string;
    variant?: string;
    price: number;
    currency?: string;
    quantity: number;
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
}
export declare function CartItem({ image, name, variant, price, currency, quantity, onQuantityChange, onRemove, className, ...props }: CartItemProps): import("react").JSX.Element;
