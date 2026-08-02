import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps } from '../../../lib/prop-types';
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
export interface IngredientShopListProps extends Omit<MotionDivProps, 'children'> {
    items: IngredientProduct[];
    onAddToCart?: (resolved: ResolvedItem[]) => void;
}
interface RowProps extends Omit<MotionDivProps, 'children'> {
    item: IngredientProduct;
    isLast?: boolean;
}
interface ActionsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    items: IngredientProduct[];
    onAddToCart?: () => void;
}
export declare function IngredientShopList({ items, onAddToCart, className, ...props }: IngredientShopListProps): import("react").JSX.Element;
export declare namespace IngredientShopList {
    var Row: ({ item, isLast, className, ...props }: RowProps) => import("react").JSX.Element;
    var Actions: ({ items, onAddToCart, className, ...props }: ActionsProps) => import("react").JSX.Element;
}
export {};
