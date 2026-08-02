import type { TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export interface TimeSlotStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    slots: TimeSlot[];
    selectedSlotId?: string;
    onSlotSelect: (slotId: string) => void;
}
interface ChipProps extends Omit<MotionDivProps, 'children' | 'onSelect' | 'slot'> {
    /** Overrides the DOM `slot` attribute — the time slot this chip renders. */
    slot: TimeSlot;
    isSelected: boolean;
    /** Overrides the DOM `onSelect` handler — fires with the slot id. */
    onSelect: (id: string) => void;
    shouldReduce: boolean;
}
export declare function TimeSlotStep({ slots, selectedSlotId, onSlotSelect, className, ...props }: TimeSlotStepProps): import("react").JSX.Element;
export declare namespace TimeSlotStep {
    var Chip: ({ slot, isSelected, onSelect, shouldReduce, ...props }: ChipProps) => import("react").JSX.Element;
}
export {};
