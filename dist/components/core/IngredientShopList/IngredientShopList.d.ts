export interface ProductOption {
    id: string;
    name: string;
    brand: string;
    imageUrl?: string;
    price: number;
    originalPrice?: number;
    currency: string;
    onSale?: boolean;
}
export interface IngredientProduct {
    ingredientId: string;
    ingredientName: string;
    recommendedProduct: ProductOption;
    alternatives?: ProductOption[];
}
export interface ResolvedItem extends IngredientProduct {
    selectedProduct: ProductOption;
}
export interface IngredientShopListProps {
    items: IngredientProduct[];
    onAddToCart?: (resolved: ResolvedItem[]) => void;
    className?: string;
}
interface RowProps {
    item: IngredientProduct;
    isLast?: boolean;
    className?: string;
}
interface ActionsProps {
    items: IngredientProduct[];
    onAddToCart?: () => void;
    className?: string;
}
export declare function IngredientShopList({ items, onAddToCart, className, }: IngredientShopListProps): import("react").JSX.Element;
export declare namespace IngredientShopList {
    var Row: ({ item, isLast, className }: RowProps) => import("react").JSX.Element;
    var Actions: ({ items, onAddToCart, className }: ActionsProps) => import("react").JSX.Element;
}
export {};
