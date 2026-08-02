"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { AnimatePresence as i, motion as a, useReducedMotion as o } from "motion/react";
import { createContext as s, useContext as c, useState as l } from "react";
import { Check as u } from "lucide-react";
//#region components/core/SelectionGroup/SelectionGroup.tsx
var d = a(t), f = s({
	type: "radio",
	selected: [],
	toggle: () => {}
}), p = {
	hidden: {},
	show: { transition: {
		staggerChildren: .05,
		delayChildren: .05
	} }
}, m = {
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
}, h = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function g({ value: t, children: s, description: l, icon: p, className: g }) {
	let { type: _, selected: v, toggle: y } = c(f), b = o(), x = v.includes(t);
	return /* @__PURE__ */ r(d, {
		variants: b ? h : m,
		onClick: () => y(t),
		role: _,
		"aria-checked": x,
		variant: "ghost",
		className: e("w-full h-auto flex items-center gap-3 rounded-xl px-4 py-3.5 md:py-4 text-left whitespace-normal", "transition-colors duration-150", x ? "border-2 border-primary bg-primary/5 shadow-[var(--shadow-card)] hover:bg-primary/5" : "border border-border bg-card shadow-[var(--shadow-sm)] hover:border-primary/40 hover:bg-muted/30 hover:shadow-[var(--shadow-card)]", g),
		children: [
			p && /* @__PURE__ */ n("span", {
				className: "shrink-0 size-8 md:size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground",
				children: p
			}),
			/* @__PURE__ */ r("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ n("p", {
					className: e("text-sm md:text-base font-medium leading-snug", "text-foreground"),
					children: s
				}), l && /* @__PURE__ */ n("p", {
					className: "text-xs md:text-sm text-muted-foreground mt-0.5 leading-snug",
					children: l
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: e("shrink-0 flex items-center justify-center border-2 transition-colors duration-150", _ === "radio" ? "rounded-full size-5" : "rounded-md size-5", x ? "border-primary bg-primary" : "border-muted-foreground/40 bg-transparent"),
				children: /* @__PURE__ */ n(i, {
					initial: !1,
					children: x && /* @__PURE__ */ n(a.span, {
						initial: {
							opacity: 0,
							scale: b ? 1 : .5
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: b ? 1 : .5
						},
						transition: {
							duration: .15,
							ease: [
								0,
								0,
								.2,
								1
							]
						},
						children: /* @__PURE__ */ n(u, {
							className: "size-3 text-primary-foreground",
							strokeWidth: 3
						})
					}, "check")
				})
			})
		]
	});
}
function _(e) {
	return e === void 0 ? [] : Array.isArray(e) ? e : [e];
}
function v({ type: t = "radio", value: r, defaultValue: i, onChange: o, className: s, children: c, ...u }) {
	let d = r !== void 0, [m, h] = l(() => _(i)), g = d ? _(r) : m;
	function v(e) {
		let n;
		n = t === "radio" ? [e] : g.includes(e) ? g.filter((t) => t !== e) : [...g, e], d || h(n), o?.(t === "radio" ? n[0] ?? "" : n);
	}
	return /* @__PURE__ */ n(f.Provider, {
		value: {
			type: t,
			selected: g,
			toggle: v
		},
		children: /* @__PURE__ */ n(a.div, {
			variants: p,
			initial: "hidden",
			animate: "show",
			role: t === "radio" ? "radiogroup" : "group",
			className: e("flex flex-col gap-2 md:gap-2.5", s),
			...u,
			children: c
		})
	});
}
v.Option = g;
//#endregion
export { v as SelectionGroup };
