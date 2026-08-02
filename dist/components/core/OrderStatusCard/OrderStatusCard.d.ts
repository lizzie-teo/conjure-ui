import type { ComponentPropsWithRef } from 'react';
export interface OrderStatusStep {
    label: string;
    timestamp?: string;
    status: 'complete' | 'active' | 'pending';
}
export interface OrderStatusCardProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    orderId: string;
    steps: OrderStatusStep[];
    eta?: string;
}
export declare function OrderStatusCard({ orderId, steps, eta, className, ...props }: OrderStatusCardProps): import("react").JSX.Element;
