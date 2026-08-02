export interface DoubleClickToPayProps {
    /** Called after Face ID finishes scanning — use to advance payment state */
    onActivate?: () => void;
    className?: string;
}
export declare function DoubleClickToPay({ onActivate, className }: DoubleClickToPayProps): import("react").JSX.Element;
