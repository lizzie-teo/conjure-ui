"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { AnimatePresence as i, motion as a, useReducedMotion as o } from "motion/react";
import { useEffect as s, useRef as c } from "react";
import { AlertTriangle as l, CheckCircle as u, Info as d, X as f, XCircle as p } from "lucide-react";
//#region components/primitives/ToastBanner/ToastBanner.tsx
var m = {
	info: {
		icon: d,
		className: "bg-primary/10 text-primary border-primary/20",
		role: "status"
	},
	success: {
		icon: u,
		className: "bg-success/10 text-success border-success/20",
		role: "status"
	},
	warning: {
		icon: l,
		className: "bg-warning/10 text-warning border-warning/20",
		role: "alert"
	},
	error: {
		icon: p,
		className: "bg-destructive/10 text-destructive border-destructive/20",
		role: "alert"
	}
};
function h({ message: i, variant: l = "info", duration: u = 4e3, onDismiss: d, className: p, ...h }) {
	let g = o(), { icon: _, className: v, role: y } = m[l], b = c(null);
	return s(() => {
		if (u > 0 && d) return b.current = setTimeout(d, u), () => {
			b.current && clearTimeout(b.current);
		};
	}, [u, d]), /* @__PURE__ */ r(a.div, {
		role: y,
		"aria-live": y === "alert" ? "assertive" : "polite",
		initial: {
			opacity: 0,
			y: g ? 0 : -8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: g ? 0 : -8
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
		className: e("relative flex items-start gap-2.5 md:gap-3 overflow-hidden", "px-3 py-2.5 md:px-4 md:py-3 rounded-[var(--radius)] border", "text-sm md:text-base", v, p),
		...h,
		children: [
			/* @__PURE__ */ n(_, {
				className: "size-4 md:size-5 shrink-0 mt-0.5",
				"aria-hidden": !0
			}),
			/* @__PURE__ */ n("span", {
				className: "flex-1 min-w-0 leading-snug",
				children: i
			}),
			d && /* @__PURE__ */ n(t, {
				variant: "ghost",
				size: "icon-sm",
				onClick: d,
				"aria-label": "Dismiss notification",
				className: "shrink-0 opacity-70 hover:opacity-100 hover:bg-transparent transition-opacity focus-visible:ring-current",
				children: /* @__PURE__ */ n(f, {
					className: "size-4 md:size-5",
					"aria-hidden": !0
				})
			}),
			u > 0 && !g && d && /* @__PURE__ */ n(a.div, {
				className: "absolute bottom-0 left-0 h-0.5 bg-current opacity-30",
				initial: { width: "100%" },
				animate: { width: "0%" },
				transition: {
					duration: u / 1e3,
					ease: "linear"
				}
			})
		]
	});
}
function g({ children: t, className: r, ...a }) {
	return /* @__PURE__ */ n(i, {
		mode: "popLayout",
		children: /* @__PURE__ */ n("div", {
			className: e("flex flex-col gap-2", r),
			...a,
			children: t
		})
	});
}
//#endregion
export { h as ToastBanner, g as ToastBannerGroup };
