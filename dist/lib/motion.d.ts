/**
 * Returns motion props that shake the element on error.
 * Reduced-motion fallback: opacity pulse instead of positional shake.
 *
 * Usage:
 *   const shakeProps = useErrorShake(hasError)
 *   <motion.div {...shakeProps}>…</motion.div>
 */
export declare function useErrorShake(hasError: boolean): {
    animate: {
        opacity: number[];
        x?: undefined;
    } | {
        opacity?: undefined;
        x?: undefined;
    };
    transition: {
        duration: number;
        ease: "easeInOut";
    };
} | {
    animate: {
        x: number[];
        opacity?: undefined;
    } | {
        opacity?: undefined;
        x?: undefined;
    };
    transition: {
        duration: number;
        ease: "easeInOut";
    };
};
