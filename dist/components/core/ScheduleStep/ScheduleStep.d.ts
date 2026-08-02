import type { AvailableDate, TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types';
export interface ScheduleStepProps {
    availableDates: AvailableDate[];
    timeSlots: TimeSlot[];
    slotsByDate?: Record<string, TimeSlot[]>;
    selectedDate?: string;
    selectedSlotId?: string;
    onDateSelect: (date: string) => void;
    onSlotSelect: (slotId: string) => void;
    className?: string;
}
export declare function ScheduleStep({ availableDates, timeSlots, slotsByDate, selectedDate, selectedSlotId, onDateSelect, onSlotSelect, className, }: ScheduleStepProps): import("react").JSX.Element;
