interface SubProps {
    children: React.ReactNode;
    className?: string;
}
export interface ModalSheetProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
}
export declare function ModalSheet({ open, onClose, title, description, size, children, className, }: ModalSheetProps): import("react").JSX.Element;
export declare namespace ModalSheet {
    var Header: ({ children, className }: SubProps) => import("react").JSX.Element;
    var Body: ({ children, className }: SubProps) => import("react").JSX.Element;
    var Footer: ({ children, className }: SubProps) => import("react").JSX.Element;
}
export {};
