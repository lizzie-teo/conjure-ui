import type { ComponentPropsWithRef } from 'react';
export interface SummaryPanelProps extends ComponentPropsWithRef<'div'> {
    defaultOpen?: boolean;
    collapsible?: boolean;
}
type HeaderProps = ComponentPropsWithRef<'div'>;
type BodyProps = ComponentPropsWithRef<'div'>;
export declare function SummaryPanel({ defaultOpen, collapsible, className, children, ...props }: SummaryPanelProps): import("react").JSX.Element;
export declare namespace SummaryPanel {
    var Header: ({ children, className, ...props }: HeaderProps) => import("react").JSX.Element;
    var Body: ({ children, className, ...props }: BodyProps) => import("react").JSX.Element;
}
export {};
