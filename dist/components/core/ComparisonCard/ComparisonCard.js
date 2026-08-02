"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { AnimatePresence as i, LayoutGroup as a, motion as o, useReducedMotion as s } from "motion/react";
import { useState as c } from "react";
//#region components/core/ComparisonCard/ComparisonCard.tsx
var l = [
	0,
	0,
	.2,
	1
], u = {
	type: "spring",
	stiffness: 280,
	damping: 28
};
function d({ title: d, subtitle: f, caveatQuestion: p = "Does this apply to you?", plans: m, caveats: h, scenarios: g, currency: _ = "$", onViewDetails: v, className: y }) {
	let b = s(), [x, S] = c((h.find((e) => e.default) ?? h[0])?.id ?? ""), [C, w] = c(!1), [T, E] = c(null), D = h.find((e) => e.id === x) ?? h[0], O = m.map((e) => D.planCosts[e.id] ?? 0), k = Math.max(...O), A = Math.min(...O), j = m[O.indexOf(A)]?.id ?? m[0]?.id, M = m.find((e) => e.id === j), N = k - A, P = g?.find((e) => e.id === T);
	function F(e) {
		return `${_}${e.toLocaleString()}`;
	}
	return /* @__PURE__ */ r(o.div, {
		initial: b ? { opacity: 0 } : {
			opacity: 0,
			y: 10,
			scale: .98
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		transition: {
			duration: .22,
			ease: l
		},
		className: e("rounded-[var(--radius)] border border-border bg-card shadow-[var(--shadow-card)]", "p-4 md:p-5 flex flex-col gap-4", y),
		children: [
			/* @__PURE__ */ r("div", { children: [/* @__PURE__ */ n("p", {
				className: "text-sm md:text-base font-semibold text-foreground",
				children: d
			}), f && /* @__PURE__ */ n("p", {
				className: "mt-0.5 text-xs md:text-sm text-muted-foreground",
				children: f
			})] }),
			/* @__PURE__ */ n(a, { children: /* @__PURE__ */ n("div", {
				className: "grid grid-cols-2 gap-2 md:gap-3",
				children: m.map((t) => {
					let a = D.planCosts[t.id] ?? 0, s = k > 0 ? a / k * 100 : 0, c = t.id === j;
					return /* @__PURE__ */ r("div", {
						className: e("flex flex-col rounded-xl p-3 md:p-4 border-2 transition-colors duration-200", c ? "border-primary bg-primary/5" : "border-border bg-muted/20"),
						children: [
							/* @__PURE__ */ n("div", {
								className: "h-5 md:h-6 mb-1.5 md:mb-2",
								children: c && /* @__PURE__ */ n(o.span, {
									layoutId: "winner-badge",
									className: "inline-flex items-center text-[10px] md:text-xs font-semibold text-primary-foreground bg-primary rounded-full px-2 py-0.5",
									transition: {
										type: "spring",
										stiffness: 300,
										damping: 30
									},
									children: "Best for you"
								})
							}),
							/* @__PURE__ */ n("p", {
								className: e("text-[11px] md:text-xs leading-tight mb-1 md:mb-1.5", c ? "text-foreground/60" : "text-muted-foreground"),
								children: t.label
							}),
							/* @__PURE__ */ n(i, {
								mode: "popLayout",
								initial: !1,
								children: /* @__PURE__ */ r(o.div, {
									initial: {
										opacity: 0,
										y: b ? 0 : -5
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: b ? 0 : 5
									},
									transition: {
										duration: .18,
										ease: l
									},
									className: "flex items-baseline gap-0.5",
									children: [/* @__PURE__ */ n("span", {
										className: e("text-xl md:text-2xl font-bold tabular-nums leading-none", c ? "text-foreground" : "text-muted-foreground"),
										children: F(a)
									}), /* @__PURE__ */ n("span", {
										className: "text-[10px] md:text-xs text-muted-foreground font-normal",
										children: "/yr"
									})]
								}, `${t.id}-${a}`)
							}),
							/* @__PURE__ */ n("div", {
								className: "mt-auto pt-3 md:pt-4",
								children: /* @__PURE__ */ n("div", {
									className: "h-1 md:h-1.5 rounded-full bg-muted overflow-hidden",
									children: /* @__PURE__ */ n(o.div, {
										className: e("h-full rounded-full", c ? "bg-primary" : "bg-muted-foreground/25"),
										animate: { width: `${s}%` },
										transition: b ? { duration: 0 } : u
									})
								})
							})
						]
					}, t.id);
				})
			}) }),
			/* @__PURE__ */ n(i, {
				mode: "popLayout",
				initial: !1,
				children: /* @__PURE__ */ r(o.div, {
					initial: {
						opacity: 0,
						y: b ? 0 : 4
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: b ? 0 : -4
					},
					transition: {
						duration: .2,
						ease: l
					},
					className: "flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-xs md:text-sm font-medium text-success",
					children: [/* @__PURE__ */ n("span", {
						"aria-hidden": "true",
						children: "✓"
					}), /* @__PURE__ */ n("span", { children: M ? `${M.label} saves ~${F(N)}/year` : `Save ~${F(N)}/year` })]
				}, j)
			}),
			/* @__PURE__ */ n("div", { className: "h-px bg-border -mx-4 md:-mx-5" }),
			h.length > 1 && /* @__PURE__ */ r("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ n("p", {
					className: "text-xs md:text-sm text-muted-foreground",
					children: p
				}), /* @__PURE__ */ n("div", {
					className: "flex gap-2 overflow-x-auto pb-0.5 scrollbar-none",
					role: "group",
					"aria-label": p,
					children: h.map((r) => {
						let i = r.id === x;
						return /* @__PURE__ */ n(t, {
							onClick: () => S(r.id),
							"aria-pressed": i,
							variant: "ghost",
							className: e("shrink-0 h-auto rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap", "transition-colors duration-100", i ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
							children: r.label
						}, r.id);
					})
				})]
			}),
			g && g.length > 0 && /* @__PURE__ */ n(i, {
				initial: !1,
				mode: "wait",
				children: C ? /* @__PURE__ */ r(o.div, {
					initial: {
						opacity: 0,
						y: b ? 0 : 6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .2,
						ease: l
					},
					className: "flex flex-col gap-2.5",
					children: [/* @__PURE__ */ n("div", {
						className: "flex gap-2 flex-wrap",
						role: "group",
						"aria-label": "Scenario options",
						children: g.map((r) => {
							let i = r.id === T;
							return /* @__PURE__ */ n(t, {
								onClick: () => E(i ? null : r.id),
								"aria-pressed": i,
								variant: "outline",
								className: e("h-auto rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap", "transition-colors duration-100", i ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground" : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted/30"),
								children: r.label
							}, r.id);
						})
					}), /* @__PURE__ */ n(i, {
						initial: !1,
						children: P && /* @__PURE__ */ n(o.p, {
							initial: {
								opacity: 0,
								y: b ? 0 : 4
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: { opacity: 0 },
							transition: {
								duration: .2,
								ease: l
							},
							className: "text-xs md:text-sm text-foreground leading-relaxed",
							children: P.insight
						}, P.id)
					})]
				}, "what-if-expanded") : /* @__PURE__ */ n(o.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: { duration: .15 },
					className: "self-start",
					children: /* @__PURE__ */ n(t, {
						variant: "ghost",
						onClick: () => w(!0),
						className: "h-auto p-0 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors duration-100",
						children: "What if something unexpected happened? →"
					})
				}, "what-if-prompt")
			}),
			v && /* @__PURE__ */ n("div", {
				className: "flex justify-end -mb-1",
				children: /* @__PURE__ */ n(t, {
					variant: "ghost",
					size: "sm",
					onClick: v,
					className: "text-primary hover:text-primary/80 -mr-2 h-auto py-1.5 px-2 text-xs md:text-sm font-semibold",
					children: "See full details →"
				})
			})
		]
	});
}
//#endregion
export { d as ComparisonCard };
