"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
//#region components/primitives/WaveformIndicator/WaveformIndicator.tsx
function i({ barCount: i = 5, className: a, ...o }) {
	let s = r();
	return /* @__PURE__ */ t("div", {
		role: "status",
		"aria-label": "AI is thinking",
		className: e("inline-flex items-end gap-0.5 md:gap-1", a),
		...o,
		children: Array.from({ length: i }).map((e, r) => /* @__PURE__ */ t(n.span, {
			className: "block w-0.5 md:w-1 h-4 md:h-5 rounded-full bg-muted-foreground origin-bottom",
			animate: s ? { scaleY: .6 } : { scaleY: [
				.3,
				1,
				.3
			] },
			transition: s ? {} : {
				duration: 1,
				repeat: Infinity,
				ease: "easeInOut",
				delay: r / i * .5
			}
		}, r))
	});
}
//#endregion
export { i as WaveformIndicator };
