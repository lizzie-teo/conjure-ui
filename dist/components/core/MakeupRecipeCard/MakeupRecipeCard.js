"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { Button as n } from "../../ui/button.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { AnimatePresence as a, motion as o, useReducedMotion as s } from "motion/react";
import { createContext as c, useContext as l, useState as u } from "react";
//#region components/core/MakeupRecipeCard/MakeupRecipeCard.tsx
var d = c(null);
function f() {
	let e = l(d);
	if (!e) throw Error("MakeupRecipeCard sub-components must be used inside <MakeupRecipeCard>");
	return e;
}
var p = {
	day: "info",
	night: "warning"
}, m = {
	day: "Day",
	night: "Night out"
}, h = {
	eye: "Eye",
	lip: "Lip",
	cheek: "Cheek",
	base: "Base",
	palette: "Palette"
}, g = {
	hidden: {},
	show: { transition: {
		staggerChildren: .06,
		delayChildren: .08
	} }
}, _ = {
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
}, v = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: .2 }
	}
};
function y({ className: t }) {
	let { recipe: n } = f();
	return /* @__PURE__ */ r("div", {
		className: e("flex h-2 overflow-hidden", t),
		children: n.products.map((e) => /* @__PURE__ */ r("div", {
			className: "flex-1",
			style: { backgroundColor: e.swatch.hex }
		}, e.id))
	});
}
function b({ className: t }) {
	let { recipe: n } = f(), a = [...n.products.filter((e) => e.isFocalPoint && e.image), ...n.products.filter((e) => !e.isFocalPoint && e.image)];
	if (a.length === 0) return /* @__PURE__ */ r(y, { className: t });
	let [o, ...s] = a;
	return a.length === 1 ? /* @__PURE__ */ r("div", {
		className: e("h-40 md:h-44 overflow-hidden", t),
		children: /* @__PURE__ */ r("img", {
			src: o.image,
			alt: o.imageAlt ?? o.shade,
			className: "w-full h-full object-cover"
		})
	}) : a.length === 2 ? /* @__PURE__ */ i("div", {
		className: e("flex h-40 md:h-44 overflow-hidden gap-px bg-border", t),
		children: [/* @__PURE__ */ r("img", {
			src: o.image,
			alt: o.imageAlt ?? o.shade,
			className: "flex-1 h-full object-cover min-w-0"
		}), /* @__PURE__ */ r("img", {
			src: s[0].image,
			alt: s[0].imageAlt ?? s[0].shade,
			className: "flex-1 h-full object-cover min-w-0"
		})]
	}) : /* @__PURE__ */ i("div", {
		className: e("flex h-40 md:h-44 overflow-hidden gap-px bg-border", t),
		children: [/* @__PURE__ */ r("img", {
			src: o.image,
			alt: o.imageAlt ?? o.shade,
			className: "w-2/3 h-full object-cover shrink-0"
		}), /* @__PURE__ */ r("div", {
			className: "flex flex-col flex-1 gap-px min-w-0",
			children: s.slice(0, 2).map((e) => /* @__PURE__ */ r("img", {
				src: e.image,
				alt: e.imageAlt ?? e.shade,
				className: "flex-1 w-full object-cover"
			}, e.id))
		})]
	});
}
function x({ className: t }) {
	let { recipe: c } = f(), l = s(), [d, p] = u(0), [m, h] = u(0), g = [...c.products.filter((e) => e.isFocalPoint && e.image), ...c.products.filter((e) => !e.isFocalPoint && e.image)];
	if (g.length === 0) return /* @__PURE__ */ r(y, { className: t });
	if (g.length === 1) return /* @__PURE__ */ r("div", {
		className: e("h-40 md:h-44 overflow-hidden", t),
		children: /* @__PURE__ */ r("img", {
			src: g[0].image,
			alt: g[0].imageAlt ?? g[0].shade,
			className: "w-full h-full object-cover"
		})
	});
	let _ = (e) => {
		h(e), p((t) => (t + e + g.length) % g.length);
	};
	return /* @__PURE__ */ i("div", {
		className: e("relative h-40 md:h-44 overflow-hidden bg-muted", t),
		children: [
			/* @__PURE__ */ r(a, {
				initial: !1,
				custom: m,
				children: /* @__PURE__ */ r(o.img, {
					custom: m,
					variants: {
						enter: (e) => ({ x: e > 0 ? "100%" : "-100%" }),
						center: { x: 0 },
						exit: (e) => ({ x: e > 0 ? "-100%" : "100%" })
					},
					initial: "enter",
					animate: "center",
					exit: "exit",
					transition: {
						duration: l ? .01 : .3,
						ease: [
							0,
							0,
							.2,
							1
						]
					},
					src: g[d].image,
					alt: g[d].imageAlt ?? g[d].shade,
					className: "absolute inset-0 w-full h-full object-cover",
					drag: "x",
					dragConstraints: {
						left: 0,
						right: 0
					},
					dragElastic: .15,
					onDragEnd: (e, t) => {
						t.offset.x < -40 ? _(1) : t.offset.x > 40 && _(-1);
					}
				}, d)
			}),
			/* @__PURE__ */ r("div", { className: "absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" }),
			/* @__PURE__ */ r("div", {
				className: "absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5",
				children: g.map((t, i) => /* @__PURE__ */ r(n, {
					variant: "ghost",
					"aria-label": `View ${g[i].label}`,
					onClick: () => {
						h(i > d ? 1 : -1), p(i);
					},
					className: e("p-0 min-w-0 h-auto rounded-full transition-all duration-200 hover:bg-transparent", i === d ? "size-2 bg-white" : "size-1.5 bg-white/50 hover:bg-white/70")
				}, i))
			})
		]
	});
}
function S({ className: e }) {
	let { hero: t } = f();
	return r(t === "carousel" ? x : b, { className: e });
}
function C({ className: n }) {
	let { recipe: a } = f();
	return /* @__PURE__ */ i("div", {
		className: e("px-4 md:px-5 pt-4 md:pt-5 pb-3 md:pb-4", n),
		children: [
			/* @__PURE__ */ i("div", {
				className: "flex items-center gap-2 mb-3 flex-wrap",
				children: [/* @__PURE__ */ r(t, {
					label: m[a.occasion],
					variant: p[a.occasion]
				}), a.format === "palette" && /* @__PURE__ */ r(t, {
					label: "Palette",
					variant: "default"
				})]
			}),
			/* @__PURE__ */ r("h3", {
				className: "text-base md:text-lg font-semibold text-foreground leading-snug mb-2",
				children: a.lookName
			}),
			/* @__PURE__ */ r("p", {
				className: "text-sm md:text-base text-foreground leading-relaxed",
				children: a.story.harmony
			}),
			/* @__PURE__ */ r("p", {
				className: "text-sm md:text-base text-muted-foreground leading-relaxed mt-1",
				children: a.story.skinTone
			})
		]
	});
}
function w({ className: a }) {
	let { recipe: c, onProductClick: l } = f(), u = s();
	return /* @__PURE__ */ r(o.ul, {
		role: "list",
		variants: g,
		initial: "hidden",
		animate: "show",
		className: e("flex flex-col gap-2 md:gap-2.5 list-none p-0 m-0", a),
		children: c.products.map((a) => /* @__PURE__ */ r(o.li, {
			variants: u ? v : _,
			children: /* @__PURE__ */ i(n, {
				variant: "ghost",
				"aria-label": `${a.label}, ${a.shade}${a.isFocalPoint ? ", featured colour" : ""}`,
				onClick: () => l?.(a),
				className: e("w-full h-auto flex items-start gap-3 px-3 py-2.5 md:py-3 rounded-xl border justify-start whitespace-normal", "transition-all duration-150", a.isFocalPoint ? "bg-primary/5 border-primary/20 hover:bg-primary/[0.08]" : "bg-transparent border-border hover:bg-muted/60"),
				children: [
					a.image ? /* @__PURE__ */ r("img", {
						src: a.image,
						alt: a.imageAlt ?? a.shade,
						className: "size-11 md:size-12 rounded-lg shrink-0 object-cover border border-border/40 mt-0.5"
					}) : /* @__PURE__ */ r("span", {
						className: "size-11 md:size-12 rounded-full shrink-0 border border-black/10 shadow-sm mt-0.5",
						style: { backgroundColor: a.swatch.hex },
						"aria-hidden": !0
					}),
					/* @__PURE__ */ i("span", {
						className: "flex-1 flex flex-col items-start gap-0.5 min-w-0 pt-0.5",
						children: [
							/* @__PURE__ */ r("span", {
								className: "text-xs font-medium uppercase tracking-wide text-muted-foreground leading-none",
								children: h[a.type]
							}),
							/* @__PURE__ */ r("span", {
								className: e("text-sm md:text-base text-left leading-snug", a.isFocalPoint ? "font-semibold text-foreground" : "font-medium text-foreground"),
								children: a.shade
							}),
							a.undertoneNote && /* @__PURE__ */ r("span", {
								className: "text-xs text-left text-muted-foreground leading-snug mt-0.5",
								children: a.undertoneNote
							})
						]
					}),
					a.isFocalPoint && /* @__PURE__ */ r("div", {
						className: "shrink-0 mt-0.5",
						children: /* @__PURE__ */ r(t, {
							label: "Focus",
							variant: "info"
						})
					})
				]
			})
		}, a.id))
	});
}
function T({ className: t }) {
	let { recipe: a, onAddToCart: o, onSave: s } = f(), c = a.products.length;
	return /* @__PURE__ */ i("div", {
		className: e("flex flex-col gap-2 md:gap-3", t),
		children: [o && /* @__PURE__ */ i(n, {
			variant: "default",
			className: "w-full h-12 md:h-10",
			onClick: () => o(a.products),
			children: [
				"Add ",
				c,
				" product",
				c === 1 ? "" : "s",
				" to cart"
			]
		}), s && /* @__PURE__ */ r(n, {
			variant: "ghost",
			className: "w-full h-12 md:h-10 text-muted-foreground",
			onClick: () => s(a),
			children: "Save this look"
		})]
	});
}
function E({ recipe: t, hero: n = "collage", onProductClick: a, onAddToCart: c, onSave: l, className: u }) {
	let f = s();
	return /* @__PURE__ */ r(d.Provider, {
		value: {
			recipe: t,
			hero: n,
			onProductClick: a,
			onAddToCart: c,
			onSave: l
		},
		children: /* @__PURE__ */ i(o.div, {
			initial: f ? { opacity: 0 } : {
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
			className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", u),
			children: [
				/* @__PURE__ */ r(E.Hero, {}),
				/* @__PURE__ */ r(E.Story, {}),
				/* @__PURE__ */ r("div", {
					className: "px-4 md:px-5 py-3 border-t border-border",
					children: /* @__PURE__ */ r(E.ProductList, {})
				}),
				/* @__PURE__ */ r("div", {
					className: "px-4 md:px-5 py-3 md:py-4 border-t border-border",
					children: /* @__PURE__ */ r(E.Actions, {})
				})
			]
		})
	});
}
E.Hero = S, E.Story = C, E.ProductList = w, E.Actions = T;
//#endregion
export { E as MakeupRecipeCard };
