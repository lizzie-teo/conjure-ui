"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
//#region components/core/TypingIndicator/TypingIndicator.tsx
function i({ className: i, ...a }) {
	let o = r();
	return /* @__PURE__ */ t(n.div, {
		initial: {
			opacity: 0,
			y: o ? 0 : 6,
			scale: o ? 1 : .97
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: o ? 0 : 4
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
		className: e("inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 md:px-5", i),
		"aria-label": "Assistant is typing",
		role: "status",
		...a,
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ t(n.span, {
			animate: o ? { opacity: [
				.4,
				1,
				.4
			] } : {
				opacity: [
					.3,
					1,
					.3
				],
				y: [
					0,
					-4,
					0
				]
			},
			transition: {
				duration: o ? 1.2 : .8,
				repeat: Infinity,
				ease: o ? "linear" : "easeInOut",
				delay: e * .15
			},
			className: "size-1.5 md:size-2 rounded-full bg-muted-foreground"
		}, e))
	});
}
//#endregion
export { i as TypingIndicator };
