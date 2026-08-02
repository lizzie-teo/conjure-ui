"use client";
import { cn as e } from "../../../lib/utils.js";
import t from "../../primitives/Apple-objects/face-id.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { AnimatePresence as a, motion as o, useReducedMotion as s } from "motion/react";
import { useEffect as c, useState as l } from "react";
//#region components/core/DoubleClickToPay/DoubleClickToPay.tsx
var u = 2.2, d = .32, f = .5, p = 3600;
function m({ shouldReduce: e }) {
	return /* @__PURE__ */ i("div", {
		"aria-hidden": !0,
		className: "relative shrink-0 self-stretch",
		style: { width: 5 },
		children: [!e && /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(o.span, {
			className: "absolute pointer-events-none rounded-full border border-white/70",
			style: {
				width: 20,
				height: 20,
				top: "50%",
				left: "50%",
				marginTop: -10,
				marginLeft: -10
			},
			animate: {
				scale: [1, 4.5],
				opacity: [.65, 0]
			},
			transition: {
				duration: f,
				repeat: Infinity,
				repeatDelay: u - f,
				ease: [
					0,
					0,
					.2,
					1
				]
			}
		}), /* @__PURE__ */ r(o.span, {
			className: "absolute pointer-events-none rounded-full border border-white/70",
			style: {
				width: 20,
				height: 20,
				top: "50%",
				left: "50%",
				marginTop: -10,
				marginLeft: -10
			},
			animate: {
				scale: [1, 4.5],
				opacity: [.65, 0]
			},
			transition: {
				duration: f,
				delay: d,
				repeat: Infinity,
				repeatDelay: u - d - f,
				ease: [
					0,
					0,
					.2,
					1
				]
			}
		})] }), /* @__PURE__ */ r(o.span, {
			className: "absolute inset-0 rounded-full bg-white",
			animate: e ? { opacity: [
				1,
				.4,
				1
			] } : {
				opacity: [
					1,
					.3,
					1,
					.3,
					1,
					1
				],
				scaleY: [
					1,
					.88,
					1,
					.88,
					1,
					1
				]
			},
			transition: e ? {
				duration: 1.4,
				repeat: Infinity,
				ease: "easeInOut"
			} : {
				duration: u,
				times: [
					0,
					.04,
					.11,
					.15,
					.22,
					1
				],
				repeat: Infinity,
				ease: "linear"
			}
		})]
	});
}
function h({ onActivate: n, className: u }) {
	let d = s(), [f, h] = l("idle");
	function g() {
		h("scanning");
	}
	return c(() => {
		if (f !== "scanning") return;
		let e = setTimeout(() => n?.(), p);
		return () => clearTimeout(e);
	}, [f, n]), /* @__PURE__ */ r(a, {
		mode: "wait",
		children: f === "idle" ? /* @__PURE__ */ i(o.button, {
			type: "button",
			onClick: g,
			"aria-label": "Double click side button to pay",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: {
				opacity: 0,
				transition: {
					duration: .15,
					ease: [
						.4,
						0,
						1,
						1
					]
				}
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
			className: e("inline-flex items-center justify-end gap-[9px] pr-[9px] h-24 md:h-28", "select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm", u),
			children: [/* @__PURE__ */ i("p", {
				className: "text-lg md:text-xl font-normal text-white/90 text-right leading-snug whitespace-nowrap",
				children: [
					"Double Click",
					/* @__PURE__ */ r("br", {}),
					"to Pay"
				]
			}), /* @__PURE__ */ r(m, { shouldReduce: d })]
		}, "double-click-idle") : /* @__PURE__ */ r(o.div, {
			role: "status",
			"aria-label": "Scanning with Face ID",
			initial: {
				opacity: 0,
				scale: d ? 1 : .75
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				transition: {
					duration: .15,
					ease: [
						.4,
						0,
						1,
						1
					]
				}
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
			className: e("flex items-center justify-center h-24 md:h-28", u),
			children: /* @__PURE__ */ r("img", {
				src: t,
				alt: "",
				"aria-hidden": !0,
				width: 88,
				height: 86,
				style: { imageRendering: "auto" }
			})
		}, "double-click-scanning")
	});
}
//#endregion
export { h as DoubleClickToPay };
