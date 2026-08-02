"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Minus as i, Plus as a } from "lucide-react";
//#region components/primitives/QuantityStepper/QuantityStepper.tsx
function o({ value: o, min: s = 1, max: c = 99, onChange: l, disabled: u = !1, className: d, ...f }) {
	let p = o <= s, m = o >= c;
	return /* @__PURE__ */ r("div", {
		role: "group",
		"aria-label": "Quantity",
		className: e("inline-flex items-center gap-2", d),
		...f,
		children: [
			/* @__PURE__ */ n(t, {
				variant: "outline",
				size: "icon",
				"aria-label": "Decrease quantity",
				disabled: u || p,
				onClick: () => l(o - 1),
				className: "size-12 md:size-10 rounded-md shrink-0",
				children: /* @__PURE__ */ n(i, { className: "size-3.5" })
			}),
			/* @__PURE__ */ n("span", {
				"aria-live": "polite",
				"aria-atomic": "true",
				className: "min-w-[2rem] text-center text-sm md:text-base font-medium text-foreground select-none",
				children: o
			}),
			/* @__PURE__ */ n(t, {
				variant: "outline",
				size: "icon",
				"aria-label": "Increase quantity",
				disabled: u || m,
				onClick: () => l(o + 1),
				className: "size-12 md:size-10 rounded-md shrink-0",
				children: /* @__PURE__ */ n(a, { className: "size-3.5" })
			})
		]
	});
}
//#endregion
export { o as QuantityStepper };
