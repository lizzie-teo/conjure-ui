import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
export type MediaCardProps = MotionDivProps;
interface MediaProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    src: string;
    alt: string;
}
type DivSlotProps = ComponentPropsWithRef<'div'>;
export declare function MediaCard({ className, children, ...props }: MediaCardProps): import("react").JSX.Element;
export declare namespace MediaCard {
    var Media: ({ src, alt, className, ...props }: MediaProps) => import("react").JSX.Element;
    var Body: ({ children, className, ...props }: DivSlotProps) => import("react").JSX.Element;
    var Title: ({ children, className, ...props }: ComponentPropsWithRef<"h3">) => import("react").JSX.Element;
    var Subtitle: ({ children, className, ...props }: ComponentPropsWithRef<"p">) => import("react").JSX.Element;
    var Badge: ({ children, className, ...props }: DivSlotProps) => import("react").JSX.Element;
    var Meta: ({ children, className, ...props }: DivSlotProps) => import("react").JSX.Element;
}
export {};
