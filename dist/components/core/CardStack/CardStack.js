"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { motion as n, useReducedMotion as r } from "motion/react";
import { Children as i, useLayoutEffect as a, useRef as o, useState as s } from "react";
//#region components/core/CardStack/CardStack.tsx
var c = 5, l = 6, u = 12;
function d({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("div", {
		className: e("w-full", r),
		...i,
		children: n
	});
}
function f({ children: d, expanded: f, onExpandChange: p, defaultExpanded: m = !1, className: h, ...g }) {
	let _ = f !== void 0, [v, y] = s(m), b = _ ? f : v, x = r(), S = o(null), [C, w] = s(0), [T, E] = s(!1), D = i.toArray(d), O = Math.min(D.length, c), k = D.slice(0, O);
	process.env.NODE_ENV === "development" && D.length > c && console.warn(`CardStack: received ${D.length} items but only ${c} are supported. Extra items are hidden.`), a(() => {
		if (!S.current) return;
		let e = () => {
			let e = S.current.getBoundingClientRect().height;
			e > 0 && (w(e), E(!0));
		};
		e();
		let t = new ResizeObserver(e);
		return t.observe(S.current), () => t.disconnect();
	}, []);
	let A = C + u, j = C + (O - 1) * l, M = C + (O - 1) * A, N = (e) => {
		_ || y(e), p?.(e);
	}, P = (e) => {
		!b && (e.key === "Enter" || e.key === " ") ? (e.preventDefault(), N(!0)) : b && e.key === "Escape" && N(!1);
	};
	return /* @__PURE__ */ t(n.div, {
		...g,
		className: e("relative select-none", !b && "cursor-pointer", h),
		animate: T ? { height: b ? M : j } : void 0,
		transition: !T || x ? { duration: 0 } : {
			type: "spring",
			stiffness: 320,
			damping: 28
		},
		onClick: b ? void 0 : () => N(!0),
		onKeyDown: P,
		role: "button",
		tabIndex: 0,
		"aria-expanded": b,
		"aria-label": b ? "Card options expanded" : "Tap to expand card options",
		children: k.map((e, r) => /* @__PURE__ */ t(n.div, {
			ref: r === 0 ? S : void 0,
			className: "absolute inset-x-0 top-0",
			style: { zIndex: O - r },
			animate: {
				y: x ? 0 : r * (b ? A : l),
				rotate: x ? 0 : r * (b ? 0 : -1.5)
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
