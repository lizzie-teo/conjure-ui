import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
type SubProps = ComponentPropsWithRef<'div'>;
export interface ModalSheetProps extends Omit<MotionDivProps, 'title'> {
    open: boolean;
    onClose: () => void;
    /** Overrides the DOM `title` attribute — rendered as the dialog heading. */
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}
export declare function ModalSheet({ open, onClose, title, description, size, children, className, ref: forwardedRef, ...props }: ModalSheetProps): import("react").JSX.Element;
export declare namespace ModalSheet {
    var Header: ({ children, className, ...props }: SubProps) => import("react").JSX.Element;
    var Body: ({ children, className, ...props }: SubProps) => import("react").JSX.Element;
    var Footer: ({ children, className, ...props }: SubProps) => import("react").JSX.Element;
}
export {};
