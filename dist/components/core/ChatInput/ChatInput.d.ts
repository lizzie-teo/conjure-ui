import { Button } from '../../ui/button';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
export interface ChatInputProps extends ComponentPropsWithRef<'div'> {
    onSend: (value: string) => void;
    disabled?: boolean;
}
/** `value`/`onChange` are owned by the parent `<ChatInput>` and cannot be overridden. */
type FieldProps = Omit<ComponentPropsWithRef<'textarea'>, 'value' | 'onChange' | 'children'>;
type SendProps = Omit<ComponentProps<typeof Button>, 'children'>;
export declare function ChatInput({ onSend, disabled, className, children, ...props }: ChatInputProps): import("react").JSX.Element;
export declare namespace ChatInput {
    var Field: ({ placeholder, className, ref: forwardedRef, "aria-label": ariaLabel, ...props }: FieldProps) => import("react").JSX.Element;
    var Send: ({ className, "aria-label": ariaLabel, ...props }: SendProps) => import("react").JSX.Element;
}
export {};
