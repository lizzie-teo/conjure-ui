import type { AvailableDate } from '../DeliveryConfirmation/deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export interface DateSelectStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    availableDates: AvailableDate[];
    selectedDate?: string;
    onDateSelect: (date: string) => void;
}
interface CellProps extends Omit<MotionDivProps, 'children' | 'onSelect'> {
    date: AvailableDate;
    isSelected: boolean;
    /** Overrides the DOM `onSelect` handler — fires with the cell's ISO date. */
    onSelect: (date: string) => void;
    shouldReduce: boolean;
}
export declare function DateSelectStep({ availableDates, selectedDate, onDateSelect, className, ...props }: DateSelectStepProps): import("react").JSX.Element;
export declare namespace DateSelectStep {
    var Cell: ({ date, isSelected, onSelect, shouldReduce, className, ...props }: CellProps) => import("react").JSX.Element;
}
export {};
