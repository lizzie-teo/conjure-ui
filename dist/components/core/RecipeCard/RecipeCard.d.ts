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
export interface RecipeCardProps {
    title: string;
    prepTime: string;
    difficulty: Difficulty;
    defaultServings?: number;
    ingredients: Ingredient[];
    image?: string;
    imageAlt?: string;
    onIngredientClick?: (ingredient: Ingredient) => void;
    onAddToCart?: (ingredients: ScaledIngredient[], servings: number) => void;
    className?: string;
}
interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
}
interface HeaderProps {
    title: string;
    prepTime: string;
    difficulty: Difficulty;
    className?: string;
}
interface IngredientListProps {
    ingredients: Ingredient[];
    className?: string;
}
interface ActionsProps {
    selectedCount: number;
    onAddToCart?: () => void;
    className?: string;
}
export declare function RecipeCard({ title, prepTime, difficulty, defaultServings, ingredients, image, imageAlt, onIngredientClick, onAddToCart, className, }: RecipeCardProps): import("react").JSX.Element;
export declare namespace RecipeCard {
    var Image: ({ src, alt, className }: ImageProps) => import("react").JSX.Element;
    var Header: ({ title, prepTime, difficulty, className }: HeaderProps) => import("react").JSX.Element;
    var IngredientList: ({ ingredients, className }: IngredientListProps) => import("react").JSX.Element;
    var Actions: ({ selectedCount, onAddToCart, className }: ActionsProps) => import("react").JSX.Element;
}
export {};
