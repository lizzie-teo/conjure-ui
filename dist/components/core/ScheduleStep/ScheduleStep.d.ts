import type { AvailableDate, TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
export interface ScheduleStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    availableDates: AvailableDate[];
    timeSlots: TimeSlot[];
    slotsByDate?: Record<string, TimeSlot[]>;
    selectedDate?: string;
    selectedSlotId?: string;
    onDateSelect: (date: string) => void;
    onSlotSelect: (slotId: string) => void;
}
export declare function ScheduleStep({ availableDates, timeSlots, slotsByDate, selectedDate, selectedSlotId, onDateSelect, onSlotSelect, className, ...props }: ScheduleStepProps): import("react").JSX.Element;
