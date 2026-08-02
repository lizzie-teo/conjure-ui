import type { MotionDivProps } from '../../../lib/prop-types';
type SelectionType = 'radio' | 'checkbox';
export interface SelectionGroupProps extends Omit<MotionDivProps, 'onChange' | 'defaultValue'> {
    type?: SelectionType;
    value?: string | string[];
    defaultValue?: string | string[];
    /** Note: replaces the DOM `onChange` — receives the new selection. */
    onChange?: (value: string | string[]) => void;
}
export interface OptionProps {
    value: string;
    children: React.ReactNode;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
}
export declare function SelectionGroup({ type, value, defaultValue, onChange, className, children, ...props }: SelectionGroupProps): import("react").JSX.Element;
export declare namespace SelectionGroup {
    var Option: ({ value, children, description, icon, className }: OptionProps) => import("react").JSX.Element;
}
export {};
