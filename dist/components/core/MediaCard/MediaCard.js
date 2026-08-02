"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
//#region components/core/MediaCard/MediaCard.tsx
function i({ src: n, alt: r, className: i, ...a }) {
	return /* @__PURE__ */ t("div", {
		className: e("overflow-hidden rounded-t-xl", i),
		...a,
		children: /* @__PURE__ */ t("img", {
			src: n,
			alt: r,
			className: "w-full h-40 md:h-48 object-cover"
		})
	});
}
function a({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("div", {
		className: e("p-4 md:p-5 flex flex-col gap-2", r),
		...i,
		children: n
	});
}
function o({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("h3", {
		className: e("font-semibold text-sm md:text-base text-foreground leading-snug", r),
		...i,
		children: n
	});
}
function s({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("p", {
		className: e("text-xs md:text-sm text-muted-foreground", r),
		...i,
		children: n
	});
}
function c({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("div", {
		className: e("flex", r),
		...i,
		children: n
	});
}
function l({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("div", {
		className: e("flex items-center gap-1.5 text-xs md:text-sm", r),
		...i,
		children: n
	});
}
function u({ className: i, children: a, ...o }) {
	let s = r();
	return /* @__PURE__ */ t(n.div, {
		initial: {
			opacity: 0,
			y: s ? 0 : 10
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
		whileHover: {
			y: s ? 0 : -3,
			transition: {
				duration: .2,
				ease: [
					0,
					0,
					.2,
					1
				]
			}
		},
		className: e("rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]", "transition-shadow duration-200 hover:shadow-[var(--shadow-elevated)] cursor-pointer", i),
		...o,
		children: a
	});
}
u.Media = i, u.Body = a, u.Title = o, u.Subtitle = s, u.Badge = c, u.Meta = l;
//#endregion
export { u as MediaCard };
