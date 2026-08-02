import { type ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
declare const variantConfig: {
    info: {
        icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
        className: string;
        role: "status";
    };
    success: {
        icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
        className: string;
        role: "status";
    };
    warning: {
        icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
        className: string;
        role: "alert";
    };
    error: {
        icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
        className: string;
        role: "alert";
    };
};
export interface ToastBannerProps extends Omit<MotionDivProps, 'children'> {
    message: string;
    variant?: keyof typeof variantConfig;
    duration?: number;
    onDismiss?: () => void;
}
export declare function ToastBanner({ message, variant, duration, onDismiss, className, ...props }: ToastBannerProps): import("react").JSX.Element;
export type ToastBannerGroupProps = ComponentPropsWithRef<'div'>;
export declare function ToastBannerGroup({ children, className, ...props }: ToastBannerGroupProps): import("react").JSX.Element;
export {};
