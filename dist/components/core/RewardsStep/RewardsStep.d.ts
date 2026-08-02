import type { RewardsSummary, SubstitutionPreference } from '../DeliveryConfirmation/deliveryFlow.types';
export interface RewardsStepProps {
    rewards: RewardsSummary;
    redeemPoints: boolean;
    onRedeemToggle: (redeem: boolean) => void;
    substitution: SubstitutionPreference;
    onSubstitutionChange: (pref: SubstitutionPreference) => void;
    className?: string;
}
export declare function RewardsStep({ rewards, redeemPoints, onRedeemToggle, substitution, onSubstitutionChange, className, }: RewardsStepProps): import("react").JSX.Element;
export declare namespace RewardsStep {
    var PointsSummary: ({ rewards, redeemPoints, onRedeemToggle, }: {
        rewards: RewardsSummary;
        redeemPoints: boolean;
        onRedeemToggle: (redeem: boolean) => void;
    }) => import("react").JSX.Element;
    var BonusPrompt: ({ prompt }: {
        prompt: string;
    }) => import("react").JSX.Element;
    var SubstitutionSelector: ({ value, onChange, }: {
        value: SubstitutionPreference;
        onChange: (v: SubstitutionPreference) => void;
    }) => import("react").JSX.Element;
}
