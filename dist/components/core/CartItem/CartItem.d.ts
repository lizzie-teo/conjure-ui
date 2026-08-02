export interface CartItemProps {
    image: string;
    name: string;
    variant?: string;
    price: number;
    currency?: string;
    quantity: number;
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
    className?: string;
}
export declare function CartItem({ image, name, variant, price, currency, quantity, onQuantityChange, onRemove, className, }: CartItemProps): import("react").JSX.Element;
