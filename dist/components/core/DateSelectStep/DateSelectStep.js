"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { AvailabilityDot as n } from "../../primitives/AvailabilityDot/AvailabilityDot.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { motion as a, useReducedMotion as o } from "motion/react";
//#region components/core/DateSelectStep/DateSelectStep.tsx
function s(e) {
	let [t, n, r] = e.split("-").map(Number);
	return new Date(t, n - 1, r);
}
function c(e) {
	let t = s(e), n = /* @__PURE__ */ new Date(), r = t.getFullYear() === n.getFullYear() && t.getMonth() === n.getMonth() && t.getDate() === n.getDate();
	return {
		dayLabel: r ? "Today" : new Intl.DateTimeFormat(void 0, { weekday: "short" }).format(t),
		dayNum: new Intl.DateTimeFormat(void 0, { day: "numeric" }).format(t),
		isToday: r
	};
}
function l(e) {
	let t = s(e);
	return new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(t);
}
function u(e) {
	return new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit",
		hour12: !0
	}).format(new Date(e));
}
function d(e) {
	let { isToday: t } = c(e.date), n = [t ? `Today, ${l(e.date)}` : l(e.date)];
	return e.availability === "unavailable" ? n.push("unavailable") : e.availability === "limited" && n.push("limited availability"), e.cutoffAt && n.push(`order by ${u(e.cutoffAt)} for same-day delivery`), n.join(", ");
}
var f = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .04
	} }
}, p = {
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
}, m = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function h({ date: o, isSelected: s, onSelect: l, shouldReduce: u }) {
	let { dayLabel: f, dayNum: h, isToday: g } = c(o.date), _ = o.availability === "unavailable";
	return /* @__PURE__ */ r(a.div, {
		variants: u ? m : p,
		className: "snap-start shrink-0",
		children: /* @__PURE__ */ i(t, {
			variant: "ghost",
			role: "radio",
			"aria-checked": s,
			"aria-label": d(o),
			disabled: _,
			onClick: () => l(o.date),
			className: e("flex flex-col items-center gap-1 h-auto w-[64px] md:w-[72px] py-3 px-2 rounded-xl", "border transition-colors duration-150", s ? "border-2 border-primary bg-primary/5 hover:bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30", _ && "opacity-40"),
			children: [
				/* @__PURE__ */ r("span", {
					"aria-hidden": "true",
					className: e("text-xs font-medium uppercase tracking-wide", g ? "text-primary" : "text-muted-foreground"),
					children: f
				}),
				/* @__PURE__ */ r("span", {
					"aria-hidden": "true",
					className: "text-base md:text-lg font-semibold text-foreground leading-none",
					children: h
				}),
				/* @__PURE__ */ r(n, {
					level: o.availability,
					"aria-hidden": !0
				})
			]
		})
	});
}
function g({ availableDates: t, selectedDate: n, onDateSelect: i, className: s }) {
	let c = o() ?? !1;
	return /* @__PURE__ */ r("div", {
		className: e("space-y-3", s),
		children: /* @__PURE__ */ r(a.div, {
			role: "radiogroup",
			"aria-label": "Select delivery date",
			variants: f,
			initial: "hidden",
			animate: "show",
			className: "flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pr-4",
			style: {
				scrollbarWidth: "none",
				WebkitOverflowScrolling: "touch"
			},
			children: t.map((e) => /* @__PURE__ */ r(h, {
				date: e,
				isSelected: n === e.date,
				onSelect: i,
				shouldReduce: c
			}, e.date))
		})
	});
}
g.Cell = h;
//#endregion
export { g as DateSelectStep };
