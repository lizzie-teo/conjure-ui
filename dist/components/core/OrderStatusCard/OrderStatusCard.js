"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { TimestampLabel as n } from "../../primitives/TimestampLabel/TimestampLabel.js";
import { ProgressStep as r } from "../../primitives/ProgressStep/ProgressStep.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region components/core/OrderStatusCard/OrderStatusCard.tsx
function o({ orderId: o, steps: s, eta: c, className: l, ...u }) {
	return /* @__PURE__ */ a("div", {
		className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)]", "flex flex-col gap-4 md:gap-5 p-4 md:p-5", l),
		...u,
		children: [
			c && /* @__PURE__ */ a("div", {
				className: "flex flex-col gap-0.5",
				children: [/* @__PURE__ */ i("span", {
					className: "text-xs md:text-sm text-muted-foreground",
					children: "Estimated arrival"
				}), /* @__PURE__ */ i("span", {
					className: "text-base md:text-lg font-semibold text-foreground",
					children: c
				})]
			}),
			/* @__PURE__ */ a("span", {
				className: "text-xs md:text-sm text-muted-foreground",
				children: ["Order #", o]
			}),
			/* @__PURE__ */ i("div", {
				className: "flex flex-col",
				children: s.map((o, c) => /* @__PURE__ */ a("div", {
					className: "flex gap-3 md:gap-4",
					children: [/* @__PURE__ */ a("div", {
						className: "flex flex-col items-center shrink-0",
						children: [/* @__PURE__ */ i("div", {
							className: "h-5 md:h-6 flex items-center justify-center",
							children: /* @__PURE__ */ i(r, { status: o.status })
						}), c < s.length - 1 && /* @__PURE__ */ i("div", { className: e("w-px flex-1", o.status === "complete" ? "bg-primary" : "bg-border") })]
					}), /* @__PURE__ */ a("div", {
						className: e("flex flex-col gap-0.5 min-w-0", c < s.length - 1 ? "pb-5 md:pb-6" : "pb-0"),
						children: [/* @__PURE__ */ a("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [/* @__PURE__ */ i("span", {
								className: e("text-sm md:text-base font-medium", o.status === "pending" ? "text-muted-foreground" : "text-foreground"),
								children: o.label
							}), o.status === "active" && /* @__PURE__ */ i(t, {
								label: "In progress",
								variant: "info"
							})]
						}), o.timestamp && o.status === "complete" && /* @__PURE__ */ i(n, { datetime: o.timestamp })]
					})]
				}, c))
			})
		]
	});
}
//#endregion
export { o as OrderStatusCard };
