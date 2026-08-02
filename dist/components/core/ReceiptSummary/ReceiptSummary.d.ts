export interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
    image?: string;
}
export interface ReceiptSummaryProps {
    orderId: string;
    items: ReceiptItem[];
    subtotal: number;
    shipping: number;
    total: number;
    currency?: string;
    paidAt?: string;
    className?: string;
}
export declare function ReceiptSummary({ orderId, items, subtotal, shipping, total, currency, paidAt, className, }: ReceiptSummaryProps): import("react").JSX.Element;
