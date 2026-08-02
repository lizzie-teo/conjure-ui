"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
import { motion as r, useReducedMotion as i } from "motion/react";
//#region components/primitives/EntityAvatar/EntityAvatar.tsx
var a = "inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium overflow-hidden", o = {
	sm: "size-7 text-xs",
	md: "size-10 text-sm",
	lg: "size-14 text-base"
}, s = n(a, {
	variants: { size: o },
	defaultVariants: { size: "md" }
});
function c({ fallback: n, src: a, alt: o, size: c, isGenerating: l = !1, className: u, ...d }) {
	let f = i(), p = n.split(" ").slice(0, 2).map((e) => e[0]?.toUpperCase() ?? "").join("");
	return /* @__PURE__ */ t(r.div, {
		className: e(s({ size: c }), u),
		animate: !f && l ? { scale: [
			1,
			1.025,
			1
		] } : { scale: 1 },
		transition: {
			duration: 2.4,
			repeat: l ? Infinity : 0,
			ease: "easeInOut"
		},
		...d,
		children: a ? /* @__PURE__ */ t("img", {
			src: a,
			alt: o ?? n,
			className: "size-full object-cover"
		}) : /* @__PURE__ */ t("span", {
			"aria-label": n,
			children: p
		})
	});
}
//#endregion
export { c as EntityAvatar, a as entityAvatarBase, o as entityAvatarSizeClasses };
