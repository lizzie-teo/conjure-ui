import { type EntityAvatarProps, TimestampLabel } from '../../primitives';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
type Role = 'user' | 'assistant';
export interface MessageBubbleProps extends MotionDivProps {
    role: Role;
    /** True for consecutive messages from the same sender — hides the avatar */
    grouped?: boolean;
    /** True while the AI is actively generating — triggers avatar breathe and stops on first token */
    isGenerating?: boolean;
    /** Briefly flashes a glow overlay when the AI references this message */
    isReferenced?: boolean;
}
interface ContentProps extends ComponentPropsWithRef<'div'> {
    /**
     * AI messages only: pass an array of word tokens to enable word-by-word
     * materialization. Each word fades in with a tiny upward drift as it arrives.
     * When omitted, children renders normally.
     */
    words?: string[];
}
type TimestampSubProps = ComponentProps<typeof TimestampLabel>;
interface FeedbackRowProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    onThumbsUp?: () => void;
    onThumbsDown?: () => void;
}
export declare function MessageBubble({ role, grouped, isGenerating, isReferenced, className, children, ...props }: MessageBubbleProps): import("react").JSX.Element;
export declare namespace MessageBubble {
    var Content: ({ children, words, className, ...props }: ContentProps) => import("react").JSX.Element;
    var Avatar: ({ size, ...props }: EntityAvatarProps) => import("react").JSX.Element | null;
    var Timestamp: ({ className, ...props }: TimestampSubProps) => import("react").JSX.Element;
    var FeedbackRow: ({ onThumbsUp, onThumbsDown, className, "aria-label": ariaLabel, ...props }: FeedbackRowProps) => import("react").JSX.Element;
}
export {};
