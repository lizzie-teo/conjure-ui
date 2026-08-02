import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps, MotionUlProps } from '../../../lib/prop-types';
type Difficulty = 'easy' | 'medium' | 'hard';
export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    selected?: boolean;
}
export interface ScaledIngredient extends Ingredient {
    scaledQuantity: number;
}
export interface RecipeCardProps extends Omit<MotionDivProps, 'children' | 'title'> {
    /** Overrides the DOM `title` attribute — the recipe name. */
    title: string;
    prepTime: string;
    difficulty: Difficulty;
    defaultServings?: number;
    ingredients: Ingredient[];
    image?: string;
    imageAlt?: string;
    onIngredientClick?: (ingredient: Ingredient) => void;
    onAddToCart?: (ingredients: ScaledIngredient[], servings: number) => void;
}
interface ImageProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    src: string;
    alt?: string;
}
interface HeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'title'> {
    /** Overrides the DOM `title` attribute — the recipe name. */
    title: string;
    prepTime: string;
    difficulty: Difficulty;
}
interface IngredientListProps extends Omit<MotionUlProps, 'children'> {
    ingredients: Ingredient[];
}
interface ActionsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    selectedCount: number;
    onAddToCart?: () => void;
}
export declare function RecipeCard({ title, prepTime, difficulty, defaultServings, ingredients, image, imageAlt, onIngredientClick, onAddToCart, className, ...props }: RecipeCardProps): import("react").JSX.Element;
export declare namespace RecipeCard {
    var Image: ({ src, alt, className, ...props }: ImageProps) => import("react").JSX.Element;
    var Header: ({ title, prepTime, difficulty, className, ...props }: HeaderProps) => import("react").JSX.Element;
    var IngredientList: ({ ingredients, className, ...props }: IngredientListProps) => import("react").JSX.Element;
    var Actions: ({ selectedCount, onAddToCart, className, ...props }: ActionsProps) => import("react").JSX.Element;
}
export {};
