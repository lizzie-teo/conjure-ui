"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { AnimatePresence as i, LayoutGroup as a, motion as o, useReducedMotion as s } from "motion/react";
import { useId as c, useState as l } from "react";
//#region components/core/ChipToCard/ChipToCard.tsx
function u({ chips: u, selectedId: d, onSelectedChange: f, defaultSelectedId: p, className: m, ...h }) {
	let g = d !== void 0, [_, v] = l(p ?? null), y = g ? d : _, b = s(), x = c(), S = u.find((e) => e.id === y), C = (e) => {
		g || v(e), f?.(e);
	};
	return /* @__PURE__ */ n(a, {
		id: x,
		children: /* @__PURE__ */ n("div", {
			className: e("relative", m),
			...h,
			children: /* @__PURE__ */ n(i, {
				mode: "popLayout",
				initial: !1,
				children: y && S ? /* @__PURE__ */ r(o.div, {
					layoutId: `${x}-${y}`,
					className: "rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]",
					initial: { opacity: +!!b },
					animate: { opacity: 1 },
					exit: {
						opacity: 0,
						scale: b ? 1 : .95,
						transition: {
							duration: .2,
							ease: [
								.4,
								0,
								1,
								1
							]
						}
					},
					transition: {
						duration: .25,
						ease: [
							0,
							0,
							.2,
							1
						]
					},
					children: [S.card, /* @__PURE__ */ n("div", {
						className: "px-4 pb-4 pt-2 border-t border-border",
						children: /* @__PURE__ */ n(t, {
							variant: "ghost",
							size: "sm",
							onClick: () => C(null),
							className: "text-muted-foreground",
							children: "← Back to options"
						})
					})]
				}, y) : /* @__PURE__ */ n(o.div, {
					className: "flex flex-wrap gap-2",
					exit: {
						opacity: 0,
						transition: { duration: .1 }
					},
					children: u.map((e) => /* @__PURE__ */ n(o.div, {
						layoutId: `${x}-${e.id}`,
						className: "shrink-0",
						whileTap: b ? void 0 : { scale: .97 },
						children: /* @__PURE__ */ n(t, {
							variant: "outline",
							size: "sm",
							className: "rounded-full",
							onClick: () => C(e.id),
							children: e.label
						})
					}, e.id))
				}, "chip-list")
			})
		})
	});
}
//#endregion
export { u as ChipToCard };
