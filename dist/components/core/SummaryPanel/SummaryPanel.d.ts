import type { ComponentPropsWithRef } from 'react';
export interface SummaryPanelProps extends ComponentPropsWithRef<'div'> {
    defaultOpen?: boolean;
    collapsible?: boolean;
}
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}
interface BodyProps {
    children: React.ReactNode;
    className?: string;
}
export declare function SummaryPanel({ defaultOpen, collapsible, className, children, ...props }: SummaryPanelProps): import("react").JSX.Element;
export declare namespace SummaryPanel {
    var Header: ({ children, className }: HeaderProps) => import("react").JSX.Element;
    var Body: ({ children, className }: BodyProps) => import("react").JSX.Element;
}
export {};
