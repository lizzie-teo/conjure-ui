"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { ApplePayButton as n } from "../../primitives/ApplePayButton/ApplePayButton.js";
import { PaymentMethodTile as r } from "../../primitives/PaymentMethodTile/PaymentMethodTile.js";
import { DetailList as i } from "../DetailList/DetailList.js";
import { ConfirmIcon as a } from "../../primitives/Apple-objects/ConfirmIcon.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { AnimatePresence as l, motion as u, useReducedMotion as d } from "motion/react";
import { Loader2 as f, Lock as p } from "lucide-react";
//#region components/core/PaymentConfirmSheet/PaymentConfirmSheet.tsx
function m(e, t) {
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: t,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	}).format(e);
}
function h() {
	return /* @__PURE__ */ c("div", {
		className: "flex items-center gap-1.5 px-4 md:px-5 pt-3.5 pb-3 border-b border-border",
		children: [/* @__PURE__ */ s(p, {
			className: "size-3 shrink-0 text-muted-foreground",
			"aria-hidden": !0
		}), /* @__PURE__ */ s("span", {
			className: "text-xs text-muted-foreground",
			children: "Secure checkout"
		})]
	});
}
function g() {
	let e = d();
	return /* @__PURE__ */ c("div", {
		role: "status",
		"aria-live": "polite",
		className: "flex flex-col items-center gap-2.5 py-4 md:py-3",
		children: [/* @__PURE__ */ s(u.div, {
			"aria-hidden": !0,
			animate: e ? {} : { opacity: [
				1,
				.35,
				1
			] },
			transition: {
				duration: 1.4,
				repeat: Infinity,
				ease: "easeInOut"
			},
			children: /* @__PURE__ */ s(a, {})
		}), /* @__PURE__ */ s("p", {
			className: "text-xs md:text-sm font-medium text-foreground text-center",
			children: "Confirm with Side Button"
		})]
	});
}
var _ = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .05
	} }
}, v = {
	hidden: {
		opacity: 0,
		scale: .85
	},
	show: {
		opacity: 1,
		scale: 1,
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
};
function y({ networks: e }) {
	return /* @__PURE__ */ s(u.div, {
		variants: _,
		initial: "hidden",
		animate: "show",
		className: "flex items-center justify-center flex-wrap gap-1.5",
		"aria-label": "Accepted payment methods",
		children: e.map((e) => /* @__PURE__ */ s(u.div, {
			variants: v,
			className: "flex items-center justify-center h-6 px-2 rounded border border-border bg-card",
			children: /* @__PURE__ */ s("img", {
				src: e.src,
				alt: e.alt,
				className: "h-3.5 w-auto object-contain",
				draggable: !1
			})
		}, e.src))
	});
}
function b({ total: a, currency: p = "USD", paymentMethod: _, description: v, summaryRows: b, acceptedNetworks: x, onConfirm: S, onChangeMethod: C, loading: w = !1, className: T, ...E }) {
	let D = d(), O = _.type === "apple-pay", k = _.type === "google-pay", A = m(a, p);
	return /* @__PURE__ */ c(u.div, {
		initial: {
			opacity: 0,
			y: D ? 0 : 10
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
		className: e("flex flex-col overflow-hidden rounded-[inherit]", T),
		...E,
		children: [
			/* @__PURE__ */ s(h, {}),
			/* @__PURE__ */ c("div", {
				className: "flex flex-col items-center gap-1 px-4 md:px-5 py-6 md:py-7",
				children: [/* @__PURE__ */ s("p", {
					"aria-label": `Total: ${A}`,
					className: "text-3xl md:text-4xl font-semibold tracking-tight text-foreground tabular-nums",
					children: A
				}), v && /* @__PURE__ */ s("p", {
					className: "text-xs md:text-sm text-muted-foreground text-center mt-0.5",
					children: v
				})]
			}),
			b && b.length > 0 && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("div", { className: "mx-4 md:mx-5 border-t border-border" }), /* @__PURE__ */ s(i, { children: b.map((e, t) => /* @__PURE__ */ s(i.Row, {
				label: e.label,
				value: e.value
			}, t)) })] }),
			/* @__PURE__ */ s("div", { className: "mx-4 md:mx-5 border-t border-border" }),
			/* @__PURE__ */ c("div", {
				className: "flex items-center gap-2 px-3 md:px-4 py-3 md:py-3.5",
				children: [/* @__PURE__ */ s("div", {
					className: "flex-1 min-w-0",
					children: /* @__PURE__ */ s(r, {
						type: _.type,
						label: _.label,
						networkLogoSrc: _.networkLogoSrc,
						selected: !1
					})
				}), C && /* @__PURE__ */ s(t, {
					variant: "ghost",
					size: "sm",
					onClick: C,
					disabled: w,
					className: "shrink-0 h-12 md:h-10 px-3 text-xs md:text-sm text-muted-foreground hover:text-foreground",
					children: "Change"
				})]
			}),
			/* @__PURE__ */ s("div", { className: "mx-4 md:mx-5 border-t border-border" }),
			/* @__PURE__ */ c("div", {
				className: "flex flex-col gap-3 px-4 md:px-5 py-4 md:py-5",
				children: [/* @__PURE__ */ s(l, {
					mode: "wait",
					children: O && w ? /* @__PURE__ */ s(u.div, {
						initial: {
							opacity: 0,
							y: D ? 0 : 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: D ? 0 : -8
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
						children: /* @__PURE__ */ s(g, {})
					}, "apple-pay-waiting") : O ? /* @__PURE__ */ s(u.div, {
						initial: {
							opacity: 0,
							y: D ? 0 : 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: D ? 0 : -8
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
						children: /* @__PURE__ */ s(n, {
							onClick: S,
							disabled: w,
							className: "rounded-[calc(var(--radius)+2px)]"
						})
					}, "apple-pay-btn") : k ? /* @__PURE__ */ s(u.div, {
						initial: {
							opacity: 0,
							y: D ? 0 : 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: D ? 0 : -8
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
						children: /* @__PURE__ */ s(t, {
							variant: "outline",
							className: "h-12 md:h-11 w-full rounded-[calc(var(--radius)+2px)]",
							onClick: S,
							disabled: w,
							"aria-label": "Pay with Google Pay",
							children: w ? /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(f, {
								className: "size-4 animate-spin",
								"aria-hidden": !0
							}), "Processing…"] }) : /* @__PURE__ */ s("img", {
								src: "/payment-logos/wallets/google-pay.svg",
								alt: "",
								className: "h-5 w-auto object-contain",
								draggable: !1
							})
						})
					}, "google-pay-btn") : /* @__PURE__ */ s(u.div, {
						initial: {
							opacity: 0,
							y: D ? 0 : 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: D ? 0 : -8
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
						children: /* @__PURE__ */ s(t, {
							className: "h-12 md:h-11 w-full",
							onClick: S,
							disabled: w,
							children: w ? /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(f, {
								className: "size-4 animate-spin",
								"aria-hidden": !0
							}), "Processing…"] }) : `Pay ${A}`
						})
					}, "standard-btn")
				}), x && x.length > 0 && /* @__PURE__ */ s(y, { networks: x })]
			})
		]
	});
}
//#endregion
export { b as PaymentConfirmSheet };
