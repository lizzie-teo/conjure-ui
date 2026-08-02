import type { ComponentPropsWithRef } from 'react';
import type { MotionDivProps, MotionUlProps } from '../../../lib/prop-types';
export type MakeupOccasion = 'day' | 'night';
export type MakeupUndertone = 'warm' | 'cool' | 'neutral' | 'olive-warm';
export type MakeupDepth = 'fair' | 'light' | 'medium' | 'deep';
export type MakeupProductType = 'eye' | 'lip' | 'cheek' | 'base' | 'palette';
export type MakeupRecipeFormat = 'individual' | 'palette';
export interface MakeupSwatch {
    /** Hex of the actual makeup shade — this is product colour data, not a design token */
    hex: string;
    name: string;
}
export interface MakeupProduct {
    id: string;
    type: MakeupProductType;
    label: string;
    shade: string;
    swatch: MakeupSwatch;
    image?: string;
    imageAlt?: string;
    isFocalPoint?: boolean;
    undertoneNote?: string;
}
export interface MakeupRecipeStory {
    harmony: string;
    skinTone: string;
}
export interface MakeupRecipe {
    id: string;
    occasion: MakeupOccasion;
    format: MakeupRecipeFormat;
    lookName: string;
    story: MakeupRecipeStory;
    products: MakeupProduct[];
    undertone: MakeupUndertone;
    depth?: MakeupDepth;
}
export type MakeupHeroVariant = 'collage' | 'carousel';
export interface MakeupRecipeCardProps extends Omit<MotionDivProps, 'children'> {
    recipe: MakeupRecipe;
    hero?: MakeupHeroVariant;
    onProductClick?: (product: MakeupProduct) => void;
    onAddToCart?: (products: MakeupProduct[]) => void;
    onSave?: (recipe: MakeupRecipe) => void;
}
/** Hero, Story and Actions all render a plain `<div>` root. */
type SectionProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;
export declare function MakeupRecipeCard({ recipe, hero, onProductClick, onAddToCart, onSave, className, ...props }: MakeupRecipeCardProps): import("react").JSX.Element;
export declare namespace MakeupRecipeCard {
    var Hero: ({ className, ...props }: SectionProps) => import("react").JSX.Element;
    var Story: ({ className, ...props }: SectionProps) => import("react").JSX.Element;
    var ProductList: ({ className, ...props }: Omit<MotionUlProps, "children">) => import("react").JSX.Element;
    var Actions: ({ className, ...props }: SectionProps) => import("react").JSX.Element;
}
export {};
