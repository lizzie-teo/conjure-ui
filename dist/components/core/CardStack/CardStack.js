"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
import { Children as i, useLayoutEffect as a, useRef as o, useState as s } from "react";
//#region components/core/CardStack/CardStack.tsx
var c = 5, l = 6, u = 12;
function d({ children: n, className: r }) {
	return /* @__PURE__ */ t("div", {
		className: e("w-full", r),
		children: n
	});
}
function f({ children: d, expanded: f, onExpandChange: p, defaultExpanded: m = !1, className: h }) {
	let g = f !== void 0, [_, v] = s(m), y = g ? f : _, b = r(), x = o(null), [S, C] = s(0), [w, T] = s(!1), E = i.toArray(d), D = Math.min(E.length, c), O = E.slice(0, D);
	process.env.NODE_ENV === "development" && E.length > c && console.warn(`CardStack: received ${E.length} items but only ${c} are supported. Extra items are hidden.`), a(() => {
		if (!x.current) return;
		let e = () => {
			let e = x.current.getBoundingClientRect().height;
			e > 0 && (C(e), T(!0));
		};
		e();
		let t = new ResizeObserver(e);
		return t.observe(x.current), () => t.disconnect();
	}, []);
	let k = S + u, A = S + (D - 1) * l, j = S + (D - 1) * k, M = (e) => {
		g || v(e), p?.(e);
	};
	return /* @__PURE__ */ t(n.div, {
		className: e("relative select-none", !y && "cursor-pointer", h),
		animate: w ? { height: y ? j : A } : void 0,
		transition: !w || b ? { duration: 0 } : {
			type: "spring",
			stiffness: 320,
			damping: 28
		},
		onClick: y ? void 0 : () => M(!0),
		onKeyDown: (e) => {
			!y && (e.key === "Enter" || e.key === " ") ? (e.preventDefault(), M(!0)) : y && e.key === "Escape" && M(!1);
		},
		role: "button",
		tabIndex: 0,
		"aria-expanded": y,
		"aria-label": y ? "Card options expanded" : "Tap to expand card options",
		children: O.map((e, r) => /* @__PURE__ */ t(n.div, {
			ref: r === 0 ? x : void 0,
			className: "absolute inset-x-0 top-0",
			style: { zIndex: D - r },
			animate: {
				y: b ? 0 : r * (y ? k : l),
				rotate: b ? 0 : r * (y ? 0 : -1.5)
			},
			transition: {
				type: "spring",
				stiffness: 320,
				damping: 28
			},
			children: e
		}, r))
	});
}
f.Item = d;
//#endregion
export { f as CardStack };
