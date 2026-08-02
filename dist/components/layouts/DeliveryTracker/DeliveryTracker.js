"use client";
import { cn as e } from "../../../lib/utils.js";
import { OrderStatusCard as t } from "../../core/OrderStatusCard/OrderStatusCard.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region components/layouts/DeliveryTracker/DeliveryTracker.tsx
function i({ children: t, className: r }) {
	return /* @__PURE__ */ n("div", {
		className: e("h-40 md:h-56 w-full overflow-hidden rounded-t-xl", r),
		children: t ?? /* @__PURE__ */ n("div", {
			className: "h-full w-full bg-muted flex items-center justify-center",
			children: /* @__PURE__ */ n("span", {
				className: "text-xs md:text-sm text-muted-foreground select-none",
				children: "Map unavailable"
			})
		})
	});
}
function a({ orderId: r, steps: i, eta: a, className: o }) {
	return /* @__PURE__ */ n(t, {
		orderId: r,
		steps: i,
		eta: a,
		className: e("rounded-t-none border-t-0", o)
	});
}
function o({ orderId: t, steps: i, eta: a, mapSlot: s, className: c }) {
	return /* @__PURE__ */ r("div", {
		className: e("border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", c),
		children: [/* @__PURE__ */ n(o.Map, { children: s }), /* @__PURE__ */ n(o.Steps, {
			orderId: t,
			steps: i,
			eta: a
		})]
	});
}
o.Map = i, o.Steps = a;
//#endregion
export { o as DeliveryTracker };
