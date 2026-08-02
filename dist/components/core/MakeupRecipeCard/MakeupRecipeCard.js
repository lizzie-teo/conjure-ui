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
function y({ className: t, ...n }) {
	let { recipe: i } = f();
	return /* @__PURE__ */ r("div", {
		className: e("flex h-2 overflow-hidden", t),
		...n,
		children: i.products.map((e) => /* @__PURE__ */ r("div", {
			className: "flex-1",
			style: { backgroundColor: e.swatch.hex }
		}, e.id))
	});
}
function b({ className: t, ...n }) {
	let { recipe: a } = f(), o = [...a.products.filter((e) => e.isFocalPoint && e.image), ...a.products.filter((e) => !e.isFocalPoint && e.image)];
	if (o.length === 0) return /* @__PURE__ */ r(y, {
		className: t,
		...n
	});
	let [s, ...c] = o;
	return o.length === 1 ? /* @__PURE__ */ r("div", {
		className: e("h-40 md:h-44 overflow-hidden", t),
		...n,
		children: /* @__PURE__ */ r("img", {
			src: s.image,
			alt: s.imageAlt ?? s.shade,
			className: "w-full h-full object-cover"
		})
	}) : o.length === 2 ? /* @__PURE__ */ i("div", {
		className: e("flex h-40 md:h-44 overflow-hidden gap-px bg-border", t),
		...n,
		children: [/* @__PURE__ */ r("img", {
			src: s.image,
			alt: s.imageAlt ?? s.shade,
			className: "flex-1 h-full object-cover min-w-0"
		}), /* @__PURE__ */ r("img", {
			src: c[0].image,
			alt: c[0].imageAlt ?? c[0].shade,
			className: "flex-1 h-full object-cover min-w-0"
		})]
	}) : /* @__PURE__ */ i("div", {
		className: e("flex h-40 md:h-44 overflow-hidden gap-px bg-border", t),
		...n,
		children: [/* @__PURE__ */ r("img", {
			src: s.image,
			alt: s.imageAlt ?? s.shade,
			className: "w-2/3 h-full object-cover shrink-0"
		}), /* @__PURE__ */ r("div", {
			className: "flex flex-col flex-1 gap-px min-w-0",
			children: c.slice(0, 2).map((e) => /* @__PURE__ */ r("img", {
				src: e.image,
				alt: e.imageAlt ?? e.shade,
				className: "flex-1 w-full object-cover"
			}, e.id))
		})]
	});
}
function x({ className: t, ...c }) {
	let { recipe: l } = f(), d = s(), [p, m] = u(0), [h, g] = u(0), _ = [...l.products.filter((e) => e.isFocalPoint && e.image), ...l.products.filter((e) => !e.isFocalPoint && e.image)];
	if (_.length === 0) return /* @__PURE__ */ r(y, {
		className: t,
		...c
	});
	if (_.length === 1) return /* @__PURE__ */ r("div", {
		className: e("h-40 md:h-44 overflow-hidden", t),
		...c,
		children: /* @__PURE__ */ r("img", {
			src: _[0].image,
			alt: _[0].imageAlt ?? _[0].shade,
			className: "w-full h-full object-cover"
		})
	});
	let v = (e) => {
		g(e), m((t) => (t + e + _.length) % _.length);
	}, b = {
		enter: (e) => ({ x: e > 0 ? "100%" : "-100%" }),
		center: { x: 0 },
		exit: (e) => ({ x: e > 0 ? "-100%" : "100%" })
	};
	return /* @__PURE__ */ i("div", {
		className: e("relative h-40 md:h-44 overflow-hidden bg-muted", t),
		...c,
		children: [
			/* @__PURE__ */ r(a, {
				initial: !1,
				custom: h,
				children: /* @__PURE__ */ r(o.img, {
					custom: h,
					variants: b,
					initial: "enter",
					animate: "center",
					exit: "exit",
					transition: {
						duration: d ? .01 : .3,
						ease: [
							0,
							0,
							.2,
							1
						]
					},
					src: _[p].image,
					alt: _[p].imageAlt ?? _[p].shade,
					className: "absolute inset-0 w-full h-full object-cover",
					drag: "x",
					dragConstraints: {
						left: 0,
						right: 0
					},
					dragElastic: .15,
					onDragEnd: (e, t) => {
						t.offset.x < -40 ? v(1) : t.offset.x > 40 && v(-1);
					}
				}, p)
			}),
			/* @__PURE__ */ r("div", { className: "absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" }),
			/* @__PURE__ */ r("div", {
				className: "absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5",
				children: _.map((t, i) => /* @__PURE__ */ r(n, {
					variant: "ghost",
					"aria-label": `View ${_[i].label}`,
					onClick: () => {
						g(i > p ? 1 : -1), m(i);
					},
					className: e("p-0 min-w-0 h-auto rounded-full transition-all duration-200 hover:bg-transparent", i === p ? "size-2 bg-white" : "size-1.5 bg-white/50 hover:bg-white/70")
				}, i))
			})
		]
	});
}
function S({ className: e, ...t }) {
	let { hero: n } = f();
	return r(n === "carousel" ? x : b, {
		className: e,
		...t
	});
}
function C({ className: n, ...a }) {
	let { recipe: o } = f();
	return /* @__PURE__ */ i("div", {
		className: e("px-4 md:px-5 pt-4 md:pt-5 pb-3 md:pb-4", n),
		...a,
		children: [
			/* @__PURE__ */ i("div", {
				className: "flex items-center gap-2 mb-3 flex-wrap",
				children: [/* @__PURE__ */ r(t, {
					label: m[o.occasion],
					variant: p[o.occasion]
				}), o.format === "palette" && /* @__PURE__ */ r(t, {
					label: "Palette",
					variant: "default"
				})]
			}),
			/* @__PURE__ */ r("h3", {
				className: "text-base md:text-lg font-semibold text-foreground leading-snug mb-2",
				children: o.lookName
			}),
			/* @__PURE__ */ r("p", {
				className: "text-sm md:text-base text-foreground leading-relaxed",
				children: o.story.harmony
			}),
			/* @__PURE__ */ r("p", {
				className: "text-sm md:text-base text-muted-foreground leading-relaxed mt-1",
				children: o.story.skinTone
			})
		]
	});
}
function w({ className: a, ...c }) {
	let { recipe: l, onProductClick: u } = f(), d = s();
	return /* @__PURE__ */ r(o.ul, {
		role: "list",
		variants: g,
		initial: "hidden",
		animate: "show",
		className: e("flex flex-col gap-2 md:gap-2.5 list-none p-0 m-0", a),
		...c,
		children: l.products.map((a) => /* @__PURE__ */ r(o.li, {
			variants: d ? v : _,
			children: /* @__PURE__ */ i(n, {
				variant: "ghost",
				"aria-label": `${a.label}, ${a.shade}${a.isFocalPoint ? ", featured colour" : ""}`,
				onClick: () => u?.(a),
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
function T({ className: t, ...a }) {
	let { recipe: o, onAddToCart: s, onSave: c } = f(), l = o.products.length;
	return /* @__PURE__ */ i("div", {
		className: e("flex flex-col gap-2 md:gap-3", t),
		...a,
		children: [s && /* @__PURE__ */ i(n, {
			variant: "default",
			className: "w-full h-12 md:h-10",
			onClick: () => s(o.products),
			children: [
				"Add ",
				l,
				" product",
				l === 1 ? "" : "s",
				" to cart"
			]
		}), c && /* @__PURE__ */ r(n, {
			variant: "ghost",
			className: "w-full h-12 md:h-10 text-muted-foreground",
			onClick: () => c(o),
			children: "Save this look"
		})]
	});
}
function E({ recipe: t, hero: n = "collage", onProductClick: a, onAddToCart: c, onSave: l, className: u, ...f }) {
	let p = s();
	return /* @__PURE__ */ r(d.Provider, {
		value: {
			recipe: t,
			hero: n,
			onProductClick: a,
			onAddToCart: c,
			onSave: l
		},
		children: /* @__PURE__ */ i(o.div, {
			initial: p ? { opacity: 0 } : {
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
			...f,
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
