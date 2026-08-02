import type { TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export interface TimeSlotStepProps {
    slots: TimeSlot[];
    selectedSlotId?: string;
    onSlotSelect: (slotId: string) => void;
    className?: string;
}
interface ChipProps {
    slot: TimeSlot;
    isSelected: boolean;
    onSelect: (id: string) => void;
    shouldReduce: boolean;
}
export declare function TimeSlotStep({ slots, selectedSlotId, onSlotSelect, className }: TimeSlotStepProps): import("react").JSX.Element;
export declare namespace TimeSlotStep {
    var Chip: ({ slot, isSelected, onSelect, shouldReduce }: ChipProps) => import("react").JSX.Element;
}
export {};
