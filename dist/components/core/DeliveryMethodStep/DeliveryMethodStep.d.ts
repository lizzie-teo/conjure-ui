import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export type DeliveryMethod = 'home-delivery' | 'click-collect';
export interface DeliveryMethodStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue'> {
    value?: DeliveryMethod;
    /** Overrides the DOM `defaultValue` — the initially selected delivery method. */
    defaultValue?: DeliveryMethod;
    homeAddress?: AddressTileProps;
    onMethodChange?: (method: DeliveryMethod) => void;
    onAddressEdit?: () => void;
}
export interface AddressPreviewProps extends Omit<MotionDivProps, 'children'> {
    address: AddressTileProps;
    onEdit?: () => void;
}
export declare function DeliveryMethodStep({ value, defaultValue, homeAddress, onMethodChange, onAddressEdit, className, ...props }: DeliveryMethodStepProps): import("react").JSX.Element;
export declare namespace DeliveryMethodStep {
    var AddressPreview: ({ address, onEdit, ...props }: AddressPreviewProps) => import("react").JSX.Element;
}
