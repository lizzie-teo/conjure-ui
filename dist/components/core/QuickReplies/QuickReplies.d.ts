import type { MotionDivProps } from '../../../lib/prop-types';
export interface QuickRepliesProps extends Omit<MotionDivProps, 'children' | 'onSelect'> {
    options: string[];
    /** Note: replaces the DOM `onSelect` — receives the chosen option string. */
    onSelect: (option: string) => void;
}
export declare function QuickReplies({ options, onSelect, className, ...props }: QuickRepliesProps): import("react").JSX.Element;
