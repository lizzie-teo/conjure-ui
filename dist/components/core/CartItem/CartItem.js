"use client";
import { cn as e } from "../../../lib/utils.js";
import { PriceDisplay as t } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { Button as n } from "../../ui/button.js";
import { QuantityStepper as r } from "../../primitives/QuantityStepper/QuantityStepper.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { X as o } from "lucide-react";
//#region components/core/CartItem/CartItem.tsx
function s({ image: s, name: c, variant: l, price: u, currency: d = "USD", quantity: f, onQuantityChange: p, onRemove: m, className: h }) {
	return /* @__PURE__ */ a("div", {
		className: e("flex items-start gap-3 p-4 md:p-5", "bg-card border border-border rounded-xl shadow-[var(--shadow-card)]", h),
		children: [/* @__PURE__ */ i("img", {
			src: s,
			alt: c,
			className: "size-16 md:size-14 rounded-lg object-cover shrink-0"
		}), /* @__PURE__ */ a("div", {
			className: "flex-1 min-w-0 flex flex-col gap-2 md:gap-3",
			children: [/* @__PURE__ */ a("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ a("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ i("p", {
							className: "text-sm md:text-base font-medium text-foreground truncate",
							children: c
						}),
						l && /* @__PURE__ */ i("p", {
							className: "text-xs md:text-sm text-muted-foreground mt-0.5",
							children: l
						}),
						/* @__PURE__ */ i(t, {
							amount: u * f,
							currency: d,
							className: "mt-1"
						})
					]
				}), m && /* @__PURE__ */ i(n, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `Remove ${c}`,
					onClick: m,
					className: "size-8 md:size-7 shrink-0 -mt-0.5 -mr-1 text-muted-foreground",
					children: /* @__PURE__ */ i(o, { className: "size-4" })
				})]
			}), /* @__PURE__ */ i("div", { children: p ? /* @__PURE__ */ i(r, {
				value: f,
				onChange: p
			}) : /* @__PURE__ */ a("span", {
				className: "text-xs md:text-sm text-muted-foreground",
				children: ["Qty: ", f]
			}) })]
		})]
	});
}
//#endregion
export { s as CartItem };
