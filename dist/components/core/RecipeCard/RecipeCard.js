"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { Button as n } from "../../ui/button.js";
import { QuantityStepper as r } from "../../primitives/QuantityStepper/QuantityStepper.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { AnimatePresence as o, motion as s, useReducedMotion as c } from "motion/react";
import { createContext as l, useContext as u, useState as d } from "react";
//#region components/core/RecipeCard/RecipeCard.tsx
var f = l(null);
function p() {
	let e = u(f);
	if (!e) throw Error("RecipeCard sub-components must be used inside <RecipeCard>");
	return e;
}
var m = {
	easy: "success",
	medium: "warning",
	hard: "error"
}, h = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .04
	} }
}, g = {
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
}, _ = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function v(e, t) {
	let n = Number.isInteger(e) ? e : parseFloat(e.toFixed(1)), r = t.trim(), i = r.toLowerCase();
	return !i || i === "whole" ? String(n) : [
		"g",
		"ml",
		"kg",
		"l"
	].includes(i) ? `${n}${r}` : `${n} ${r}`;
}
function y({ src: t, alt: n = "", className: r }) {
	return /* @__PURE__ */ i("div", {
		className: e("overflow-hidden rounded-t-xl", r),
		children: /* @__PURE__ */ i("img", {
			src: t,
			alt: n,
			className: "w-full h-40 md:h-48 object-cover"
		})
	});
}
function b({ title: n, prepTime: r, difficulty: o, className: s }) {
	return /* @__PURE__ */ a("div", {
		className: e("px-4 md:px-5 pt-4 md:pt-5 pb-3", s),
		children: [/* @__PURE__ */ i("h3", {
			className: "text-base md:text-lg font-semibold text-foreground leading-snug",
			children: n
		}), /* @__PURE__ */ a("div", {
			className: "flex items-center gap-2 mt-2 flex-wrap",
			children: [/* @__PURE__ */ i(t, {
				label: r,
				variant: "info"
			}), /* @__PURE__ */ i(t, {
				label: o.charAt(0).toUpperCase() + o.slice(1),
				variant: m[o]
			})]
		})]
	});
}
function x({ ingredients: t, className: r }) {
	let { servings: l, ingredientState: u, toggleIngredient: d, onIngredientClick: f } = p(), m = c();
	return /* @__PURE__ */ i(s.ul, {
		role: "list",
		variants: h,
		initial: "hidden",
		animate: "show",
		className: e("flex flex-col gap-1.5 md:gap-2 list-none p-0 m-0", r),
		children: t.map((t) => {
			let r = u[t.id] ?? !0, c = v(t.quantity * l, t.unit);
			return /* @__PURE__ */ i(s.li, {
				variants: m ? _ : g,
				children: /* @__PURE__ */ a(n, {
					variant: "ghost",
					"aria-pressed": r,
					"aria-label": `${t.name}, ${c}, ${r ? "included" : "excluded"}`,
					onClick: () => {
						d(t.id), f?.({ ...t });
					},
					className: e("w-full h-auto flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-lg border justify-start", "transition-all duration-150 active:scale-[0.97]", r ? "bg-primary/5 border-primary/20" : "bg-transparent border-border opacity-50"),
					children: [
						/* @__PURE__ */ i("span", {
							"aria-hidden": !0,
							className: e("size-4 md:size-5 rounded-full shrink-0 border-2 flex items-center justify-center transition-colors duration-150", r ? "bg-primary border-primary" : "bg-transparent border-muted-foreground/30"),
							children: /* @__PURE__ */ i(o, { children: r && /* @__PURE__ */ i(s.svg, {
								viewBox: "0 0 10 8",
								fill: "none",
								initial: m ? !1 : {
									opacity: 0,
									scale: .4
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								exit: m ? { opacity: 0 } : {
									opacity: 0,
									scale: .4
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
								className: "size-2.5 md:size-3",
								children: /* @__PURE__ */ i("path", {
									d: "M1 4L3.5 6.5L9 1",
									stroke: "white",
									strokeWidth: "1.8",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							}, "check") })
						}),
						/* @__PURE__ */ i("span", {
							className: e("flex-1 text-sm md:text-base font-medium text-left transition-all duration-150", r ? "text-foreground" : "text-muted-foreground line-through"),
							children: t.name
						}),
						/* @__PURE__ */ i("span", {
							className: "text-xs md:text-sm text-muted-foreground font-medium shrink-0 tabular-nums",
							children: c
						})
					]
				})
			}, t.id);
		})
	});
}
function S({ selectedCount: t, onAddToCart: o, className: s }) {
	let { servings: c, setServings: l } = p();
	return /* @__PURE__ */ a("div", {
		className: e("flex flex-col gap-3 md:gap-4", s),
		children: [/* @__PURE__ */ a("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ i("span", {
				className: "text-xs md:text-sm font-medium text-muted-foreground",
				children: "Servings"
			}), /* @__PURE__ */ i(r, {
				value: c,
				min: 1,
				max: 20,
				onChange: l
			})]
		}), /* @__PURE__ */ i(n, {
			variant: "default",
			className: "w-full h-12 md:h-10",
			disabled: t === 0,
			onClick: o,
			children: t === 0 ? "No ingredients selected" : `Add ${t} ingredient${t === 1 ? "" : "s"} to cart`
		})]
	});
}
function C({ title: t, prepTime: n, difficulty: r, defaultServings: o = 2, ingredients: l, image: u, imageAlt: p, onIngredientClick: m, onAddToCart: h, className: g }) {
	let _ = c(), [v, y] = d(o), [b, x] = d(() => Object.fromEntries(l.map((e) => [e.id, e.selected ?? !0]))), S = (e) => x((t) => ({
		...t,
		[e]: !t[e]
	})), w = Object.values(b).filter(Boolean).length;
	return /* @__PURE__ */ i(f.Provider, {
		value: {
			servings: v,
			setServings: y,
			ingredientState: b,
			toggleIngredient: S,
			onIngredientClick: m
		},
		children: /* @__PURE__ */ a(s.div, {
			initial: _ ? { opacity: 0 } : {
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
			className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", g),
			children: [
				u && /* @__PURE__ */ i(C.Image, {
					src: u,
					alt: p
				}),
				/* @__PURE__ */ i(C.Header, {
					title: t,
					prepTime: n,
					difficulty: r
				}),
				/* @__PURE__ */ i("div", {
					className: "px-4 md:px-5 py-3 border-t border-border",
					children: /* @__PURE__ */ i(C.IngredientList, { ingredients: l })
				}),
				/* @__PURE__ */ i("div", {
					className: "px-4 md:px-5 py-3 md:py-4 border-t border-border",
					children: /* @__PURE__ */ i(C.Actions, {
						selectedCount: w,
						onAddToCart: () => {
							let e = l.filter((e) => b[e.id]).map((e) => ({
								...e,
								scaledQuantity: e.quantity * v
							}));
							h?.(e, v);
						}
					})
				})
			]
		})
	});
}
C.Image = y, C.Header = b, C.IngredientList = x, C.Actions = S;
//#endregion
export { C as RecipeCard };
