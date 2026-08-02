import type { RewardsSummary, SubstitutionPreference } from '../DeliveryConfirmation/deliveryFlow.types';
import type { ComponentPropsWithRef } from 'react';
export interface RewardsStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    rewards: RewardsSummary;
    redeemPoints: boolean;
    onRedeemToggle: (redeem: boolean) => void;
    substitution: SubstitutionPreference;
    onSubstitutionChange: (pref: SubstitutionPreference) => void;
}
export interface PointsSummaryProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    rewards: RewardsSummary;
    redeemPoints: boolean;
    onRedeemToggle: (redeem: boolean) => void;
}
export interface BonusPromptProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    prompt: string;
}
export interface SubstitutionSelectorProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onChange'> {
    value: SubstitutionPreference;
    /** Overrides the DOM `onChange` handler — fires with the chosen preference. */
    onChange: (v: SubstitutionPreference) => void;
}
export declare function RewardsStep({ rewards, redeemPoints, onRedeemToggle, substitution, onSubstitutionChange, className, ...props }: RewardsStepProps): import("react").JSX.Element;
export declare namespace RewardsStep {
    var PointsSummary: ({ rewards, redeemPoints, onRedeemToggle, className, ...props }: PointsSummaryProps) => import("react").JSX.Element;
    var BonusPrompt: ({ prompt, className, ...props }: BonusPromptProps) => import("react").JSX.Element;
    var SubstitutionSelector: ({ value, onChange, className, ...props }: SubstitutionSelectorProps) => import("react").JSX.Element;
}
