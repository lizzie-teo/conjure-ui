import type { ComponentPropsWithRef } from 'react';
export interface CompareColumn {
    id: string;
    label: string;
    image?: string;
    price: number;
    currency?: string;
    attributes: Record<string, string | boolean>;
}
export interface CompareTableProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onSelect'> {
    columns: CompareColumn[];
    attributeLabels: Record<string, string>;
    /** Overrides the DOM `onSelect` handler — fires with the chosen column id. */
    onSelect?: (id: string) => void;
}
export declare function CompareTable({ columns, attributeLabels, onSelect, className, ...props }: CompareTableProps): import("react").JSX.Element;
