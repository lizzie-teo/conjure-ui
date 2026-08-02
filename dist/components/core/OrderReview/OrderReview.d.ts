import type { CartItemProps } from '../CartItem/CartItem';
import { DetailList } from '../DetailList/DetailList';
import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
interface SectionProps extends ComponentPropsWithRef<'div'> {
    title: string;
}
interface TotalsProps extends Omit<ComponentProps<typeof DetailList>, 'children'> {
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
}
export interface OrderReviewProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    items: CartItemProps[];
    shippingAddress: AddressTileProps;
    subtotal: number;
    shipping: number;
    total: number;
    currency?: string;
    onConfirm: () => void;
}
export declare function OrderReview({ items, shippingAddress, subtotal, shipping, total, currency, onConfirm, className, ...props }: OrderReviewProps): import("react").JSX.Element;
export declare namespace OrderReview {
    var Section: ({ title, children, className, ...props }: SectionProps) => import("react").JSX.Element;
    var Totals: ({ subtotal, shipping, total, currency, ...props }: TotalsProps) => import("react").JSX.Element;
}
export {};
