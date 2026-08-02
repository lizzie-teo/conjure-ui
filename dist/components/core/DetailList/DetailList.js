"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { motion as r, useReducedMotion as i } from "motion/react";
//#region components/core/DetailList/DetailList.tsx
var a = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .04
	} }
}, o = {
	hidden: {
		opacity: 0,
		y: 8
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
function c({ label: a, value: c, className: l }) {
	let u = i();
	return /* @__PURE__ */ n(r.div, {
		variants: u ? s : o,
		className: e("flex items-center justify-between gap-4 py-2 md:py-2.5", "border-b border-border last:border-0", l),
		children: [/* @__PURE__ */ t("span", {
			className: "text-xs md:text-sm text-muted-foreground shrink-0",
			children: a
		}), /* @__PURE__ */ t("span", {
			className: "text-xs md:text-sm text-foreground font-medium text-right",
			children: c
		})]
	});
}
function l({ className: n, children: i, ...o }) {
	return /* @__PURE__ */ t(r.div, {
		variants: a,
		initial: "hidden",
		animate: "show",
		className: e("divide-y-0 px-4 md:px-5 py-1", n),
		...o,
		children: i
	});
}
l.Row = c;
//#endregion
export { l as DetailList };
