import type { ComponentPropsWithRef } from 'react';
export interface AuthPromptProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    state: 'idle' | 'pending' | 'success' | 'error';
    onAuthenticate: () => void;
    onRetry?: () => void;
    errorMessage?: string;
}
export declare function AuthPrompt({ state, onAuthenticate, onRetry, errorMessage, className, ...props }: AuthPromptProps): import("react").JSX.Element;
