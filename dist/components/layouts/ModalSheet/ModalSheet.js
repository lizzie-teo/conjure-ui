"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { AnimatePresence as a, motion as o, useReducedMotion as s } from "motion/react";
import { useCallback as c, useEffect as l, useId as u, useRef as d, useSyncExternalStore as f } from "react";
import { X as p } from "lucide-react";
//#region components/layouts/ModalSheet/ModalSheet.tsx
var m = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), h = {
	sm: "md:max-w-[360px]",
	md: "md:max-w-[480px]",
	lg: "md:max-w-[600px]"
}, g = "(min-width: 768px)";
function _() {
	return f(c((e) => {
		let t = window.matchMedia(g);
		return t.addEventListener("change", e), () => t.removeEventListener("change", e);
	}, []), () => window.matchMedia(g).matches, () => !1);
}
function v({ children: t, className: n }) {
	return /* @__PURE__ */ r("div", {
		className: e("shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-border", n),
		children: t
	});
}
function y({ children: t, className: n }) {
	return /* @__PURE__ */ r("div", {
		className: e("flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-4 md:py-5", n),
		children: t
	});
}
function b({ children: t, className: n }) {
	return /* @__PURE__ */ r("div", {
		className: e("shrink-0 px-4 md:px-6 py-4 md:py-5 border-t border-border", n),
		children: t
	});
}
function x({ open: c, onClose: f, title: g, description: v, size: y = "md", children: b, className: x }) {
	let S = s(), C = d(null), w = d(null), T = u(), E = u(), D = _();
	l(() => {
		if (!c) return;
		let e = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.body.style.overflow = e;
		};
	}, [c]), l(() => {
		if (!c) return;
		let e = (e) => {
			e.key === "Escape" && f();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [c, f]), l(() => {
		c ? w.current = document.activeElement : w.current?.focus();
	}, [c]), l(() => {
		if (!c || !C.current) return;
		let e = C.current, t = () => Array.from(e.querySelectorAll(m));
		t()[0]?.focus();
		let n = (e) => {
			if (e.key !== "Tab") return;
			let n = t();
			if (!n.length) return;
			let r = n[0], i = n[n.length - 1];
			e.shiftKey && document.activeElement === r ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r.focus());
		};
		return e.addEventListener("keydown", n), () => e.removeEventListener("keydown", n);
	}, [c]);
	let O = D ? {
		hidden: S ? {
			opacity: 0,
			x: "-50%",
			y: "-50%"
		} : {
			opacity: 0,
			scale: .95,
			x: "-50%",
			y: "-50%"
		},
		show: S ? {
			opacity: 1,
			x: "-50%",
			y: "-50%"
		} : {
			opacity: 1,
			scale: 1,
			x: "-50%",
			y: "-50%"
		},
		exit: S ? {
			opacity: 0,
			x: "-50%",
			y: "-50%"
		} : {
			opacity: 0,
			scale: .95,
			x: "-50%",
			y: "-50%"
		}
	} : {
		hidden: S ? { opacity: 0 } : {
			opacity: 0,
			y: "100%"
		},
		show: S ? { opacity: 1 } : {
			opacity: 1,
			y: "0%"
		},
		exit: S ? { opacity: 0 } : {
			opacity: 0,
			y: "100%"
		}
	}, k = D ? .15 : .3;
	return /* @__PURE__ */ r(a, { children: c && /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(o.div, {
		className: "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px]",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: S ? .01 : .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		onClick: f,
		"aria-hidden": "true"
	}, "modal-backdrop"), /* @__PURE__ */ i(o.div, {
		ref: C,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": g ? T : void 0,
		"aria-describedby": v ? E : void 0,
		className: e("fixed z-50 flex flex-col bg-card border border-border", "shadow-[var(--shadow-elevated)]", "inset-x-0 bottom-0 rounded-t-2xl max-h-[90dvh]", "md:inset-auto md:top-[50%] md:left-[50%] md:rounded-2xl md:w-full md:max-h-[85vh]", h[y ?? "md"], x),
		variants: O,
		initial: "hidden",
		animate: "show",
		exit: "exit",
		transition: {
			duration: k,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		children: [
			/* @__PURE__ */ r("div", {
				className: "flex justify-center pt-3 pb-0 shrink-0 md:hidden",
				"aria-hidden": "true",
				children: /* @__PURE__ */ r("div", { className: "w-10 h-1 rounded-full bg-border" })
			}),
			/* @__PURE__ */ r(t, {
				variant: "ghost",
				size: "icon",
				"aria-label": "Close",
				onClick: f,
				className: "absolute top-2 md:top-3 right-2 md:right-3 z-10 size-12 md:size-10",
				children: /* @__PURE__ */ r(p, { size: 18 })
			}),
			g && /* @__PURE__ */ r("div", {
				className: "shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 pr-14 border-b border-border",
				children: /* @__PURE__ */ r("h2", {
					id: T,
					className: "text-base md:text-lg font-semibold text-foreground",
					children: g
				})
			}),
			v && /* @__PURE__ */ r("span", {
				id: E,
				className: "sr-only",
				children: v
			}),
			b
		]
	}, "modal-panel")] }) });
}
x.Header = v, x.Body = y, x.Footer = b;
//#endregion
export { x as ModalSheet };
