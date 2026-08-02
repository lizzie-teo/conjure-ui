import type { MotionDivProps } from '../../../lib/prop-types';
export interface PaymentSuccessRow {
    label: string;
    value: React.ReactNode;
}
export interface PaymentSuccessProps extends Omit<MotionDivProps, 'children'> {
    /** Confirmation reference shown prominently — order #, booking ref, policy #. */
    referenceNumber: string;
    /** StatusBadge label. Defaults to "Confirmed". */
    badgeLabel?: string;
    /** Optional subtitle line below the reference number. */
    subtitle?: string;
    /** Key:value rows in the detail section. */
    rows?: PaymentSuccessRow[];
    /** Primary CTA label. Defaults to "Done". */
    ctaLabel?: string;
    onCta: () => void;
    /** Optional secondary action (e.g. "Email receipt", "View booking"). */
    secondaryLabel?: string;
    onSecondary?: () => void;
}
export declare function PaymentSuccess({ referenceNumber, badgeLabel, subtitle, rows, ctaLabel, onCta, secondaryLabel, onSecondary, className, ...props }: PaymentSuccessProps): import("react").JSX.Element;
