"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useReducedMotion as r } from "motion/react";
//#region components/primitives/SkeletonBlock/SkeletonBlock.tsx
var i = {
	backgroundImage: "linear-gradient(90deg, var(--color-muted) 0%, var(--color-accent) 45%, var(--color-muted) 100%)",
	backgroundSize: "200% 100%"
}, a = [
	"w-full",
	"w-5/6",
	"w-4/5",
	"w-full",
	"w-3/4",
	"w-5/6"
];
function o({ shape: o, lines: s = 3, className: c, style: l, ...u }) {
	let d = r(), f = d ? "" : "animate-shimmer", p = d ? void 0 : i;
	return o === "heading" ? /* @__PURE__ */ t("div", {
		className: e("h-6 md:h-7 w-3/4 rounded-md bg-muted", f, c),
		style: {
			...p,
			...l
		},
		...u
	}) : o === "code" ? /* @__PURE__ */ t("div", {
		className: e("rounded-lg bg-muted p-3 md:p-4 space-y-2 md:space-y-3", c),
		style: l,
		...u,
		children: Array.from({ length: s }).map((n, r) => /* @__PURE__ */ t("div", {
			className: e("h-3 md:h-4 rounded bg-muted-foreground/15", r % 3 == 0 ? "w-4/5" : r % 3 == 1 ? "w-full" : "w-2/3", f),
			style: p
		}, r))
	}) : o === "bullet-list" ? /* @__PURE__ */ t("div", {
		className: e("space-y-2 md:space-y-3", c),
		style: l,
		...u,
		children: Array.from({ length: s }).map((r, i) => /* @__PURE__ */ n("div", {
			className: "flex items-center gap-2 md:gap-3",
			children: [/* @__PURE__ */ t("span", { className: "size-1.5 md:size-2 rounded-full bg-muted-foreground/30 shrink-0" }), /* @__PURE__ */ t("div", {
				className: e("h-4 md:h-5 rounded-md bg-muted flex-1", i % 2 == 0 ? "max-w-full" : "max-w-[85%]", f),
				style: p
			})]
		}, i))
	}) : /* @__PURE__ */ t("div", {
		className: e("space-y-2 md:space-y-3", c),
		style: l,
		...u,
		children: Array.from({ length: s }).map((n, r) => /* @__PURE__ */ t("div", {
			className: e("h-4 md:h-5 rounded-md bg-muted", a[r % a.length], f),
			style: p
		}, r))
	});
}
//#endregion
export { o as SkeletonBlock };
