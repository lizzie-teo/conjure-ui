import type { OrderStatusStep } from '../../core/OrderStatusCard/OrderStatusCard';
interface MapSlotProps {
    children?: React.ReactNode;
    className?: string;
}
interface StepsSlotProps {
    orderId: string;
    steps: OrderStatusStep[];
    eta?: string;
    className?: string;
}
declare function MapSlot({ children, className }: MapSlotProps): import("react").JSX.Element;
declare function StepsSlot({ orderId, steps, eta, className }: StepsSlotProps): import("react").JSX.Element;
export interface DeliveryTrackerProps {
    orderId: string;
    steps: OrderStatusStep[];
    eta?: string;
    mapSlot?: React.ReactNode;
    className?: string;
}
export declare function DeliveryTracker({ orderId, steps, eta, mapSlot, className, }: DeliveryTrackerProps): import("react").JSX.Element;
export declare namespace DeliveryTracker {
    var Map: typeof MapSlot;
    var Steps: typeof StepsSlot;
}
export {};
