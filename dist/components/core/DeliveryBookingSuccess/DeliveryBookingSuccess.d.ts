import type { TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
export interface DeliveryBookingSuccessProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
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
}
export declare function DeliveryBookingSuccess({ bookingRef, method, scheduledDate, scheduledSlot, pointsEarned, pointsRedeemed, currency, ctaLabel, onCta, onAddCalendar, className, ...props }: DeliveryBookingSuccessProps): import("react").JSX.Element;
