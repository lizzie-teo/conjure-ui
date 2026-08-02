import { type MockData, type MockProduct, type MockMessage } from './mockData';
import type { ComponentPropsWithRef } from 'react';
export type { MockData, MockProduct, MockMessage };
export interface ChatWidgetProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    vertical?: 'grocery' | 'pharmacy';
    mockData?: MockData;
    onAddToCart?: (product: MockProduct) => void;
    onSuggestSubstitution?: (product: MockProduct) => void;
    onEscalateToHuman?: (context: {
        messages: MockMessage[];
    }) => void;
}
export declare function ChatWidget({ vertical, mockData, onAddToCart, onSuggestSubstitution, onEscalateToHuman, className, ...props }: ChatWidgetProps): import("react").JSX.Element;
