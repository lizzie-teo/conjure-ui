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
function _({ steps: n, currentStep: r }) {
	let i = n.indexOf(r);
	return /* @__PURE__ */ l("div", {
		className: "flex items-center px-4 md:px-5 pt-4 pb-3",
		"aria-label": "Progress",
		children: n.map((r, a) => /* @__PURE__ */ u("div", {
			className: "flex items-start flex-1 last:flex-none",
			children: [/* @__PURE__ */ l(t, {
				status: a < i ? "complete" : a === i ? "active" : "pending",
				label: g[r]
			}), a < n.length - 1 && /* @__PURE__ */ l("div", { className: e("flex-1 h-px mx-1 mt-1.5", a < i ? "bg-primary" : "bg-border") })]
		}, r))
	});
}
function v({ stepKey: e, direction: t, shouldReduce: n, children: r }) {
	let i = n ? 0 : t * 20;
	return /* @__PURE__ */ l(d, {
		mode: "wait",
		initial: !1,
		children: /* @__PURE__ */ l(f.div, {
			initial: {
				opacity: 0,
				x: i
			},
			animate: {
				opacity: 1,
				x: 0
			},
			exit: {
				opacity: 0,
				x: -i
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
			className: "px-4 md:px-5 pb-2",
			children: r
		}, e)
	});
}
function y({ availableDates: t, timeSlots: d, branches: f, rewards: g, homeAddress: y, onAddressEdit: b, editableUntil: x, initialStep: S = "method", initialData: C, onComplete: w, onCancel: T, className: E }) {
	let D = p(), [O, k] = h("in-progress"), [A, j] = h(""), [M, N] = h(S), [P, F] = h(1), [I, L] = h({
		redeemPoints: !1,
		substitution: "allow",
		...C
	}), R = m(() => {
		let e = ["method"];
		return I.method === "click-collect" && e.push("branch"), e.push("schedule"), g && e.push("rewards"), e.push("confirm"), e;
	}, [I.method, g]);
	function z(e) {
		let t = R.indexOf(M);
		F(R.indexOf(e) >= t ? 1 : -1), N(e);
	}
	function B() {
		let e = R.indexOf(M);
		e < R.length - 1 && z(R[e + 1]);
	}
	function V() {
		let e = R.indexOf(M);
		e > 0 ? z(R[e - 1]) : T?.();
	}
	function H() {
		switch (M) {
			case "method": return !!I.method;
			case "branch": return !!I.branchId;
			case "schedule": return !!I.selectedDate && !!I.selectedSlotId;
			case "rewards": return !0;
			case "confirm": return !0;
		}
	}
	function U() {
		let e = `DEL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, t = {
			method: I.method ?? "home-delivery",
			branchId: I.branchId,
			carBootDetails: I.carBootDetails,
			date: I.selectedDate ?? "",
			slotId: I.selectedSlotId ?? "",
			redeemPoints: I.redeemPoints,
			substitution: I.substitution,
			bookingRef: e
		};
		j(e), k("resolved"), w(t);
	}
	let W = d.find((e) => e.id === I.selectedSlotId), [G] = h(() => new Date(Date.now() + 864e5).toISOString()), K = x ?? (I.selectedDate ? `${I.selectedDate}T00:00:00.000Z` : G);
	return O === "resolved" && W ? /* @__PURE__ */ l("div", {
		className: e("bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden", E),
		children: /* @__PURE__ */ l("div", {
			className: "px-4 md:px-5 py-4 md:py-5",
			children: /* @__PURE__ */ l(s, {
				bookingRef: A,
				method: I.method ?? "home-delivery",
				scheduledDate: I.selectedDate ?? "",
				scheduledSlot: W,
				pointsEarned: I.redeemPoints ? void 0 : g?.pointsEarned,
				pointsRedeemed: I.redeemPoints && g ? g.pointsValue : void 0,
				currency: W.currency,
				onCta: () => w({
					method: I.method ?? "home-delivery",
					date: I.selectedDate ?? "",
					slotId: I.selectedSlotId ?? "",
					redeemPoints: I.redeemPoints,
					substitution: I.substitution,
					bookingRef: A
				})
			})
		})
	}) : /* @__PURE__ */ u("div", {
		className: e("bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden", E),
		children: [
			/* @__PURE__ */ l(_, {
				steps: R,
				currentStep: M
			}),
			/* @__PURE__ */ l("div", { className: "border-t border-border" }),
			/* @__PURE__ */ u(v, {
				stepKey: M,
				direction: P,
				shouldReduce: D ?? !1,
				children: [/* @__PURE__ */ u("div", {
					className: "pt-4 pb-2 space-y-4",
					children: [
						M === "method" && /* @__PURE__ */ l(r, {
							value: I.method,
							homeAddress: y,
							onMethodChange: (e) => L((t) => ({
								...t,
								method: e,
								branchId: e === "home-delivery" ? void 0 : t.branchId
							})),
							onAddressEdit: b
						}),
						M === "branch" && f && /* @__PURE__ */ l(i, {
							branches: f,
							selectedBranchId: I.branchId,
							carBootDetails: I.carBootDetails,
							onBranchSelect: (e) => L((t) => ({
								...t,
								branchId: e
							})),
							onCarBootChange: (e) => L((t) => ({
								...t,
								carBootDetails: e
							}))
						}),
						M === "schedule" && /* @__PURE__ */ l(c, {
							availableDates: t,
							timeSlots: d,
							selectedDate: I.selectedDate,
							selectedSlotId: I.selectedSlotId,
							onDateSelect: (e) => L((t) => ({
								...t,
								selectedDate: e
							})),
							onSlotSelect: (e) => L((t) => ({
								...t,
								selectedSlotId: e || void 0
							}))
						}),
						M === "rewards" && g && /* @__PURE__ */ l(a, {
							rewards: g,
							redeemPoints: I.redeemPoints,
							onRedeemToggle: (e) => L((t) => ({
								...t,
								redeemPoints: e
							})),
							substitution: I.substitution,
							onSubstitutionChange: (e) => L((t) => ({
								...t,
								substitution: e
							}))
						}),
						M === "confirm" && W && /* @__PURE__ */ l(o, {
							method: I.method ?? "home-delivery",
							deliveryAddress: I.method === "home-delivery" ? y : void 0,
							branch: I.method === "click-collect" && I.branchId ? f?.find((e) => e.id === I.branchId) : void 0,
							selectedDate: I.selectedDate ?? "",
							selectedSlot: W,
							rewards: g,
							redeemPoints: I.redeemPoints,
							substitution: I.substitution,
							editableUntil: K,
							onConfirm: U,
							onEdit: (e) => z(e)
						})
					]
				}), M !== "confirm" && /* @__PURE__ */ u(n, { children: [/* @__PURE__ */ l(n.Secondary, {
					onClick: V,
					children: R.indexOf(M) === 0 ? "Cancel" : "← Back"
				}), /* @__PURE__ */ l(n.Primary, {
					onClick: B,
					disabled: !H(),
					children: M === R[R.length - 2] ? "Review order →" : "Continue →"
				})] })]
			})
		]
	});
}
y.StepRail = _, y.StepBody = v;
//#endregion
export { y as DeliveryFlow };
