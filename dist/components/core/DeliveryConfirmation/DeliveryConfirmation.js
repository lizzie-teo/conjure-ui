"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { Button as n } from "../../ui/button.js";
import { AddressTile as r } from "../../primitives/AddressTile/AddressTile.js";
import { DeliveryMethodIcon as i } from "../../primitives/DeliveryMethodIcon/DeliveryMethodIcon.js";
import { EditWindowNotice as a } from "../../primitives/EditWindowNotice/EditWindowNotice.js";
import { ActionStrip as o } from "../ActionStrip/ActionStrip.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { motion as u, useReducedMotion as d } from "motion/react";
import { Pencil as f } from "lucide-react";
//#region components/core/DeliveryConfirmation/DeliveryConfirmation.tsx
var p = {
	allow: "Allow substitutions",
	notify: "Notify me first",
	deny: "Don't substitute"
};
function m(e) {
	let [t, n, r] = e.split("-").map(Number);
	return new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(new Date(t, n - 1, r));
}
var h = {
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
}, g = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function _({ label: e, value: t, step: r, onEdit: i }) {
	return /* @__PURE__ */ l("div", {
		className: "flex items-center justify-between gap-4 py-2 md:py-2.5 border-b border-border last:border-0",
		children: [/* @__PURE__ */ c("span", {
			className: "text-xs md:text-sm text-muted-foreground shrink-0",
			children: e
		}), /* @__PURE__ */ l("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [/* @__PURE__ */ c("span", {
				className: "text-xs md:text-sm text-foreground font-medium text-right truncate",
				children: t
			}), /* @__PURE__ */ c(n, {
				variant: "ghost",
				size: "icon-xs",
				onClick: () => i(r),
				"aria-label": `Edit ${e}`,
				className: "shrink-0 size-6 text-muted-foreground hover:text-foreground",
				children: /* @__PURE__ */ c(f, { className: "size-3" })
			})]
		})]
	});
}
function v({ method: v, deliveryAddress: y, branch: b, selectedDate: x, selectedSlot: S, rewards: C, redeemPoints: w, substitution: T, editableUntil: E, onConfirm: D, onEdit: O, onSetupRecurring: k, className: A }) {
	let j = d(), M = C ? new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: S.currency
	}) : null;
	return /* @__PURE__ */ l("div", {
		className: e("space-y-4 md:space-y-5", A),
		children: [
			/* @__PURE__ */ l(u.div, {
				variants: j ? g : h,
				initial: "hidden",
				animate: "show",
				children: [/* @__PURE__ */ l("div", {
					className: "flex items-center gap-2 mb-3",
					children: [
						/* @__PURE__ */ c(i, {
							type: v,
							size: 18,
							className: "text-foreground"
						}),
						/* @__PURE__ */ c("span", {
							className: "text-sm font-semibold text-foreground",
							children: v === "home-delivery" ? "Home delivery" : "Click & Collect — car boot"
						}),
						/* @__PURE__ */ c(t, {
							label: "Ready to confirm",
							variant: "info"
						})
					]
				}), /* @__PURE__ */ c("div", {
					className: "rounded-xl border border-border bg-card overflow-hidden",
					children: /* @__PURE__ */ l("div", {
						className: "px-4 md:px-5 py-1",
						children: [
							/* @__PURE__ */ c(_, {
								label: "Date",
								value: m(x),
								step: "schedule",
								onEdit: O
							}),
							/* @__PURE__ */ c(_, {
								label: "Time",
								value: `${S.startTime} – ${S.endTime}`,
								step: "schedule",
								onEdit: O
							}),
							/* @__PURE__ */ c(_, {
								label: "Delivery fee",
								value: S.fee === 0 ? "Free" : new Intl.NumberFormat(void 0, {
									style: "currency",
									currency: S.currency
								}).format(S.fee),
								step: "schedule",
								onEdit: O
							}),
							C && /* @__PURE__ */ c(_, {
								label: "Points earned",
								value: `+${C.pointsEarned.toLocaleString()} pts`,
								step: "rewards",
								onEdit: O
							}),
							C && w && M && /* @__PURE__ */ c(_, {
								label: "Points redeemed",
								value: `−${M.format(C.pointsValue)}`,
								step: "rewards",
								onEdit: O
							}),
							/* @__PURE__ */ c(_, {
								label: "Out of stock",
								value: p[T],
								step: "rewards",
								onEdit: O
							})
						]
					})
				})]
			}),
			(y || b) && /* @__PURE__ */ c(u.div, {
				variants: j ? g : h,
				initial: "hidden",
				animate: "show",
				transition: { delay: .06 },
				className: "flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 md:px-5 md:py-4",
				children: y ? /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(r, { ...y }), /* @__PURE__ */ c(n, {
					variant: "ghost",
					size: "icon-sm",
					onClick: () => O("method"),
					"aria-label": "Change delivery address",
					className: "shrink-0 mt-0.5",
					children: /* @__PURE__ */ c(f, { className: "size-3.5" })
				})] }) : b ? /* @__PURE__ */ l("div", { children: [/* @__PURE__ */ c("p", {
					className: "text-xs md:text-sm font-medium text-foreground",
					children: b.name
				}), /* @__PURE__ */ c("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: b.address
				})] }) : null
			}),
			/* @__PURE__ */ l(u.div, {
				variants: j ? g : h,
				initial: "hidden",
				animate: "show",
				transition: { delay: .1 },
				className: "space-y-3",
				children: [/* @__PURE__ */ c(a, { editableUntil: E }), k && /* @__PURE__ */ c(n, {
					variant: "ghost",
					onClick: k,
					className: "w-full text-xs md:text-sm text-muted-foreground hover:text-foreground",
					children: "Set up a recurring delivery"
				})]
			}),
			/* @__PURE__ */ l(o, { children: [/* @__PURE__ */ c(o.Secondary, {
				onClick: () => O("schedule"),
				children: "← Edit"
			}), /* @__PURE__ */ c(o.Primary, {
				onClick: D,
				children: "Confirm delivery"
			})] })
		]
	});
}
v.EditRow = _;
//#endregion
export { v as DeliveryConfirmation };
