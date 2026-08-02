import type { Branch, CarBootDetails } from '../DeliveryConfirmation/deliveryFlow.types';
export interface BranchSelectStepProps {
    branches: Branch[];
    selectedBranchId?: string;
    carBootDetails?: CarBootDetails;
    onBranchSelect: (branchId: string) => void;
    onCarBootChange: (details: CarBootDetails) => void;
    className?: string;
}
export declare function BranchSelectStep({ branches, selectedBranchId, carBootDetails, onBranchSelect, onCarBootChange, className, }: BranchSelectStepProps): import("react").JSX.Element;
export declare namespace BranchSelectStep {
    var BranchList: ({ branches, selectedBranchId, onBranchSelect }: {
        branches: Branch[];
        selectedBranchId?: string;
        onBranchSelect: (id: string) => void;
    }) => import("react").JSX.Element;
    var CarBootForm: ({ details, onChange, shouldReduce, }: {
        details: CarBootDetails;
        onChange: (d: CarBootDetails) => void;
        shouldReduce: boolean;
    }) => import("react").JSX.Element;
}
