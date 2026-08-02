"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { AnimatePresence as r, motion as i, useReducedMotion as a } from "motion/react";
import { Check as o, Fingerprint as s, X as c } from "lucide-react";
//#region components/primitives/BiometricIndicator/BiometricIndicator.tsx
var l = {
	idle: "text-muted-foreground",
	pending: "text-primary",
	success: "text-success",
	error: "text-destructive"
}, u = {
	idle: "border-border",
	pending: "border-primary",
	success: "border-success",
	error: "border-destructive"
}, d = {
	idle: "Ready for biometric authentication",
	pending: "Waiting for biometric",
	success: "Verified",
	error: "Authentication failed"
};
function f({ state: f, className: p, ...m }) {
	let h = a();
	return /* @__PURE__ */ n("div", {
		role: "img",
		"aria-label": d[f],
		className: e("relative inline-flex items-center justify-center size-20 md:size-16", p),
		...m,
		children: [
			/* @__PURE__ */ t("div", { className: e("absolute inset-0 rounded-full border-2 transition-colors duration-300", u[f]) }),
			f === "pending" && !h && /* @__PURE__ */ t(i.div, {
				className: "absolute inset-0 rounded-full border-2 border-primary",
				animate: {
					scale: [
						1,
						1.55,
						1
					],
					opacity: [
						.5,
						0,
						.5
					]
				},
				transition: {
					duration: 1.8,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ t(r, {
				mode: "wait",
				children: f === "success" ? /* @__PURE__ */ t(i.span, {
					initial: {
						opacity: 0,
						scale: h ? 1 : .5
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: h ? 1 : .5
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
					className: "text-success",
					children: /* @__PURE__ */ t(o, {
						className: "size-8 md:size-7",
						strokeWidth: 2.5
					})
				}, "success") : f === "error" ? /* @__PURE__ */ t(i.span, {
					initial: {
						opacity: 0,
						scale: h ? 1 : .5
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: h ? 1 : .5
					},
					transition: {
						duration: .15,
						ease: [
							0,
							0,
							.2,
							1
						]
					},
					className: "text-destructive",
					children: /* @__PURE__ */ t(i.span, {
						animate: h ? {} : { x: [
							0,
							-5,
							5,
							-5,
							5,
							0
						] },
						transition: {
							duration: .4,
							ease: [
								.4,
								0,
								.2,
								1
							],
							delay: .1
						},
						className: "block",
						children: /* @__PURE__ */ t(c, {
							className: "size-8 md:size-7",
							strokeWidth: 2.5
						})
					})
				}, "error") : /* @__PURE__ */ t(i.span, {
					initial: {
						opacity: 0,
						scale: h ? 1 : .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: h ? 1 : .9
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
					className: l[f],
					children: /* @__PURE__ */ t(s, { className: "size-8 md:size-7" })
				}, "fingerprint")
			})
		]
	});
}
//#endregion
export { f as BiometricIndicator };
