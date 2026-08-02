"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { Button as n } from "../../ui/button.js";
import { DetailList as r } from "../DetailList/DetailList.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { motion as s, useReducedMotion as c } from "motion/react";
import { Check as l } from "lucide-react";
//#region components/core/PaymentSuccess/PaymentSuccess.tsx
var u = {
	hidden: {},
	show: { transition: {
		staggerChildren: .05,
		delayChildren: .22
	} }
};
function d({ referenceNumber: d, badgeLabel: f = "Confirmed", subtitle: p, rows: m, ctaLabel: h = "Done", onCta: g, secondaryLabel: _, onSecondary: v, className: y, ...b }) {
	let x = c(), S = x ? {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: .18,
				ease: [
					0,
					0,
					.2,
					1
				]
			}
		}
	} : {
		hidden: {
			opacity: 0,
			y: 8
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
		}
	};
	return /* @__PURE__ */ o(s.div, {
		...b,
		role: "status",
		"aria-live": "polite",
		initial: {
			opacity: 0,
			y: x ? 0 : 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		className: e("flex flex-col overflow-hidden rounded-[inherit]", y),
		children: [
			/* @__PURE__ */ o("div", {
				className: "flex flex-col items-center gap-3 px-4 md:px-5 pt-8 md:pt-9 pb-6 md:pb-7 text-center",
				children: [/* @__PURE__ */ a(s.div, {
					initial: {
						opacity: 0,
						scale: x ? 1 : .6
					},
					animate: {
						opacity: 1,
						scale: 1
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
					className: "flex items-center justify-center size-16 md:size-14 rounded-full bg-[var(--success)]/10",
					"aria-hidden": !0,
					children: /* @__PURE__ */ a(s.div, {
						initial: {
							opacity: 0,
							scale: x ? 1 : .4
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							delay: .1,
							duration: .18,
							ease: [
								0,
								0,
								.2,
								1
							]
						},
						children: /* @__PURE__ */ a(l, {
							size: 28,
							strokeWidth: 2.5,
							className: "text-[var(--success)]",
							"aria-hidden": !0
						})
					})
				}), /* @__PURE__ */ o(s.div, {
					variants: u,
					initial: "hidden",
					animate: "show",
					className: "flex flex-col items-center gap-2",
					children: [
						/* @__PURE__ */ a(s.div, {
							variants: S,
							children: /* @__PURE__ */ a(t, {
								label: f,
								variant: "success"
							})
						}),
						/* @__PURE__ */ a(s.p, {
							variants: S,
							className: "text-xl md:text-2xl font-semibold text-foreground tracking-tight",
							children: d
						}),
						p && /* @__PURE__ */ a(s.p, {
							variants: S,
							className: "text-xs md:text-sm text-muted-foreground max-w-[240px] leading-relaxed",
							children: p
						})
					]
				})]
			}),
			m && m.length > 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("div", { className: "mx-4 md:mx-5 border-t border-border" }), /* @__PURE__ */ a(r, { children: m.map((e, t) => /* @__PURE__ */ a(r.Row, {
				label: e.label,
				value: e.value
			}, t)) })] }),
			/* @__PURE__ */ o("div", {
				className: "flex flex-col gap-2 px-4 md:px-5 py-4 md:py-5",
				children: [/* @__PURE__ */ a(n, {
					className: "h-12 md:h-11 w-full",
					onClick: g,
					children: h
				}), _ && v && /* @__PURE__ */ a(n, {
					variant: "ghost",
					className: "h-12 md:h-10 w-full text-muted-foreground hover:text-foreground",
					onClick: v,
					children: _
				})]
			})
		]
	});
}
//#endregion
export { d as PaymentSuccess };
