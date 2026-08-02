import type { MotionDivProps } from '../../../lib/prop-types';
export interface ComparisonPlan {
    id: string;
    label: string;
}
export interface ComparisonCaveat {
    id: string;
    label: string;
    /** Annual cost for each plan, keyed by plan id */
    planCosts: Record<string, number>;
    /** Pre-selected on mount */
    default?: boolean;
}
export interface ComparisonScenario {
    id: string;
    label: string;
    /** Insight text shown when this scenario is active */
    insight: string;
}
export interface ComparisonCardProps extends Omit<MotionDivProps, 'children' | 'title'> {
    /** Card heading, e.g. "Why Comprehensive?" */
    title: string;
    /** Cost basis note shown below title */
    subtitle?: string;
    /** Question label above caveat pills */
    caveatQuestion?: string;
    plans: ComparisonPlan[];
    caveats: ComparisonCaveat[];
    scenarios?: ComparisonScenario[];
    currency?: string;
    onViewDetails?: () => void;
}
export declare function ComparisonCard({ title, subtitle, caveatQuestion, plans, caveats, scenarios, currency, onViewDetails, className, ...props }: ComparisonCardProps): import("react").JSX.Element;
