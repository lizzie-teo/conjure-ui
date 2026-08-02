"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { mergeRefs as n } from "../../../lib/merge-refs.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { AnimatePresence as o, motion as s, useReducedMotion as c } from "motion/react";
import { useCallback as l, useEffect as u, useId as d, useRef as f, useSyncExternalStore as p } from "react";
import { X as m } from "lucide-react";
//#region components/layouts/ModalSheet/ModalSheet.tsx
var h = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), g = {
	sm: "md:max-w-[360px]",
	md: "md:max-w-[480px]",
	lg: "md:max-w-[600px]"
}, _ = "(min-width: 768px)";
function v() {
	return p(l((e) => {
		let t = window.matchMedia(_);
		return t.addEventListener("change", e), () => t.removeEventListener("change", e);
	}, []), () => window.matchMedia(_).matches, () => !1);
}
function y({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("div", {
		className: e("shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-border", n),
		...r,
		children: t
	});
}
function b({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("div", {
		className: e("flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-4 md:py-5", n),
		...r,
		children: t
	});
}
function x({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("div", {
		className: e("shrink-0 px-4 md:px-6 py-4 md:py-5 border-t border-border", n),
		...r,
		children: t
	});
}
function S({ open: l, onClose: p, title: _, description: y, size: b = "md", children: x, className: S, ref: C, ...w }) {
	let T = c(), E = f(null), D = f(null), O = d(), k = d(), A = v();
	u(() => {
		if (!l) return;
		let e = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.body.style.overflow = e;
		};
	}, [l]), u(() => {
		if (!l) return;
		let e = (e) => {
			e.key === "Escape" && p();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [l, p]), u(() => {
		l ? D.current = document.activeElement : D.current?.focus();
	}, [l]), u(() => {
		if (!l || !E.current) return;
		let e = E.current, t = () => Array.from(e.querySelectorAll(h));
		t()[0]?.focus();
		let n = (e) => {
			if (e.key !== "Tab") return;
			let n = t();
			if (!n.length) return;
			let r = n[0], i = n[n.length - 1];
			e.shiftKey && document.activeElement === r ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r.focus());
		};
		return e.addEventListener("keydown", n), () => e.removeEventListener("keydown", n);
	}, [l]);
	let j = A ? {
		hidden: T ? {
			opacity: 0,
			x: "-50%",
			y: "-50%"
		} : {
			opacity: 0,
			scale: .95,
			x: "-50%",
			y: "-50%"
		},
		show: T ? {
			opacity: 1,
			x: "-50%",
			y: "-50%"
		} : {
			opacity: 1,
			scale: 1,
			x: "-50%",
			y: "-50%"
		},
		exit: T ? {
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
		hidden: T ? { opacity: 0 } : {
			opacity: 0,
			y: "100%"
		},
		show: T ? { opacity: 1 } : {
			opacity: 1,
			y: "0%"
		},
		exit: T ? { opacity: 0 } : {
			opacity: 0,
			y: "100%"
		}
	}, M = A ? .15 : .3;
	return /* @__PURE__ */ i(o, { children: l && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(s.div, {
		className: "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px]",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: T ? .01 : .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		onClick: p,
		"aria-hidden": "true"
	}, "modal-backdrop"), /* @__PURE__ */ a(s.div, {
		...w,
		ref: n(E, C),
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": _ ? O : void 0,
		"aria-describedby": y ? k : void 0,
		className: e("fixed z-50 flex flex-col bg-card border border-border", "shadow-[var(--shadow-elevated)]", "inset-x-0 bottom-0 rounded-t-2xl max-h-[90dvh]", "md:inset-auto md:top-[50%] md:left-[50%] md:rounded-2xl md:w-full md:max-h-[85vh]", g[b ?? "md"], S),
		variants: j,
		initial: "hidden",
		animate: "show",
		exit: "exit",
		transition: {
			duration: M,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		children: [
			/* @__PURE__ */ i("div", {
				className: "flex justify-center pt-3 pb-0 shrink-0 md:hidden",
				"aria-hidden": "true",
				children: /* @__PURE__ */ i("div", { className: "w-10 h-1 rounded-full bg-border" })
			}),
			/* @__PURE__ */ i(t, {
				variant: "ghost",
				size: "icon",
				"aria-label": "Close",
				onClick: p,
				className: "absolute top-2 md:top-3 right-2 md:right-3 z-10 size-12 md:size-10",
				children: /* @__PURE__ */ i(m, { size: 18 })
			}),
			_ && /* @__PURE__ */ i("div", {
				className: "shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 pr-14 border-b border-border",
				children: /* @__PURE__ */ i("h2", {
					id: O,
					className: "text-base md:text-lg font-semibold text-foreground",
					children: _
				})
			}),
			y && /* @__PURE__ */ i("span", {
				id: k,
				className: "sr-only",
				children: y
			}),
			x
		]
	}, "modal-panel")] }) });
}
S.Header = y, S.Body = b, S.Footer = x;
//#endregion
export { S as ModalSheet };
