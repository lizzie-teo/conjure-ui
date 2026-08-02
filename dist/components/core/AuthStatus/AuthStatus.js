"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { motion as i, useReducedMotion as a } from "motion/react";
import { Check as o, X as s } from "lucide-react";
//#region components/core/AuthStatus/AuthStatus.tsx
var c = {
	success: {
		label: "Identity verified",
		message: "You're all set — proceeding to payment."
	},
	error: {
		label: "Not verified",
		message: "We couldn't verify your identity. Please try again."
	}
};
function l({ state: l, message: u, className: d, ...f }) {
	let p = a();
	return /* @__PURE__ */ r(i.div, {
		initial: {
			opacity: 0,
			y: p ? 0 : 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		className: e("flex flex-col gap-2 p-4 md:p-5 rounded-xl border", l === "success" ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20", d),
		role: "status",
		"aria-live": "polite",
		...f,
		children: [/* @__PURE__ */ r("div", {
			className: "flex items-center gap-2",
			children: [l === "success" ? /* @__PURE__ */ n(o, { className: "size-4 text-success shrink-0" }) : /* @__PURE__ */ n(s, { className: "size-4 text-destructive shrink-0" }), /* @__PURE__ */ n(t, {
				label: c[l].label,
				variant: l === "success" ? "success" : "error"
			})]
		}), /* @__PURE__ */ n("p", {
			className: "text-xs md:text-sm text-muted-foreground",
			children: u ?? c[l].message
		})]
	});
}
//#endregion
export { l as AuthStatus };
