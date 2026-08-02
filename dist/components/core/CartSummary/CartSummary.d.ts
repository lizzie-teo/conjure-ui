interface LineItemProps {
    name: string;
    quantity: number;
    price: number;
    currency: string;
    className?: string;
}
interface TotalProps {
    subtotal: number;
    discount?: number;
    total: number;
    currency: string;
    className?: string;
}
interface PromoFieldProps {
    onApply: (code: string) => void;
    appliedCode?: string;
    className?: string;
}
export interface CartSummaryProps {
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
    className?: string;
}
export declare function CartSummary({ items, currency, promoCode, discount, onPromoApply, onCheckout, className, }: CartSummaryProps): import("react").JSX.Element;
export declare namespace CartSummary {
    var LineItem: ({ name, quantity, price, currency, className }: LineItemProps) => import("react").JSX.Element;
    var PromoField: ({ onApply, appliedCode, className }: PromoFieldProps) => import("react").JSX.Element;
    var Total: ({ subtotal, discount, total, currency, className }: TotalProps) => import("react").JSX.Element;
}
export {};
