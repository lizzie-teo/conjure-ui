"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { BiometricIndicator as n } from "../../primitives/BiometricIndicator/BiometricIndicator.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { AnimatePresence as a, motion as o, useReducedMotion as s } from "motion/react";
//#region components/core/AuthPrompt/AuthPrompt.tsx
var c = {
	idle: "Use your passkey to confirm",
	pending: "Authenticating…",
	success: "Identity confirmed",
	error: "Authentication failed"
};
function l({ state: l, onAuthenticate: u, onRetry: d, errorMessage: f, className: p, ...m }) {
	let h = s();
	return /* @__PURE__ */ i("div", {
		className: e("flex flex-col items-center gap-5 md:gap-6 p-6 md:p-8", p),
		...m,
		children: [/* @__PURE__ */ r(n, { state: l }), /* @__PURE__ */ r(a, {
			mode: "wait",
			children: /* @__PURE__ */ i(o.div, {
				initial: {
					opacity: 0,
					y: h ? 0 : 6
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: h ? 0 : -4
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
				className: "flex flex-col items-center gap-3 text-center w-full",
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				children: [
					/* @__PURE__ */ r("p", {
						className: "text-sm md:text-base font-medium text-foreground",
						children: c[l]
					}),
					l === "error" && f && /* @__PURE__ */ r("p", {
						className: "text-xs md:text-sm text-destructive",
						children: f
					}),
					l === "idle" && /* @__PURE__ */ r(t, {
						className: "h-12 md:h-10 w-full md:w-auto",
						onClick: u,
						children: "Authenticate"
					}),
					l === "pending" && /* @__PURE__ */ r(t, {
						className: "h-12 md:h-10 w-full md:w-auto",
						disabled: !0,
						children: "Authenticating…"
					}),
					l === "error" && d && /* @__PURE__ */ r(t, {
						variant: "outline",
						className: "h-12 md:h-10 w-full md:w-auto",
						onClick: d,
						children: "Try again"
					})
				]
			}, l)
		})]
	});
}
//#endregion
export { l as AuthPrompt };
