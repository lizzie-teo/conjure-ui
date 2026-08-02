import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile';
import type { DeliveryStep, Branch, AvailableDate, TimeSlot, RewardsSummary, SubstitutionPreference, CarBootDetails, CompletedBooking } from '../../core/DeliveryConfirmation/deliveryFlow.types';
export interface DeliveryFlowProps {
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
    className?: string;
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
interface StepBodyProps {
    stepKey: string;
    direction: 1 | -1;
    shouldReduce: boolean;
    children: React.ReactNode;
}
export declare function DeliveryFlow({ availableDates, timeSlots, branches, rewards, homeAddress, onAddressEdit, editableUntil, initialStep, initialData, onComplete, onCancel, className, }: DeliveryFlowProps): import("react").JSX.Element;
export declare namespace DeliveryFlow {
    var StepRail: ({ steps, currentStep, }: {
        steps: DeliveryStep[];
        currentStep: DeliveryStep;
    }) => import("react").JSX.Element;
    var StepBody: ({ stepKey, direction, shouldReduce, children }: StepBodyProps) => import("react").JSX.Element;
}
export {};
