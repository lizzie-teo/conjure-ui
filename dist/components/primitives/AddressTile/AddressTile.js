import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region components/primitives/AddressTile/AddressTile.tsx
function r({ name: r, line1: i, line2: a, city: o, state: s, postcode: c, country: l, className: u, ...d }) {
	let f = [
		o,
		s,
		c
	].filter(Boolean).join(", ");
	return /* @__PURE__ */ n("address", {
		className: e("not-italic text-xs md:text-sm text-foreground leading-relaxed space-y-0.5", u),
		...d,
		children: [
			/* @__PURE__ */ t("p", {
				className: "font-medium",
				children: r
			}),
			/* @__PURE__ */ t("p", {
				className: "text-muted-foreground",
				children: i
			}),
			a && /* @__PURE__ */ t("p", {
				className: "text-muted-foreground",
				children: a
			}),
			/* @__PURE__ */ t("p", {
				className: "text-muted-foreground",
				children: f
			}),
			/* @__PURE__ */ t("p", {
				className: "text-muted-foreground",
				children: l
			})
		]
	});
}
//#endregion
export { r as AddressTile };
