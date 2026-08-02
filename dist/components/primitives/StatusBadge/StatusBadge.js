import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
//#region components/primitives/StatusBadge/StatusBadge.tsx
var r = "inline-flex items-center rounded-full px-2 py-0.5 text-xs md:text-sm font-medium", i = {
	default: "bg-muted text-muted-foreground",
	success: "bg-success/10 text-success",
	warning: "bg-warning/10 text-warning",
	error: "bg-destructive/10 text-destructive",
	info: "bg-primary/10 text-primary"
}, a = n(r, {
	variants: { variant: i },
	defaultVariants: { variant: "default" }
});
function o({ label: n, variant: r, className: i, ...o }) {
	return /* @__PURE__ */ t("span", {
		className: e(a({ variant: r }), i),
		...o,
		children: n
	});
}
//#endregion
export { o as StatusBadge, r as statusBadgeBase, i as statusBadgeVariantClasses };
