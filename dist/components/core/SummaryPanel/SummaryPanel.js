"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { AnimatePresence as i, motion as a, useReducedMotion as o } from "motion/react";
import { createContext as s, useContext as c, useState as l } from "react";
import { ChevronDown as u } from "lucide-react";
//#region components/core/SummaryPanel/SummaryPanel.tsx
var d = s({
	isOpen: !0,
	toggle: () => {},
	collapsible: !1
});
function f({ children: i, className: o, ...s }) {
	let { isOpen: l, toggle: f, collapsible: p } = c(d);
	return /* @__PURE__ */ r("div", {
		...s,
		className: e("flex items-center justify-between gap-2 px-4 md:px-5 py-3 md:py-4", p && "cursor-pointer select-none", o),
		onClick: p ? f : void 0,
		role: p ? "button" : void 0,
		"aria-expanded": p ? l : void 0,
		children: [/* @__PURE__ */ n("div", {
			className: "font-semibold text-sm md:text-base text-foreground",
			children: i
		}), p && /* @__PURE__ */ n(a.div, {
			animate: { rotate: l ? 0 : -90 },
			transition: {
				duration: .2,
				ease: [
					0,
					0,
					.2,
					1
				]
			},
			children: /* @__PURE__ */ n(t, {
				variant: "ghost",
				size: "icon-xs",
				"aria-hidden": !0,
				tabIndex: -1,
				children: /* @__PURE__ */ n(u, { className: "size-3.5 md:size-4 text-muted-foreground" })
			})
		})]
	});
}
function p({ children: t, className: r, ...s }) {
	let { isOpen: l, collapsible: u } = c(d), f = o();
	return u ? /* @__PURE__ */ n(i, {
		initial: !1,
		children: l && /* @__PURE__ */ n(a.div, {
			initial: {
				opacity: 0,
				height: 0
			},
			animate: {
				opacity: 1,
				height: "auto"
			},
			exit: {
				opacity: 0,
				height: 0
			},
			transition: {
				duration: f ? .01 : .25,
				ease: [
					0,
					0,
					.2,
					1
				]
			},
			className: "overflow-hidden",
			children: /* @__PURE__ */ n("div", {
				className: e("px-4 md:px-5 pb-4 md:pb-5", r),
				...s,
				children: t
			})
		}, "body")
	}) : /* @__PURE__ */ n("div", {
		className: e("px-4 md:px-5 pb-4 md:pb-5", r),
		...s,
		children: t
	});
}
function m({ defaultOpen: t = !0, collapsible: r = !1, className: i, children: a, ...o }) {
	let [s, c] = l(t);
	return /* @__PURE__ */ n(d.Provider, {
		value: {
			isOpen: s,
			toggle: () => c((e) => !e),
			collapsible: r
		},
		children: /* @__PURE__ */ n("div", {
			className: e("rounded-xl border border-border bg-card shadow-card overflow-hidden", i),
			...o,
			children: a
		})
	});
}
m.Header = f, m.Body = p;
//#endregion
export { m as SummaryPanel };
