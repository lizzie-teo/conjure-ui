import type { ComponentPropsWithRef } from 'react';
export interface EmptyStateProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    icon?: React.ReactNode;
    heading: string;
    body?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}
export declare function EmptyState({ icon, heading, body, action, className, ...props }: EmptyStateProps): import("react").JSX.Element;
