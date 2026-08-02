"use client";
import { cn as e } from "../../../lib/utils.js";
import { AvailabilityDot as t } from "../../primitives/AvailabilityDot/AvailabilityDot.js";
import { DateSelectStep as n } from "../DateSelectStep/DateSelectStep.js";
import { TimeSlotStep as r } from "../TimeSlotStep/TimeSlotStep.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { AnimatePresence as o, motion as s, useReducedMotion as c } from "motion/react";
import { CalendarDays as l } from "lucide-react";
//#region components/core/ScheduleStep/ScheduleStep.tsx
function u(e) {
	let [t, n, r] = e.split("-").map(Number);
	return new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(new Date(t, n - 1, r));
}
var d = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .22,
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
		y: -6,
		transition: { duration: .15 }
	}
}, f = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	},
	exit: {
		opacity: 0,
		transition: { duration: .15 }
	}
};
function p({ availableDates: p, timeSlots: m, slotsByDate: h, selectedDate: g, selectedSlotId: _, onDateSelect: v, onSlotSelect: y, className: b, ...x }) {
	let S = c(), C = g && h?.[g] ? h[g] : m;
	function w(e) {
		e !== g && y(""), v(e);
	}
	return /* @__PURE__ */ a("div", {
		className: e("space-y-3", b),
		...x,
		children: [/* @__PURE__ */ a("div", {
			className: "rounded-2xl border border-border overflow-hidden",
			children: [
				/* @__PURE__ */ i("div", {
					className: "px-4 py-3 border-b border-border bg-primary/8",
					children: /* @__PURE__ */ i("p", {
						className: "text-sm font-semibold text-primary",
						children: "Choose a date"
					})
				}),
				/* @__PURE__ */ i("div", {
					className: "px-4 pt-4 pb-3",
					children: /* @__PURE__ */ i(n, {
						availableDates: p,
						selectedDate: g,
						onDateSelect: w
					})
				}),
				/* @__PURE__ */ a("div", {
					className: "flex items-center gap-4 px-4 py-2.5 border-t border-border bg-muted/20",
					children: [/* @__PURE__ */ i(t, {
						level: "available",
						showLabel: !0
					}), /* @__PURE__ */ i(t, {
						level: "limited",
						showLabel: !0
					})]
				})
			]
		}), /* @__PURE__ */ i(o, {
			mode: "wait",
			initial: !1,
			children: g ? /* @__PURE__ */ a(s.div, {
				variants: S ? f : d,
				initial: "hidden",
				animate: "show",
				exit: "exit",
				className: "rounded-2xl border border-border overflow-hidden",
				children: [/* @__PURE__ */ a("div", {
					className: "flex items-center gap-2 px-4 py-3 border-b border-border bg-primary/8",
					children: [/* @__PURE__ */ i(l, {
						"aria-hidden": "true",
						className: "size-3.5 text-primary shrink-0"
					}), /* @__PURE__ */ i("p", {
						className: "text-sm font-semibold text-primary",
						children: u(g)
					})]
				}), /* @__PURE__ */ i("div", {
					className: "p-4",
					children: /* @__PURE__ */ i(r, {
						slots: C,
						selectedSlotId: _,
						onSlotSelect: y
					})
				})]
			}, g) : /* @__PURE__ */ i(s.p, {
				variants: S ? f : d,
				initial: "hidden",
				animate: "show",
				exit: "exit",
				className: "text-xs md:text-sm text-muted-foreground text-center py-1",
				children: "Pick a date above to see available times"
			}, "prompt")
		})]
	});
}
//#endregion
export { p as ScheduleStep };
