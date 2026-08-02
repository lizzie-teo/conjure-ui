"use client";
import { cn as e } from "../../../lib/utils.js";
import { ProgressStep as t } from "../../primitives/ProgressStep/ProgressStep.js";
import { ActionStrip as n } from "../../core/ActionStrip/ActionStrip.js";
import { DeliveryMethodStep as r } from "../../core/DeliveryMethodStep/DeliveryMethodStep.js";
import { BranchSelectStep as i } from "../../core/BranchSelectStep/BranchSelectStep.js";
import { RewardsStep as a } from "../../core/RewardsStep/RewardsStep.js";
import { DeliveryConfirmation as o } from "../../core/DeliveryConfirmation/DeliveryConfirmation.js";
import { DeliveryBookingSuccess as s } from "../../core/DeliveryBookingSuccess/DeliveryBookingSuccess.js";
import { ScheduleStep as c } from "../../core/ScheduleStep/ScheduleStep.js";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { AnimatePresence as d, motion as f, useReducedMotion as p } from "motion/react";
import { useMemo as m, useState as h } from "react";
//#region components/layouts/DeliveryFlow/DeliveryFlow.tsx
var g = {
	method: "Method",
	branch: "Branch",
	schedule: "Schedule",
	rewards: "Rewards",
	confirm: "Confirm"
};
function _({ steps: n, currentStep: r, className: i, "aria-label": a = "Progress", ...o }) {
	let s = n.indexOf(r);
	return /* @__PURE__ */ l("div", {
		className: e("flex items-center px-4 md:px-5 pt-4 pb-3", i),
		"aria-label": a,
		...o,
		children: n.map((r, i) => /* @__PURE__ */ u("div", {
			className: "flex items-start flex-1 last:flex-none",
			children: [/* @__PURE__ */ l(t, {
				status: i < s ? "complete" : i === s ? "active" : "pending",
				label: g[r]
			}), i < n.length - 1 && /* @__PURE__ */ l("div", { className: e("flex-1 h-px mx-1 mt-1.5", i < s ? "bg-primary" : "bg-border") })]
		}, r))
	});
}
function v({ stepKey: t, direction: n, shouldReduce: r, children: i, className: a, ...o }) {
	let s = r ? 0 : n * 20;
	return /* @__PURE__ */ l(d, {
		mode: "wait",
		initial: !1,
		children: /* @__PURE__ */ l(f.div, {
			initial: {
				opacity: 0,
				x: s
			},
			animate: {
				opacity: 1,
				x: 0
			},
			exit: {
				opacity: 0,
				x: -s
			},
			transition: {
				duration: .22,
				ease: [
					0,
					0,
					.2,
					1
				]
			},
			className: e("px-4 md:px-5 pb-2", a),
			...o,
			children: i
		}, t)
	});
}
function y({ availableDates: t, timeSlots: d, branches: f, rewards: g, homeAddress: y, onAddressEdit: b, editableUntil: x, initialStep: S = "method", initialData: C, onComplete: w, onCancel: T, className: E, ...D }) {
	let O = p(), [k, A] = h("in-progress"), [j, M] = h(""), [N, P] = h(S), [F, I] = h(1), [L, R] = h({
		redeemPoints: !1,
		substitution: "allow",
		...C
	}), z = m(() => {
		let e = ["method"];
		return L.method === "click-collect" && e.push("branch"), e.push("schedule"), g && e.push("rewards"), e.push("confirm"), e;
	}, [L.method, g]);
	function B(e) {
		let t = z.indexOf(N);
		I(z.indexOf(e) >= t ? 1 : -1), P(e);
	}
	function V() {
		let e = z.indexOf(N);
		e < z.length - 1 && B(z[e + 1]);
	}
	function H() {
		let e = z.indexOf(N);
		e > 0 ? B(z[e - 1]) : T?.();
	}
	function U() {
		switch (N) {
			case "method": return !!L.method;
			case "branch": return !!L.branchId;
			case "schedule": return !!L.selectedDate && !!L.selectedSlotId;
			case "rewards": return !0;
			case "confirm": return !0;
		}
	}
	function W() {
		let e = `DEL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, t = {
			method: L.method ?? "home-delivery",
			branchId: L.branchId,
			carBootDetails: L.carBootDetails,
			date: L.selectedDate ?? "",
			slotId: L.selectedSlotId ?? "",
			redeemPoints: L.redeemPoints,
			substitution: L.substitution,
			bookingRef: e
		};
		M(e), A("resolved"), w(t);
	}
	let G = d.find((e) => e.id === L.selectedSlotId), [K] = h(() => new Date(Date.now() + 864e5).toISOString()), q = x ?? (L.selectedDate ? `${L.selectedDate}T00:00:00.000Z` : K);
	return k === "resolved" && G ? /* @__PURE__ */ l("div", {
		className: e("bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden", E),
		...D,
		children: /* @__PURE__ */ l("div", {
			className: "px-4 md:px-5 py-4 md:py-5",
			children: /* @__PURE__ */ l(s, {
				bookingRef: j,
				method: L.method ?? "home-delivery",
				scheduledDate: L.selectedDate ?? "",
				scheduledSlot: G,
				pointsEarned: L.redeemPoints ? void 0 : g?.pointsEarned,
				pointsRedeemed: L.redeemPoints && g ? g.pointsValue : void 0,
				currency: G.currency,
				onCta: () => w({
					method: L.method ?? "home-delivery",
					date: L.selectedDate ?? "",
					slotId: L.selectedSlotId ?? "",
					redeemPoints: L.redeemPoints,
					substitution: L.substitution,
					bookingRef: j
				})
			})
		})
	}) : /* @__PURE__ */ u("div", {
		className: e("bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden", E),
		...D,
		children: [
			/* @__PURE__ */ l(_, {
				steps: z,
				currentStep: N
			}),
			/* @__PURE__ */ l("div", { className: "border-t border-border" }),
			/* @__PURE__ */ u(v, {
				stepKey: N,
				direction: F,
				shouldReduce: O ?? !1,
				children: [/* @__PURE__ */ u("div", {
					className: "pt-4 pb-2 space-y-4",
					children: [
						N === "method" && /* @__PURE__ */ l(r, {
							value: L.method,
							homeAddress: y,
							onMethodChange: (e) => R((t) => ({
								...t,
								method: e,
								branchId: e === "home-delivery" ? void 0 : t.branchId
							})),
							onAddressEdit: b
						}),
						N === "branch" && f && /* @__PURE__ */ l(i, {
							branches: f,
							selectedBranchId: L.branchId,
							carBootDetails: L.carBootDetails,
							onBranchSelect: (e) => R((t) => ({
								...t,
								branchId: e
							})),
							onCarBootChange: (e) => R((t) => ({
								...t,
								carBootDetails: e
							}))
						}),
						N === "schedule" && /* @__PURE__ */ l(c, {
							availableDates: t,
							timeSlots: d,
							selectedDate: L.selectedDate,
							selectedSlotId: L.selectedSlotId,
							onDateSelect: (e) => R((t) => ({
								...t,
								selectedDate: e
							})),
							onSlotSelect: (e) => R((t) => ({
								...t,
								selectedSlotId: e || void 0
							}))
						}),
						N === "rewards" && g && /* @__PURE__ */ l(a, {
							rewards: g,
							redeemPoints: L.redeemPoints,
							onRedeemToggle: (e) => R((t) => ({
								...t,
								redeemPoints: e
							})),
							substitution: L.substitution,
							onSubstitutionChange: (e) => R((t) => ({
								...t,
								substitution: e
							}))
						}),
						N === "confirm" && G && /* @__PURE__ */ l(o, {
							method: L.method ?? "home-delivery",
							deliveryAddress: L.method === "home-delivery" ? y : void 0,
							branch: L.method === "click-collect" && L.branchId ? f?.find((e) => e.id === L.branchId) : void 0,
							selectedDate: L.selectedDate ?? "",
							selectedSlot: G,
							rewards: g,
							redeemPoints: L.redeemPoints,
							substitution: L.substitution,
							editableUntil: q,
							onConfirm: W,
							onEdit: (e) => B(e)
						})
					]
				}), N !== "confirm" && /* @__PURE__ */ u(n, { children: [/* @__PURE__ */ l(n.Secondary, {
					onClick: H,
					children: z.indexOf(N) === 0 ? "Cancel" : "← Back"
				}), /* @__PURE__ */ l(n.Primary, {
					onClick: V,
					disabled: !U(),
					children: N === z[z.length - 2] ? "Review order →" : "Continue →"
				})] })]
			})
		]
	});
}
y.StepRail = _, y.StepBody = v;
//#endregion
export { y as DeliveryFlow };
