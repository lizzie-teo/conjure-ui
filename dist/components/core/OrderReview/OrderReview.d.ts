import type { CartItemProps } from '../CartItem/CartItem';
import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}
interface TotalsProps {
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
    className?: string;
}
export interface OrderReviewProps {
    items: CartItemProps[];
    shippingAddress: AddressTileProps;
    subtotal: number;
    shipping: number;
    total: number;
    currency?: string;
    onConfirm: () => void;
    className?: string;
}
export declare function OrderReview({ items, shippingAddress, subtotal, shipping, total, currency, onConfirm, className, }: OrderReviewProps): import("react").JSX.Element;
export declare namespace OrderReview {
    var Section: ({ title, children, className }: SectionProps) => import("react").JSX.Element;
    var Totals: ({ subtotal, shipping, total, currency, className }: TotalsProps) => import("react").JSX.Element;
}
export {};
