import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region components/primitives/PriceDisplay/PriceDisplay.tsx
function r(e, t) {
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: t
	}).format(e);
}
function i({ amount: i, currency: a, strikethrough: o, className: s, ...c }) {
	return /* @__PURE__ */ n("span", {
		className: e("inline-flex items-baseline gap-1.5", s),
		...c,
		children: [o !== void 0 && /* @__PURE__ */ t("span", {
			className: "text-muted-foreground line-through text-xs md:text-sm",
			children: r(o, a)
		}), /* @__PURE__ */ t("span", {
			className: "text-foreground font-semibold text-sm md:text-base",
			children: r(i, a)
		})]
	});
}
//#endregion
export { i as PriceDisplay };
