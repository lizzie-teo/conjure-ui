import type { ComponentPropsWithRef } from 'react';
export interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
    image?: string;
}
export interface ReceiptSummaryProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    orderId: string;
    items: ReceiptItem[];
    subtotal: number;
    shipping: number;
    total: number;
    currency?: string;
    paidAt?: string;
}
export declare function ReceiptSummary({ orderId, items, subtotal, shipping, total, currency, paidAt, className, ...props }: ReceiptSummaryProps): import("react").JSX.Element;
