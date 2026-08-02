import type { AvailableDate } from '../DeliveryConfirmation/deliveryFlow.types';
export interface DateSelectStepProps {
    availableDates: AvailableDate[];
    selectedDate?: string;
    onDateSelect: (date: string) => void;
    className?: string;
}
interface CellProps {
    date: AvailableDate;
    isSelected: boolean;
    onSelect: (date: string) => void;
    shouldReduce: boolean;
}
export declare function DateSelectStep({ availableDates, selectedDate, onDateSelect, className, }: DateSelectStepProps): import("react").JSX.Element;
export declare namespace DateSelectStep {
    var Cell: ({ date, isSelected, onSelect, shouldReduce }: CellProps) => import("react").JSX.Element;
}
export {};
