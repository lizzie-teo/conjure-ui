import { type LucideProps } from 'lucide-react';
export type DeliveryMethodType = 'home-delivery' | 'click-collect';
export interface DeliveryMethodIconProps extends Omit<LucideProps, 'size'> {
    type: DeliveryMethodType;
    size?: number;
}
export declare function DeliveryMethodIcon({ type, size, className, ...props }: DeliveryMethodIconProps): import("react").JSX.Element;
