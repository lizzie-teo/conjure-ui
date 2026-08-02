"use client";
import { cn as e } from "../../../lib/utils.js";
import { PriceDisplay as t } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { Button as n } from "../../ui/button.js";
import { AddressTile as r } from "../../primitives/AddressTile/AddressTile.js";
import { DetailList as i } from "../DetailList/DetailList.js";
import { CartItem as a } from "../CartItem/CartItem.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region components/core/OrderReview/OrderReview.tsx
function c({ title: t, children: n, className: r, ...i }) {
	return /* @__PURE__ */ s("div", {
		className: e("space-y-2 md:space-y-3", r),
		...i,
		children: [/* @__PURE__ */ o("h3", {
			className: "text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide px-4 md:px-5",
			children: t
		}), n]
	});
}
function l({ subtotal: e, shipping: n, total: r, currency: a, ...c }) {
	return /* @__PURE__ */ s(i, {
		...c,
		children: [
			/* @__PURE__ */ o(i.Row, {
				label: "Subtotal",
				value: /* @__PURE__ */ o(t, {
					amount: e,
					currency: a
				})
			}),
			/* @__PURE__ */ o(i.Row, {
				label: "Shipping",
				value: n === 0 ? /* @__PURE__ */ o("span", {
					className: "text-xs md:text-sm font-medium text-success",
					children: "Free"
				}) : /* @__PURE__ */ o(t, {
					amount: n,
					currency: a
				})
			}),
			/* @__PURE__ */ o(i.Row, {
				label: "Total",
				value: /* @__PURE__ */ o(t, {
					amount: r,
					currency: a,
					className: "[&_span:last-child]:text-sm [&_span:last-child]:md:text-base [&_span:last-child]:font-semibold"
				})
			})
		]
	});
}
function u({ items: t, shippingAddress: i, subtotal: l, shipping: d, total: f, currency: p = "USD", onConfirm: m, className: h, ...g }) {
	return /* @__PURE__ */ s("div", {
		className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", "flex flex-col gap-5 md:gap-6 py-5 md:py-6", h),
		...g,
		children: [
			/* @__PURE__ */ o(c, {
				title: "Items",
				children: /* @__PURE__ */ o("div", {
					className: "flex flex-col gap-2 md:gap-3 px-4 md:px-5",
					children: t.map((e, t) => /* @__PURE__ */ o(a, {
						...e,
						currency: p,
						onQuantityChange: void 0,
						onRemove: void 0
					}, t))
				})
			}),
			/* @__PURE__ */ o(c, {
				title: "Ship to",
				children: /* @__PURE__ */ o("div", {
					className: "px-4 md:px-5",
					children: /* @__PURE__ */ o(r, { ...i })
				})
			}),
			/* @__PURE__ */ o(c, {
				title: "Order total",
				children: /* @__PURE__ */ o(u.Totals, {
					subtotal: l,
					shipping: d,
					total: f,
					currency: p
				})
			}),
			/* @__PURE__ */ o("div", {
				className: "px-4 md:px-5",
				children: /* @__PURE__ */ o(n, {
					onClick: m,
					className: "w-full h-12 md:h-10",
					children: "Confirm & authenticate"
				})
			})
		]
	});
}
u.Section = c, u.Totals = l;
//#endregion
export { u as OrderReview };
