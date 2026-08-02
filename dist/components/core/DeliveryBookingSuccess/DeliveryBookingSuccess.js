"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { DeliveryMethodIcon as n } from "../../primitives/DeliveryMethodIcon/DeliveryMethodIcon.js";
import { DetailList as r } from "../DetailList/DetailList.js";
import { ActionStrip as i } from "../ActionStrip/ActionStrip.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { motion as s, useReducedMotion as c } from "motion/react";
import { CalendarPlus as l, CheckCircle2 as u } from "lucide-react";
//#region components/core/DeliveryBookingSuccess/DeliveryBookingSuccess.tsx
function d(e) {
	let [t, n, r] = e.split("-").map(Number);
	return new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(new Date(t, n - 1, r));
}
var f = {
	express: "Express",
	standard: "Standard",
	eco: "Eco"
}, p = {
	hidden: {
		opacity: 0,
		scale: .9
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: .25,
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
		transition: { duration: .25 }
	}
}, h = {
	hidden: {
		opacity: 0,
		y: 8
	},
	show: (e) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: .2,
			delay: e,
			ease: [
				0,
				0,
				.2,
				1
			]
		}
	})
}, g = {
	hidden: { opacity: 0 },
	show: (e) => ({
		opacity: 1,
		transition: {
			duration: .2,
			delay: e
		}
	})
};
function _({ bookingRef: _, method: v, scheduledDate: y, scheduledSlot: b, pointsEarned: x, pointsRedeemed: S, currency: C, ctaLabel: w = "View order", onCta: T, onAddCalendar: E, className: D, ...O }) {
	let k = c(), A = new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: C
	});
	return /* @__PURE__ */ o("div", {
		className: e("space-y-4 md:space-y-5", D),
		...O,
		children: [
			/* @__PURE__ */ o(s.div, {
				variants: k ? m : p,
				initial: "hidden",
				animate: "show",
				className: "flex flex-col items-center gap-3 py-4 md:py-5",
				children: [
					/* @__PURE__ */ a("div", {
						className: "size-14 md:size-16 rounded-full bg-success/10 flex items-center justify-center",
						children: /* @__PURE__ */ a(u, { className: "size-8 md:size-9 text-success" })
					}),
					/* @__PURE__ */ o("div", {
						className: "text-center space-y-1",
						children: [/* @__PURE__ */ a("p", {
							className: "text-base md:text-lg font-semibold text-foreground",
							children: "Delivery scheduled!"
						}), /* @__PURE__ */ a("p", {
							className: "text-xs text-muted-foreground font-mono",
							children: _
						})]
					}),
					/* @__PURE__ */ a(t, {
						label: "Confirmed",
						variant: "success"
					})
				]
			}),
			/* @__PURE__ */ o(s.div, {
				custom: .1,
				variants: k ? g : h,
				initial: "hidden",
				animate: "show",
				className: "rounded-xl border border-border bg-card overflow-hidden",
				children: [/* @__PURE__ */ o("div", {
					className: "flex items-center gap-2 px-4 md:px-5 py-3 border-b border-border bg-muted/30",
					children: [/* @__PURE__ */ a(n, {
						type: v,
						size: 16,
						className: "text-muted-foreground"
					}), /* @__PURE__ */ a("span", {
						className: "text-xs md:text-sm font-medium text-foreground",
						children: v === "home-delivery" ? "Home delivery" : "Click & Collect"
					})]
				}), /* @__PURE__ */ o(r, { children: [
					/* @__PURE__ */ a(r.Row, {
						label: "Date",
						value: d(y)
					}),
					/* @__PURE__ */ a(r.Row, {
						label: "Time window",
						value: `${b.startTime} – ${b.endTime}`
					}),
					/* @__PURE__ */ a(r.Row, {
						label: "Type",
						value: f[b.tier] ?? b.tier
					})
				] })]
			}),
			x !== void 0 && x > 0 && /* @__PURE__ */ a(s.div, {
				custom: .16,
				variants: k ? g : h,
				initial: "hidden",
				animate: "show",
				className: "flex items-center gap-2 rounded-xl bg-success/5 border border-success/20 px-4 py-3",
				children: /* @__PURE__ */ o("span", {
					className: "text-xs md:text-sm text-success font-medium",
					children: [
						"+",
						x.toLocaleString(),
						" points added to your account"
					]
				})
			}),
			S !== void 0 && S > 0 && /* @__PURE__ */ a(s.div, {
				custom: .2,
				variants: k ? g : h,
				initial: "hidden",
				animate: "show",
				className: "flex items-center gap-2 rounded-xl bg-muted/50 border border-border px-4 py-3",
				children: /* @__PURE__ */ o("span", {
					className: "text-xs md:text-sm text-muted-foreground",
					children: [A.format(S), " discount applied from points"]
				})
			}),
			/* @__PURE__ */ a(s.div, {
				custom: .24,
				variants: k ? g : h,
				initial: "hidden",
				animate: "show",
				children: /* @__PURE__ */ o(i, { children: [E && /* @__PURE__ */ o(i.Secondary, {
					onClick: E,
					children: [/* @__PURE__ */ a(l, { className: "size-4 mr-1.5" }), "Add to calendar"]
				}), /* @__PURE__ */ a(i.Primary, {
					onClick: T,
					children: w
				})] })
			})
		]
	});
}
//#endregion
export { _ as DeliveryBookingSuccess };
