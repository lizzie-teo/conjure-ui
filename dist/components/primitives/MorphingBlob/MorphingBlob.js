"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
//#region components/primitives/MorphingBlob/MorphingBlob.tsx
var i = {
	sm: "size-8",
	md: "size-12"
}, a = [
	"60% 40% 55% 45% / 45% 55% 45% 55%",
	"40% 60% 45% 55% / 55% 45% 55% 45%",
	"55% 45% 65% 35% / 40% 60% 50% 50%",
	"45% 55% 40% 60% / 50% 50% 60% 40%",
	"60% 40% 55% 45% / 45% 55% 45% 55%"
];
function o({ size: o = "md", className: s, ...c }) {
	let l = r();
	return /* @__PURE__ */ t(n.div, {
		"aria-hidden": "true",
		className: e("bg-muted-foreground/20", i[o], s),
		animate: { borderRadius: l ? "50%" : a },
		transition: l ? {} : {
			duration: 3,
			repeat: Infinity,
			ease: "easeInOut"
		},
		...c
	});
}
//#endregion
export { o as MorphingBlob };
