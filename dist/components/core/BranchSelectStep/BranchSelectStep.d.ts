import { SelectionGroup } from '../SelectionGroup/SelectionGroup';
import type { Branch, CarBootDetails } from '../DeliveryConfirmation/deliveryFlow.types';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export interface BranchSelectStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    branches: Branch[];
    selectedBranchId?: string;
    carBootDetails?: CarBootDetails;
    onBranchSelect: (branchId: string) => void;
    onCarBootChange: (details: CarBootDetails) => void;
}
export interface BranchListProps extends Omit<ComponentProps<typeof SelectionGroup>, 'children' | 'type' | 'value' | 'onChange'> {
    branches: Branch[];
    selectedBranchId?: string;
    onBranchSelect: (id: string) => void;
}
export interface CarBootFormProps extends Omit<MotionDivProps, 'children' | 'onChange'> {
    details: CarBootDetails;
    /** Overrides the DOM `onChange` handler — fires with the updated car boot details. */
    onChange: (d: CarBootDetails) => void;
    shouldReduce: boolean;
}
export declare function BranchSelectStep({ branches, selectedBranchId, carBootDetails, onBranchSelect, onCarBootChange, className, ...props }: BranchSelectStepProps): import("react").JSX.Element;
export declare namespace BranchSelectStep {
    var BranchList: ({ branches, selectedBranchId, onBranchSelect, ...props }: BranchListProps) => import("react").JSX.Element;
    var CarBootForm: ({ details, onChange, shouldReduce, className, ...props }: CarBootFormProps) => import("react").JSX.Element;
}
