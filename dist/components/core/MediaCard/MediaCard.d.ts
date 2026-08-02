import type { MotionDivProps } from '../../../lib/prop-types';
export type MediaCardProps = MotionDivProps;
interface MediaProps {
    src: string;
    alt: string;
    className?: string;
}
interface TitleProps {
    children: React.ReactNode;
    className?: string;
}
interface SubtitleProps {
    children: React.ReactNode;
    className?: string;
}
interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}
interface MetaProps {
    children: React.ReactNode;
    className?: string;
}
interface BodyProps {
    children: React.ReactNode;
    className?: string;
}
export declare function MediaCard({ className, children, ...props }: MediaCardProps): import("react").JSX.Element;
export declare namespace MediaCard {
    var Media: ({ src, alt, className }: MediaProps) => import("react").JSX.Element;
    var Body: ({ children, className }: BodyProps) => import("react").JSX.Element;
    var Title: ({ children, className }: TitleProps) => import("react").JSX.Element;
    var Subtitle: ({ children, className }: SubtitleProps) => import("react").JSX.Element;
    var Badge: ({ children, className }: BadgeProps) => import("react").JSX.Element;
    var Meta: ({ children, className }: MetaProps) => import("react").JSX.Element;
}
export {};
