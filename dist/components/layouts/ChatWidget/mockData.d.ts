import type { ReactNode } from 'react';
export interface MockProduct {
    name: string;
    subtitle?: string;
    price: number;
    image?: string;
    badge?: string;
    badgeVariant?: 'success' | 'warning' | 'error' | 'info' | 'default';
    primaryAction?: string;
    secondaryAction?: string;
}
export interface MockMessage {
    id?: string;
    role: 'user' | 'bot';
    text?: string;
    products?: MockProduct[];
    quickReplies?: string[];
    /** Arbitrary rich content rendered below the message bubble (e.g. ComparisonCard, DetailList) */
    richContent?: ReactNode;
    /** When set, this bot message references the earlier message with this id (triggers glow + SVG line) */
    referencedId?: string;
}
export interface MockData {
    botName?: string;
    avatar?: string;
    messages: MockMessage[];
}
export declare const THREAD_REF_MOCK: MockData;
export declare const VERTICAL_MOCK: Record<'grocery' | 'pharmacy', MockData>;
