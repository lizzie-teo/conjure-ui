import { type PaymentMethodTileProps } from '../../primitives/PaymentMethodTile/PaymentMethodTile';
export interface AcceptedNetwork {
    src: string;
    alt: string;
}
export interface SummaryRow {
    label: string;
    value: React.ReactNode;
}
export interface PaymentConfirmSheetProps {
    total: number;
    currency?: string;
    /** The active payment method shown in the confirmation row. */
    paymentMethod: PaymentMethodTileProps & {
        networkLogoSrc?: string;
    };
    /** Optional one-line description shown below the amount (e.g. merchant name, order summary). */
    description?: string;
    /**
     * Key:value rows shown between the amount and the payment method — works for
     * any industry: flight route/dates, insurance policy details, cart item count, etc.
     */
    summaryRows?: SummaryRow[];
    /** Logos shown at the bottom as accepted payment marks. Pass `{ src, alt }` per logo. */
    acceptedNetworks?: AcceptedNetwork[];
    onConfirm: () => void;
    onChangeMethod?: () => void;
    loading?: boolean;
    className?: string;
}
export declare function PaymentConfirmSheet({ total, currency, paymentMethod, description, summaryRows, acceptedNetworks, onConfirm, onChangeMethod, loading, className, }: PaymentConfirmSheetProps): import("react").JSX.Element;
