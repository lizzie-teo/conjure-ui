import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
import type { DeliveryStep, TimeSlot, Branch, RewardsSummary, SubstitutionPreference } from './deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
export interface DeliveryConfirmationProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    method: 'home-delivery' | 'click-collect';
    deliveryAddress?: AddressTileProps;
    branch?: Pick<Branch, 'name' | 'address'>;
    selectedDate: string;
    selectedSlot: TimeSlot;
    rewards?: RewardsSummary;
    redeemPoints?: boolean;
    substitution: SubstitutionPreference;
    editableUntil: string;
    onConfirm: () => void;
    onEdit: (step: DeliveryStep) => void;
    onSetupRecurring?: () => void;
}
interface EditRowProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    label: string;
    value: React.ReactNode;
    step: DeliveryStep;
    onEdit: (step: DeliveryStep) => void;
}
export declare function DeliveryConfirmation({ method, deliveryAddress, branch, selectedDate, selectedSlot, rewards, redeemPoints, substitution, editableUntil, onConfirm, onEdit, onSetupRecurring, className, ...props }: DeliveryConfirmationProps): import("react").JSX.Element;
export declare namespace DeliveryConfirmation {
    var EditRow: ({ label, value, step, onEdit, className, ...props }: EditRowProps) => import("react").JSX.Element;
}
export {};
