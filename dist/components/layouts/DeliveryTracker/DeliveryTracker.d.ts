import { OrderStatusCard } from '../../core/OrderStatusCard/OrderStatusCard';
import type { OrderStatusStep } from '../../core/OrderStatusCard/OrderStatusCard';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
type MapSlotProps = ComponentPropsWithRef<'div'>;
type StepsSlotProps = ComponentProps<typeof OrderStatusCard>;
declare function MapSlot({ children, className, ...props }: MapSlotProps): import("react").JSX.Element;
declare function StepsSlot({ className, ...props }: StepsSlotProps): import("react").JSX.Element;
export interface DeliveryTrackerProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    orderId: string;
    steps: OrderStatusStep[];
    eta?: string;
    mapSlot?: React.ReactNode;
}
export declare function DeliveryTracker({ orderId, steps, eta, mapSlot, className, ...props }: DeliveryTrackerProps): import("react").JSX.Element;
export declare namespace DeliveryTracker {
    var Map: typeof MapSlot;
    var Steps: typeof StepsSlot;
}
export {};
