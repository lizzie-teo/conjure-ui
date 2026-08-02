"use client";
import { cn as e } from "../../../lib/utils.js";
import { PriceDisplay as t } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { Button as n } from "../../ui/button.js";
import { AvailabilityDot as r } from "../../primitives/AvailabilityDot/AvailabilityDot.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { AnimatePresence as o, motion as s, useReducedMotion as c } from "motion/react";
import { useState as l } from "react";
import { Moon as u, Sun as d, Sunrise as f } from "lucide-react";
//#region components/core/TimeSlotStep/TimeSlotStep.tsx
var p = {
	morning: {
		label: "Morning",
		Icon: f
	},
	afternoon: {
		label: "Afternoon",
		Icon: d
	},
	evening: {
		label: "Evening",
		Icon: u
	}
};
function m(e) {
	let [t, n] = e.toLowerCase().split(" "), r = parseInt(t.split(":")[0], 10);
	return n === "pm" && r !== 12 && (r += 12), n === "am" && r === 12 && (r = 0), r;
}
function h(e) {
	let t = m(e);
	return t < 12 ? "morning" : t < 17 ? "afternoon" : "evening";
}
function g(e) {
	let t = [`${e.startTime} to ${e.endTime}`];
	return t.push(e.fee > 0 ? new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: e.currency
	}).format(e.fee) : "free"), e.availability === "limited" && t.push("limited availability"), e.availability === "unavailable" && t.push("unavailable"), t.join(", ");
}
function _(e) {
	let t = [
		"morning",
		"afternoon",
		"evening"
	];
	return t.find((t) => e.some((e) => h(e.startTime) === t && e.availability !== "unavailable")) ?? t.find((t) => e.some((e) => h(e.startTime) === t)) ?? "morning";
}
var v = {
	hidden: {
		opacity: 0,
		y: 6
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
}, y = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function b({ slot: o, isSelected: c, onSelect: l, shouldReduce: u, ...d }) {
	let f = o.availability === "unavailable";
	return /* @__PURE__ */ i(s.div, {
		variants: u ? y : v,
		...d,
		children: /* @__PURE__ */ a(n, {
			variant: "ghost",
			role: "radio",
			"aria-checked": c,
			"aria-label": g(o),
			disabled: f,
			onClick: () => l(o.id),
			className: e("h-auto flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left", "transition-colors duration-150 w-full", c ? "border-2 border-primary bg-primary/5 hover:bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30", f && "opacity-40"),
			children: [/* @__PURE__ */ a("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ a("p", {
					"aria-hidden": "true",
					className: "text-xs md:text-sm font-medium text-foreground leading-snug",
					children: [
						o.startTime,
						" – ",
						o.endTime
					]
				}), o.fee > 0 ? /* @__PURE__ */ i(t, {
					amount: o.fee,
					currency: o.currency,
					className: "text-xs [&_span:last-child]:text-xs [&_span:last-child]:font-normal [&_span:last-child]:text-muted-foreground"
				}) : /* @__PURE__ */ i("span", {
					"aria-hidden": "true",
					className: "text-xs text-success font-medium",
					children: "Free"
				})]
			}), /* @__PURE__ */ i(r, {
				level: o.availability,
				"aria-hidden": !0
			})]
		})
	});
}
var x = {
	hidden: {
		opacity: 0,
		y: 6
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .18,
			ease: [
				0,
				0,
				.2,
				1
			]
		}
	},
	exit: {
		opacity: 0,
		y: -4,
		transition: { duration: .12 }
	}
}, S = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .18 }
	},
	exit: {
		opacity: 0,
		transition: { duration: .12 }
	}
}, C = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .04
	} }
};
function w({ slots: t, selectedSlotId: r, onSlotSelect: u, className: d, ...f }) {
	let m = c() ?? !1, g = [
		"morning",
		"afternoon",
		"evening"
	].filter((e) => t.some((t) => h(t.startTime) === e)), [v, y] = l(() => _(t)), w = t.filter((e) => h(e.startTime) === v);
	return /* @__PURE__ */ a("div", {
		className: e("space-y-3", d),
		...f,
		children: [/* @__PURE__ */ i("div", {
			role: "tablist",
			"aria-label": "Delivery time of day",
			className: "flex gap-1 bg-muted/50 rounded-full p-1",
			children: g.map((t) => {
				let { label: r, Icon: o } = p[t], s = v === t;
				return /* @__PURE__ */ a(n, {
					role: "tab",
					"aria-selected": s,
					variant: "ghost",
					size: "sm",
					onClick: () => y(t),
					className: e("flex items-center gap-1.5 h-8 px-3 rounded-full flex-1 transition-all duration-200", s ? "bg-background text-foreground shadow-sm hover:bg-background" : "text-muted-foreground hover:text-foreground hover:bg-transparent"),
					children: [/* @__PURE__ */ i(o, {
						"aria-hidden": "true",
						className: "size-3.5 shrink-0"
					}), /* @__PURE__ */ i("span", {
						className: "text-xs font-medium",
						children: r
					})]
				}, t);
			})
		}), /* @__PURE__ */ i(o, {
			mode: "wait",
			initial: !1,
			children: /* @__PURE__ */ i(s.div, {
				role: "tabpanel",
				"aria-label": `${p[v].label} delivery slots`,
				variants: m ? S : x,
				initial: "hidden",
				animate: "show",
				exit: "exit",
				children: /* @__PURE__ */ i(s.div, {
					variants: C,
					initial: "hidden",
					animate: "show",
					className: "grid grid-cols-2 md:grid-cols-3 gap-2",
					children: w.map((e) => /* @__PURE__ */ i(b, {
						slot: e,
						isSelected: r === e.id,
						onSelect: u,
						shouldReduce: m
					}, e.id))
				})
			}, v)
		})]
	});
}
w.Chip = b;
//#endregion
export { w as TimeSlotStep };
