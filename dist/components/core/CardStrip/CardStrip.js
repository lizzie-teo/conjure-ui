"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
//#region components/core/CardStrip/CardStrip.tsx
function i({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("div", {
		className: e("snap-start shrink-0 w-[280px] md:w-[300px]", r),
		...i,
		children: n
	});
}
function a({ children: i, className: a, ...o }) {
	let s = r();
	return /* @__PURE__ */ t(n.div, {
		initial: {
			opacity: 0,
			y: s ? 0 : 8
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
		className: e("flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pr-6", a),
		style: {
			scrollbarWidth: "none",
			WebkitOverflowScrolling: "touch"
		},
		"aria-label": "Scroll for more options",
		...o,
		children: i
	});
}
a.Item = i;
//#endregion
export { a as CardStrip };
