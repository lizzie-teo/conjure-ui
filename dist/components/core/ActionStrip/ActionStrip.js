"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n } from "react/jsx-runtime";
import { motion as r, useReducedMotion as i } from "motion/react";
//#region components/core/ActionStrip/ActionStrip.tsx
function a({ className: a, children: o, ...s }) {
	let c = i();
	return /* @__PURE__ */ n(r.div, {
		initial: {
			opacity: 0,
			y: c ? 0 : 6
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
		className: "flex-1",
		children: /* @__PURE__ */ n(t, {
			variant: "default",
			size: "default",
			className: e("w-full", a),
			...s,
			children: o
		})
	});
}
function o({ className: a, children: o, ...s }) {
	let c = i();
	return /* @__PURE__ */ n(r.div, {
		initial: {
			opacity: 0,
			y: c ? 0 : 6
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
			],
			delay: .05
		},
		className: "flex-1",
		children: /* @__PURE__ */ n(t, {
			variant: "outline",
			size: "default",
			className: e("w-full", a),
			...s,
			children: o
		})
	});
}
function s({ className: t, children: r, ...i }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex items-center gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-4", t),
		...i,
		children: r
	});
}
s.Primary = a, s.Secondary = o;
//#endregion
export { s as ActionStrip };
