import type { ComponentPropsWithRef } from 'react';
export type ActionStripProps = ComponentPropsWithRef<'div'>;
interface PrimaryProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}
interface SecondaryProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}
export declare function ActionStrip({ className, children, ...props }: ActionStripProps): import("react").JSX.Element;
export declare namespace ActionStrip {
    var Primary: ({ onClick, disabled, className, children }: PrimaryProps) => import("react").JSX.Element;
    var Secondary: ({ onClick, disabled, className, children }: SecondaryProps) => import("react").JSX.Element;
}
export {};
