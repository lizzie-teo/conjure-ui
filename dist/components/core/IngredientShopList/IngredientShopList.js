"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { PriceDisplay as n } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { Button as r } from "../../ui/button.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { AnimatePresence as o, motion as s, useReducedMotion as c } from "motion/react";
import { createContext as l, useContext as u, useState as d } from "react";
import { Check as f, ChevronDown as p, ChevronUp as m } from "lucide-react";
//#region components/core/IngredientShopList/IngredientShopList.tsx
var h = l(null);
function g() {
	let e = u(h);
	if (!e) throw Error("IngredientShopList sub-components must be used inside <IngredientShopList>");
	return e;
}
function _(e, t) {
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: t
	}).format(e);
}
var v = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .04
	} }
}, y = {
	hidden: {
		opacity: 0,
		y: 8
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		}
	}
}, b = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function x({ item: l, isLast: u, className: d }) {
	let { selections: h, openSwap: v, selectProduct: x, toggleSwap: S } = g(), C = c(), w = h[l.ingredientId] ?? l.recommendedProduct, T = v[l.ingredientId] ?? !1, E = (l.alternatives?.length ?? 0) > 0;
	return /* @__PURE__ */ a(s.div, {
		variants: C ? b : y,
		className: e("px-4 md:px-5 py-3 md:py-4", !u && "border-b border-border", d),
		children: [/* @__PURE__ */ a("div", {
			className: "flex items-start gap-3 md:gap-3.5",
			children: [w.imageUrl && /* @__PURE__ */ i("div", {
				className: "shrink-0 size-12 md:size-14 rounded-lg overflow-hidden border border-border bg-muted",
				children: /* @__PURE__ */ i("img", {
					src: w.imageUrl,
					alt: w.name,
					className: "size-full object-cover"
				})
			}), /* @__PURE__ */ a("div", {
				className: "flex-1 min-w-0",
				children: [
					w.onSale && /* @__PURE__ */ i("div", {
						className: "mb-1",
						children: /* @__PURE__ */ i(t, {
							label: "On sale",
							variant: "success"
						})
					}),
					/* @__PURE__ */ i("p", {
						className: "text-xs md:text-sm text-muted-foreground mb-0.5",
						children: l.ingredientName
					}),
					/* @__PURE__ */ a("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ a("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ i("p", {
								className: "text-sm md:text-base font-medium text-foreground leading-snug truncate",
								children: w.name
							}), /* @__PURE__ */ i("div", {
								className: "mt-0.5",
								children: /* @__PURE__ */ i(n, {
									amount: w.price,
									currency: w.currency,
									strikethrough: w.onSale && w.originalPrice !== void 0 ? w.originalPrice : void 0
								})
							})]
						}), E && /* @__PURE__ */ a(r, {
							variant: "ghost",
							size: "sm",
							onClick: () => S(l.ingredientId),
							className: "shrink-0 h-8 md:h-7 gap-1 text-muted-foreground",
							"aria-expanded": T,
							"aria-label": `${T ? "Close options" : "Swap product"} for ${l.ingredientName}`,
							children: [T ? "Close" : "Swap", i(T ? m : p, { className: "size-3.5" })]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ i(o, { children: T && l.alternatives && /* @__PURE__ */ i(s.div, {
			initial: C ? { opacity: 0 } : {
				height: 0,
				opacity: 0
			},
			animate: C ? { opacity: 1 } : {
				height: "auto",
				opacity: 1
			},
			exit: C ? { opacity: 0 } : {
				height: 0,
				opacity: 0
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
			style: { overflow: "hidden" },
			children: /* @__PURE__ */ i("div", {
				className: "flex flex-col gap-1.5 mt-2.5",
				children: l.alternatives.map((t) => {
					let n = w.id === t.id;
					return /* @__PURE__ */ a(r, {
						variant: "outline",
						onClick: () => x(l.ingredientId, t),
						className: e("w-full h-auto py-2 md:py-1.5 px-3 flex items-center justify-between gap-2 active:scale-[0.97]", n && "bg-primary/5 border-primary/20"),
						children: [/* @__PURE__ */ a("span", {
							className: "flex items-center gap-1.5 text-sm font-medium text-left min-w-0",
							children: [n && /* @__PURE__ */ i(f, { className: "size-3.5 text-primary shrink-0" }), /* @__PURE__ */ i("span", {
								className: "truncate",
								children: t.name
							})]
						}), /* @__PURE__ */ a("span", {
							className: "text-sm shrink-0 tabular-nums flex items-baseline gap-1.5",
							children: [t.onSale && t.originalPrice !== void 0 && /* @__PURE__ */ i("span", {
								className: "line-through text-xs text-muted-foreground",
								children: _(t.originalPrice, t.currency)
							}), /* @__PURE__ */ i("span", {
								className: "font-semibold",
								children: _(t.price, t.currency)
							})]
						})]
					}, t.id);
				})
			})
		}) })]
	});
}
function S({ items: t, onAddToCart: n, className: a }) {
	let { selections: o } = g(), s = t[0]?.recommendedProduct.currency ?? "USD", c = Object.values(o).reduce((e, t) => e + t.price, 0);
	return /* @__PURE__ */ i("div", {
		className: e("px-4 md:px-5 py-3 md:py-4 border-t border-border", a),
		children: /* @__PURE__ */ i(r, {
			variant: "default",
			className: "w-full h-12 md:h-10",
			onClick: n,
			children: `Add all to cart — ${_(c, s)}`
		})
	});
}
function C({ items: t, onAddToCart: n, className: r }) {
	let o = c(), [l, u] = d(() => Object.fromEntries(t.map((e) => [e.ingredientId, e.recommendedProduct]))), [f, p] = d({});
	return /* @__PURE__ */ i(h.Provider, {
		value: {
			selections: l,
			openSwap: f,
			selectProduct: (e, t) => {
				u((n) => ({
					...n,
					[e]: t
				})), p((t) => ({
					...t,
					[e]: !1
				}));
			},
			toggleSwap: (e) => p((t) => ({
				...t,
				[e]: !t[e]
			}))
		},
		children: /* @__PURE__ */ a(s.div, {
			initial: o ? { opacity: 0 } : {
				opacity: 0,
				y: 10
			},
			animate: {
				opacity: 1,
				y: 0
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
			className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", r),
			children: [/* @__PURE__ */ i(s.div, {
				variants: v,
				initial: "hidden",
				animate: "show",
				children: t.map((e, n) => /* @__PURE__ */ i(C.Row, {
					item: e,
					isLast: n === t.length - 1
				}, e.ingredientId))
			}), /* @__PURE__ */ i(C.Actions, {
				items: t,
				onAddToCart: () => {
					let e = t.map((e) => ({
						...e,
						selectedProduct: l[e.ingredientId] ?? e.recommendedProduct
					}));
					n?.(e);
				}
			})]
		})
	});
}
C.Row = x, C.Actions = S;
//#endregion
export { C as IngredientShopList };
