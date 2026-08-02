import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
export type DeliveryMethod = 'home-delivery' | 'click-collect';
export interface DeliveryMethodStepProps {
    value?: DeliveryMethod;
    defaultValue?: DeliveryMethod;
    homeAddress?: AddressTileProps;
    onMethodChange?: (method: DeliveryMethod) => void;
    onAddressEdit?: () => void;
    className?: string;
}
export declare function DeliveryMethodStep({ value, defaultValue, homeAddress, onMethodChange, onAddressEdit, className, }: DeliveryMethodStepProps): import("react").JSX.Element;
export declare namespace DeliveryMethodStep {
    var AddressPreview: ({ address, onEdit, }: {
        address: AddressTileProps;
        onEdit?: () => void;
    }) => import("react").JSX.Element;
}
