export interface ApplePayCard {
    name: string;
    lastFour: string;
    billingAddress: string;
}
export interface ApplePayContact {
    email: string;
    phone: string;
}
export interface ApplePayShipping {
    recipientName: string;
    line1: string;
    line2?: string;
    country?: string;
}
export interface ApplePaySheetProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    merchantName: string;
    total: number;
    currency?: string;
    paymentCard: ApplePayCard;
    contact: ApplePayContact;
    shippingAddress: ApplePayShipping;
    onChangeCard?: () => void;
    onChangeContact?: () => void;
    onChangeShipping?: () => void;
    cardIcon?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
export declare function ApplePaySheet({ open, onClose, onConfirm, merchantName, total, currency, paymentCard, contact, shippingAddress, onChangeCard, onChangeContact, onChangeShipping, cardIcon, loading, className, }: ApplePaySheetProps): import("react").JSX.Element;
