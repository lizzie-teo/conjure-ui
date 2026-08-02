export interface OrderStatusStep {
    label: string;
    timestamp?: string;
    status: 'complete' | 'active' | 'pending';
}
export interface OrderStatusCardProps {
    orderId: string;
    steps: OrderStatusStep[];
    eta?: string;
    className?: string;
}
export declare function OrderStatusCard({ orderId, steps, eta, className }: OrderStatusCardProps): import("react").JSX.Element;
