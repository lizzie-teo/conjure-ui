"use client";
import { cn as e } from "../../../lib/utils.js";
import { DetailList as t } from "../DetailList/DetailList.js";
import { SelectionGroup as n } from "../SelectionGroup/SelectionGroup.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { motion as a, useReducedMotion as o } from "motion/react";
import { Sparkles as s, Star as c } from "lucide-react";
//#region components/core/RewardsStep/RewardsStep.tsx
var l = {
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
}, u = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function d({ rewards: n, redeemPoints: a, onRedeemToggle: o }) {
	let s = n.currentPoints + n.pointsEarned, l = new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: n.currency
	});
	return /* @__PURE__ */ i("div", {
		className: "rounded-xl border border-border bg-card overflow-hidden",
		children: [
			/* @__PURE__ */ i("div", {
				className: "flex items-center gap-2 px-4 md:px-5 py-3 border-b border-border bg-muted/30",
				children: [/* @__PURE__ */ r(c, { className: "size-4 text-warning shrink-0" }), /* @__PURE__ */ r("span", {
					className: "text-sm font-medium text-foreground",
					children: n.programName
				})]
			}),
			/* @__PURE__ */ i(t, { children: [
				/* @__PURE__ */ r(t.Row, {
					label: "Current balance",
					value: `${n.currentPoints.toLocaleString()} pts`
				}),
				/* @__PURE__ */ r(t.Row, {
					label: "Earned this order",
					value: /* @__PURE__ */ i("span", {
						className: "text-success font-semibold",
						children: [
							"+",
							n.pointsEarned.toLocaleString(),
							" pts"
						]
					})
				}),
				n.bonusPointsAvailable && /* @__PURE__ */ r(t.Row, {
					label: "Bonus points",
					value: /* @__PURE__ */ i("span", {
						className: "text-success font-semibold",
						children: [
							"+",
							n.bonusPointsAvailable.toLocaleString(),
							" pts"
						]
					})
				}),
				/* @__PURE__ */ r(t.Row, {
					label: "New balance",
					value: /* @__PURE__ */ i("span", {
						className: "font-semibold",
						children: [s.toLocaleString(), " pts"]
					})
				})
			] }),
			n.pointsValue > 0 && /* @__PURE__ */ r("div", {
				className: "px-4 md:px-5 py-3 border-t border-border",
				children: /* @__PURE__ */ i("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ i("div", { children: [/* @__PURE__ */ i("p", {
						className: "text-xs md:text-sm text-foreground font-medium leading-snug",
						children: [
							"Use ",
							n.currentPoints.toLocaleString(),
							" pts"
						]
					}), /* @__PURE__ */ i("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Save ",
							l.format(n.pointsValue),
							" on this order"
						]
					})] }), /* @__PURE__ */ r("button", {
						type: "button",
						role: "switch",
						"aria-checked": a,
						onClick: () => o(!a),
						className: e("relative shrink-0 h-6 w-10 rounded-full border-2 transition-colors duration-200", "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", a ? "bg-primary border-primary" : "bg-muted border-border"),
						"aria-label": `${a ? "Remove" : "Apply"} points redemption`,
						children: /* @__PURE__ */ r("span", { className: e("absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow-sm transition-transform duration-200", a && "translate-x-4") })
					})]
				})
			})
		]
	});
}
function f({ prompt: e }) {
	return /* @__PURE__ */ i("div", {
		className: "flex items-start gap-2 rounded-xl bg-success/5 border border-success/20 px-4 py-3",
		children: [/* @__PURE__ */ r(s, { className: "size-4 text-success shrink-0 mt-0.5" }), /* @__PURE__ */ r("p", {
			className: "text-xs md:text-sm text-success font-medium leading-snug",
			children: e
		})]
	});
}
function p({ value: e, onChange: t }) {
	return /* @__PURE__ */ i("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ r("p", {
			className: "text-xs md:text-sm font-medium text-foreground px-1",
			children: "If an item is out of stock"
		}), /* @__PURE__ */ i(n, {
			type: "radio",
			value: e,
			onChange: (e) => t(e),
			children: [
				/* @__PURE__ */ r(n.Option, {
					value: "allow",
					description: "We'll pick the closest match",
					children: "Allow substitutions"
				}),
				/* @__PURE__ */ r(n.Option, {
					value: "notify",
					description: "We'll message you before swapping",
					children: "Notify me first"
				}),
				/* @__PURE__ */ r(n.Option, {
					value: "deny",
					description: "Remove the item instead",
					children: "Don't substitute"
				})
			]
		})]
	});
}
function m({ rewards: t, redeemPoints: n, onRedeemToggle: s, substitution: c, onSubstitutionChange: m, className: h }) {
	let g = o();
	return /* @__PURE__ */ i("div", {
		className: e("space-y-4 md:space-y-5", h),
		children: [
			/* @__PURE__ */ r(a.div, {
				variants: g ? u : l,
				initial: "hidden",
				animate: "show",
				children: /* @__PURE__ */ r(d, {
					rewards: t,
					redeemPoints: n,
					onRedeemToggle: s
				})
			}),
			t.bonusPrompt && /* @__PURE__ */ r(a.div, {
				variants: g ? u : l,
				initial: "hidden",
				animate: "show",
				transition: { delay: .08 },
				children: /* @__PURE__ */ r(f, { prompt: t.bonusPrompt })
			}),
			/* @__PURE__ */ r(a.div, {
				variants: g ? u : l,
				initial: "hidden",
				animate: "show",
				transition: { delay: .12 },
				children: /* @__PURE__ */ r(p, {
					value: c,
					onChange: m
				})
			})
		]
	});
}
m.PointsSummary = d, m.BonusPrompt = f, m.SubstitutionSelector = p;
//#endregion
export { m as RewardsStep };
