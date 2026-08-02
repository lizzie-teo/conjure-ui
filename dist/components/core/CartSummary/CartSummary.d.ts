import type { ComponentPropsWithRef } from 'react';
interface LineItemProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    name: string;
    quantity: number;
    price: number;
    currency: string;
}
interface TotalProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    subtotal: number;
    discount?: number;
    total: number;
    currency: string;
}
interface PromoFieldProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    onApply: (code: string) => void;
    appliedCode?: string;
}
export interface CartSummaryProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    items: {
        name: string;
        price: number;
        quantity: number;
    }[];
    currency?: string;
    promoCode?: string;
    discount?: number;
    onPromoApply?: (code: string) => void;
    onCheckout: () => void;
}
export declare function CartSummary({ items, currency, promoCode, discount, onPromoApply, onCheckout, className, ...props }: CartSummaryProps): import("react").JSX.Element;
export declare namespace CartSummary {
    var LineItem: ({ name, quantity, price, currency, className, ...props }: LineItemProps) => import("react").JSX.Element;
    var PromoField: ({ onApply, appliedCode, className, ...props }: PromoFieldProps) => import("react").JSX.Element;
    var Total: ({ subtotal, discount, total, currency, className, ...props }: TotalProps) => import("react").JSX.Element;
}
export {};
