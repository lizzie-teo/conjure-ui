import type { TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types';
export interface DeliveryBookingSuccessProps {
    bookingRef: string;
    method: 'home-delivery' | 'click-collect';
    scheduledDate: string;
    scheduledSlot: Pick<TimeSlot, 'startTime' | 'endTime' | 'tier'>;
    pointsEarned?: number;
    pointsRedeemed?: number;
    currency: string;
    ctaLabel?: string;
    onCta: () => void;
    onAddCalendar?: () => void;
    className?: string;
}
export declare function DeliveryBookingSuccess({ bookingRef, method, scheduledDate, scheduledSlot, pointsEarned, pointsRedeemed, currency, ctaLabel, onCta, onAddCalendar, className, }: DeliveryBookingSuccessProps): import("react").JSX.Element;
