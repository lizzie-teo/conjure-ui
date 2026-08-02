"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { motion as i, useReducedMotion as a } from "motion/react";
import { X as o } from "lucide-react";
//#region components/primitives/Tag/Tag.tsx
function s({ label: s, onRemove: c, className: l, ...u }) {
	let d = a();
	return /* @__PURE__ */ r(i.span, {
		layout: !0,
		initial: {
			opacity: 0,
			y: d ? 0 : 6
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: d ? 0 : 4
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
		className: e("inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs md:text-sm", l),
		...u,
		children: [s, c && /* @__PURE__ */ n(t, {
			variant: "ghost",
			size: "icon-xs",
			"aria-label": `Remove ${s}`,
			onClick: c,
			className: "size-3.5 md:size-3 rounded-full p-0",
			children: /* @__PURE__ */ n(o, { className: "size-2.5" })
		})]
	});
}
//#endregion
export { s as Tag };
