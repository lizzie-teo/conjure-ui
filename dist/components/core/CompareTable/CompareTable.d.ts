export interface CompareColumn {
    id: string;
    label: string;
    image?: string;
    price: number;
    currency?: string;
    attributes: Record<string, string | boolean>;
}
export interface CompareTableProps {
    columns: CompareColumn[];
    attributeLabels: Record<string, string>;
    onSelect?: (id: string) => void;
    className?: string;
}
export declare function CompareTable({ columns, attributeLabels, onSelect, className, }: CompareTableProps): import("react").JSX.Element;
