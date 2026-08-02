"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { PriceDisplay as n } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { TimestampLabel as r } from "../../primitives/TimestampLabel/TimestampLabel.js";
import { DetailList as i } from "../DetailList/DetailList.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region components/core/ReceiptSummary/ReceiptSummary.tsx
function s({ orderId: s, items: c, subtotal: l, shipping: u, total: d, currency: f = "USD", paidAt: p, className: m, ...h }) {
	return /* @__PURE__ */ o("div", {
		className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", "flex flex-col", m),
		...h,
		children: [
			/* @__PURE__ */ o("div", {
				className: "flex items-start justify-between gap-3 px-4 md:px-5 py-4 md:py-5 border-b border-border",
				children: [/* @__PURE__ */ o("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ o("span", {
						className: "text-xs md:text-sm text-muted-foreground",
						children: ["Order #", s]
					}), p && /* @__PURE__ */ a(r, { datetime: p })]
				}), /* @__PURE__ */ a(t, {
					label: "Payment confirmed",
					variant: "success"
				})]
			}),
			/* @__PURE__ */ a("div", {
				className: "flex flex-col divide-y divide-border px-4 md:px-5",
				children: c.map((e, t) => /* @__PURE__ */ o("div", {
					className: "flex items-center gap-3 md:gap-4 py-3 md:py-3.5",
					children: [
						e.image && /* @__PURE__ */ a("img", {
							src: e.image,
							alt: "",
							className: "size-10 md:size-12 rounded-[calc(var(--radius)-2px)] object-cover shrink-0 bg-muted"
						}),
						/* @__PURE__ */ o("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ a("p", {
								className: "text-sm md:text-base font-medium text-foreground truncate",
								children: e.name
							}), e.quantity > 1 && /* @__PURE__ */ o("p", {
								className: "text-xs md:text-sm text-muted-foreground",
								children: ["Qty ", e.quantity]
							})]
						}),
						/* @__PURE__ */ a(n, {
							amount: e.price * e.quantity,
							currency: f,
							className: "shrink-0"
						})
					]
				}, t))
			}),
			/* @__PURE__ */ a("div", {
				className: "border-t border-border py-1",
				children: /* @__PURE__ */ o(i, { children: [
					/* @__PURE__ */ a(i.Row, {
						label: "Subtotal",
						value: /* @__PURE__ */ a(n, {
							amount: l,
							currency: f
						})
					}),
					/* @__PURE__ */ a(i.Row, {
						label: "Shipping",
						value: u === 0 ? /* @__PURE__ */ a("span", {
							className: "text-xs md:text-sm font-medium text-success",
							children: "Free"
						}) : /* @__PURE__ */ a(n, {
							amount: u,
							currency: f
						})
					}),
					/* @__PURE__ */ a(i.Row, {
						label: "Total",
						value: /* @__PURE__ */ a(n, {
							amount: d,
							currency: f,
							className: "[&_span:last-child]:font-semibold"
						})
					})
				] })
			})
		]
	});
}
//#endregion
export { s as ReceiptSummary };
