"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n } from "react/jsx-runtime";
import { motion as r, useReducedMotion as i } from "motion/react";
//#region components/core/QuickReplies/QuickReplies.tsx
var a = {
	hidden: {},
	show: { transition: {
		staggerChildren: .05,
		delayChildren: .05
	} }
}, o = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		}
	}
}, s = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function c({ options: c, onSelect: l, className: u, ...d }) {
	let f = i();
	return /* @__PURE__ */ n(r.div, {
		variants: a,
		initial: "hidden",
		animate: "show",
		className: e("flex gap-2 overflow-x-auto pb-1 scrollbar-none", u),
		role: "group",
		"aria-label": "Quick reply options",
		...d,
		children: c.map((e) => /* @__PURE__ */ n(r.div, {
			variants: f ? s : o,
			className: "shrink-0",
			children: /* @__PURE__ */ n(t, {
				variant: "outline",
				size: "sm",
				onClick: () => l(e),
				className: "rounded-full whitespace-nowrap",
				children: e
			})
		}, e))
	});
}
//#endregion
export { c as QuickReplies };
