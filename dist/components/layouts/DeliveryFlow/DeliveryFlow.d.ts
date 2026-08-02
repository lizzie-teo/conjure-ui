import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
import type { DeliveryStep, Branch, AvailableDate, TimeSlot, RewardsSummary, SubstitutionPreference, CarBootDetails, CompletedBooking } from '../../core/DeliveryConfirmation/deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export interface DeliveryFlowProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    availableDates: AvailableDate[];
    timeSlots: TimeSlot[];
    branches?: Branch[];
    rewards?: RewardsSummary;
    homeAddress?: AddressTileProps;
    onAddressEdit?: () => void;
    editableUntil?: string;
    initialStep?: DeliveryStep;
    initialData?: Partial<DeliveryFlowState>;
    onComplete: (booking: CompletedBooking) => void;
    onCancel?: () => void;
}
export interface StepRailProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    steps: DeliveryStep[];
    currentStep: DeliveryStep;
}
interface DeliveryFlowState {
    method?: 'home-delivery' | 'click-collect';
    branchId?: string;
    carBootDetails?: CarBootDetails;
    selectedDate?: string;
    selectedSlotId?: string;
    redeemPoints: boolean;
    substitution: SubstitutionPreference;
}
interface StepBodyProps extends MotionDivProps {
    stepKey: string;
    direction: 1 | -1;
    shouldReduce: boolean;
}
export declare function DeliveryFlow({ availableDates, timeSlots, branches, rewards, homeAddress, onAddressEdit, editableUntil, initialStep, initialData, onComplete, onCancel, className, ...props }: DeliveryFlowProps): import("react").JSX.Element;
export declare namespace DeliveryFlow {
    var StepRail: ({ steps, currentStep, className, "aria-label": ariaLabel, ...props }: StepRailProps) => import("react").JSX.Element;
    var StepBody: ({ stepKey, direction, shouldReduce, children, className, ...props }: StepBodyProps) => import("react").JSX.Element;
}
export {};
