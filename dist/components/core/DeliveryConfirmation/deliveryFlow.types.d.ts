import type { AvailabilityLevel } from '../../primitives/AvailabilityDot/AvailabilityDot';
export type { AvailabilityLevel };
export type DeliveryStep = 'method' | 'branch' | 'schedule' | 'rewards' | 'confirm';
export type SubstitutionPreference = 'allow' | 'deny' | 'notify';
export type SlotTier = 'express' | 'standard';
export interface Branch {
    id: string;
    name: string;
    distanceKm: number;
    address: string;
    availableSlots: number;
}
export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    tier: SlotTier;
    fee: number;
    currency: string;
    availability: AvailabilityLevel;
}
export interface AvailableDate {
    date: string;
    availability: AvailabilityLevel;
    cutoffAt?: string;
}
export interface RewardsSummary {
    programName: string;
    currentPoints: number;
    pointsEarned: number;
    bonusPointsAvailable?: number;
    bonusPrompt?: string;
    pointsValue: number;
    currency: string;
}
export interface CarBootDetails {
    vehicleColour: string;
    vehicleMake: string;
    registrationPlate: string;
    arrivalNotification: boolean;
}
export interface CompletedBooking {
    method: 'home-delivery' | 'click-collect';
    branchId?: string;
    carBootDetails?: CarBootDetails;
    date: string;
    slotId: string;
    redeemPoints: boolean;
    substitution: SubstitutionPreference;
    bookingRef: string;
}
