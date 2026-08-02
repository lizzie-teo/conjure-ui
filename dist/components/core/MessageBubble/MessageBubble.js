"use client";
import { cn as e } from "../../../lib/utils.js";
import { EntityAvatar as t } from "../../primitives/EntityAvatar/EntityAvatar.js";
import { TimestampLabel as n } from "../../primitives/TimestampLabel/TimestampLabel.js";
import { Button as r } from "../../ui/button.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { AnimatePresence as o, motion as s, useReducedMotion as c } from "motion/react";
import { createContext as l, useContext as u, useState as d } from "react";
import { ThumbsDown as f, ThumbsUp as p } from "lucide-react";
//#region components/core/MessageBubble/MessageBubble.tsx
var m = l({
	role: "assistant",
	grouped: !1,
	isGenerating: !1
}), h = [
	0,
	0,
	.2,
	1
], g = {
	hidden: {},
	show: { transition: { staggerChildren: .05 } }
}, _ = {
	hidden: {
		opacity: 0,
		y: 4
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .18,
			ease: h
		}
	}
}, v = [
	{
		angle: -90,
		distance: 38
	},
	{
		angle: -45,
		distance: 35
	},
	{
		angle: 0,
		distance: 42
	},
	{
		angle: 45,
		distance: 36
	},
	{
		angle: 135,
		distance: 40
	},
	{
		angle: 200,
		distance: 37
	},
	{
		angle: 260,
		distance: 35
	}
];
function y({ children: t, words: n, className: r }) {
	let { role: a } = u(m), o = c(), l = a === "user", d = !l && n && n.length > 0;
	return /* @__PURE__ */ i("div", {
		className: e("max-w-[75%] md:max-w-sm rounded-2xl px-4 py-3 md:px-5 md:py-3.5 text-sm md:text-base leading-relaxed", l ? "bg-primary text-primary-foreground" : "bg-muted text-foreground shadow-[var(--shadow-bubble)]", r),
		children: d ? o ? /* @__PURE__ */ i("span", { children: n.map((e, t) => /* @__PURE__ */ i("span", {
			className: "inline-block mr-[0.25em]",
			children: e
		}, t)) }) : /* @__PURE__ */ i(s.span, {
			variants: g,
			initial: "hidden",
			animate: "show",
			className: "inline",
			children: n.map((e, t) => /* @__PURE__ */ i(s.span, {
				variants: _,
				className: "inline-block mr-[0.25em]",
				children: e
			}, `${e}-${t}`))
		}) : t
	});
}
function b({ size: e = "sm", ...n }) {
	let { role: r, grouped: a, isGenerating: o } = u(m);
	return r === "user" || a ? null : /* @__PURE__ */ i(t, {
		size: e,
		isGenerating: o,
		...n
	});
}
function x({ datetime: t, className: r }) {
	return /* @__PURE__ */ i(n, {
		datetime: t,
		className: e("text-xs mt-0.5 opacity-60", r)
	});
}
function S({ onThumbsUp: t, onThumbsDown: n, className: l }) {
	let [u, m] = d(!1), [h, g] = d(!1), _ = c();
	function y() {
		m(!0), t?.(), setTimeout(() => m(!1), 700);
	}
	function b() {
		g(!0), n?.(), setTimeout(() => g(!1), 400);
	}
	return /* @__PURE__ */ a("div", {
		className: e("flex gap-0.5 mt-0.5", l),
		role: "group",
		"aria-label": "Message feedback",
		children: [/* @__PURE__ */ a("div", {
			className: "relative inline-flex",
			children: [/* @__PURE__ */ i(o, { children: u && !_ && v.map((e, t) => {
				let n = e.angle * Math.PI / 180;
				return /* @__PURE__ */ i(s.span, {
					"aria-hidden": "true",
					className: "absolute inset-0 m-auto pointer-events-none flex items-center justify-center text-xs leading-none",
					style: {
						width: 0,
						height: 0
					},
					initial: {
						opacity: 1,
						x: 0,
						y: 0,
						scale: 1
					},
					animate: {
						opacity: 0,
						x: Math.cos(n) * e.distance,
						y: Math.sin(n) * e.distance,
						scale: .6
					},
					exit: {},
					transition: {
						duration: .6,
						type: "spring",
						stiffness: 200,
						damping: 20
					},
					children: "✨"
				}, t);
			}) }), /* @__PURE__ */ i(r, {
				variant: "ghost",
				size: "icon",
				className: "size-7 text-muted-foreground hover:text-foreground",
				onClick: y,
				"aria-label": "Helpful",
				children: /* @__PURE__ */ i(p, { size: 13 })
			})]
		}), /* @__PURE__ */ i(s.div, {
			animate: !_ && h ? { x: [
				0,
				-4,
				4,
				-3,
				3,
				0
			] } : {},
			transition: {
				duration: .35,
				ease: "easeInOut"
			},
			children: /* @__PURE__ */ i(r, {
				variant: "ghost",
				size: "icon",
				className: "size-7 text-muted-foreground hover:text-foreground",
				onClick: b,
				"aria-label": "Not helpful",
				children: /* @__PURE__ */ i(f, { size: 13 })
			})
		})]
	});
}
function C({ role: t, grouped: n = !1, isGenerating: r = !1, isReferenced: l = !1, className: u, children: d, ...f }) {
	let p = c(), g = t === "user";
	return /* @__PURE__ */ i(m.Provider, {
		value: {
			role: t,
			grouped: n,
			isGenerating: r
		},
		children: /* @__PURE__ */ a(s.div, {
			initial: g ? {
				opacity: 0,
				x: p ? 0 : 20,
				scaleX: p ? 1 : .96
			} : {
				opacity: 0,
				y: p ? 0 : 8,
				scale: p ? 1 : .97
			},
			animate: g ? {
				opacity: 1,
				x: 0,
				scaleX: 1
			} : {
				opacity: 1,
				y: 0,
				scale: 1
			},
			transition: g ? {
				opacity: {
					duration: .15,
					ease: h
				},
				x: {
					type: "spring",
					stiffness: 380,
					damping: 26
				},
				scaleX: {
					type: "spring",
					stiffness: 280,
					damping: 22
				}
			} : {
				duration: .2,
				ease: h
			},
			className: e("relative flex w-full gap-2 md:gap-3", g ? "flex-row-reverse items-end" : "flex-col items-start", u),
			...f,
			children: [/* @__PURE__ */ i(o, { children: l && /* @__PURE__ */ i(s.div, {
				"aria-hidden": "true",
				className: "absolute inset-0 rounded-2xl bg-primary/10 pointer-events-none",
				initial: { opacity: 1 },
				animate: { opacity: 1 },
				exit: {
					opacity: 0,
					transition: {
						duration: 1.2,
						ease: "easeOut"
					}
				}
			}, "glow") }), d]
		})
	});
}
C.Content = y, C.Avatar = b, C.Timestamp = x, C.FeedbackRow = S;
//#endregion
export { C as MessageBubble };
