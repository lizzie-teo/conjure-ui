"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { AnimatePresence as r, motion as i, useReducedMotion as a } from "motion/react";
import { Check as o } from "lucide-react";
//#region components/primitives/ProgressStep/ProgressStep.tsx
var s = "size-3 md:size-3.5 rounded-full border-2 flex items-center justify-center", c = {
	pending: "bg-muted border-border",
	active: "bg-primary/20 border-primary ring-2 ring-primary/30",
	complete: "bg-primary border-primary"
};
function l({ status: l, label: u, className: d, ...f }) {
	let p = a();
	return /* @__PURE__ */ n("div", {
		className: e("inline-flex flex-col items-center gap-1", d),
		"aria-current": l === "active" ? "step" : void 0,
		...f,
		children: [/* @__PURE__ */ n("div", {
			className: "relative",
			children: [/* @__PURE__ */ t("div", {
				className: e(s, c[l]),
				children: /* @__PURE__ */ t(r, { children: l === "complete" && /* @__PURE__ */ t(i.span, {
					initial: {
						opacity: 0,
						scale: p ? 1 : .5
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: p ? 1 : .5
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
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ t(o, {
						className: "size-2 md:size-2.5 text-primary-foreground",
						strokeWidth: 3
					})
				}, "check") })
			}), l === "active" && !p && /* @__PURE__ */ t(i.div, {
				className: "absolute inset-0 rounded-full border-2 border-primary",
				animate: {
					scale: [
						1,
						1.6,
						1
					],
					opacity: [
						.6,
						0,
						.6
					]
				},
				transition: {
					duration: 1.2,
					repeat: Infinity,
					ease: "easeInOut"
				}
			})]
		}), u && /* @__PURE__ */ t("span", {
			className: "text-xs md:text-sm text-muted-foreground",
			children: u
		})]
	});
}
//#endregion
export { l as ProgressStep, s as progressStepDotBase, c as progressStepStatusClasses };
