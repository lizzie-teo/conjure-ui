"use client";
import { cn as e } from "../../../lib/utils.js";
import { StatusBadge as t } from "../../primitives/StatusBadge/StatusBadge.js";
import { PriceDisplay as n } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { EntityAvatar as r } from "../../primitives/EntityAvatar/EntityAvatar.js";
import { MessageBubble as i } from "../../core/MessageBubble/MessageBubble.js";
import { ChatInput as a } from "../../core/ChatInput/ChatInput.js";
import { QuickReplies as o } from "../../core/QuickReplies/QuickReplies.js";
import { MediaCard as s } from "../../core/MediaCard/MediaCard.js";
import { ActionStrip as c } from "../../core/ActionStrip/ActionStrip.js";
import { VERTICAL_MOCK as l } from "./mockData.js";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { AnimatePresence as f, motion as p, useReducedMotion as m } from "motion/react";
import { useCallback as h, useEffect as g, useRef as _, useState as v } from "react";
//#region components/layouts/ChatWidget/ChatWidget.tsx
function y(e, t) {
	let n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
	return {
		x: r.left - n.left + r.width / 2,
		y: r.top - n.top + t.scrollTop + r.height / 2
	};
}
function b({ vertical: b = "grocery", mockData: S, onAddToCart: C, onSuggestSubstitution: w, onEscalateToHuman: T, className: E }) {
	let D = S ?? l[b], O = _(null), k = _(null), A = _(/* @__PURE__ */ new Map()), j = m(), [M, N] = v(null), [P, F] = v(null), [I, L] = v(!1), R = h((e, t) => {
		t ? A.current.set(e, t) : A.current.delete(e);
	}, []);
	g(() => {
		let e = D.messages.find((e) => e.referencedId);
		if (!e?.referencedId || !e.id) return;
		let t = setTimeout(() => {
			let t = e.referencedId, n = e.id;
			if (N(t), !j) {
				let e = k.current, r = A.current.get(t), i = A.current.get(n);
				if (e && r && i) {
					let t = y(r, e), n = y(i, e);
					F({
						fromX: t.x,
						fromY: t.y,
						toX: n.x,
						toY: n.y,
						height: e.scrollHeight
					}), L(!0);
				}
			}
			setTimeout(() => {
				N(null), L(!1), setTimeout(() => F(null), 350);
			}, 1400);
		}, 800);
		return () => clearTimeout(t);
	}, []), g(() => {
		O.current?.scrollIntoView({ behavior: "instant" });
	}, []);
	let z = D.messages.length;
	return /* @__PURE__ */ d("div", {
		className: e("flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-card)]", E),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 border-b border-border bg-card shrink-0",
				children: [/* @__PURE__ */ u(r, {
					fallback: D.botName ?? "Assistant",
					src: D.avatar,
					size: "sm"
				}), /* @__PURE__ */ u("span", {
					className: "text-sm md:text-base font-medium text-foreground",
					children: D.botName ?? "Assistant"
				})]
			}),
			/* @__PURE__ */ d("div", {
				ref: k,
				className: "relative flex-1 overflow-y-auto min-h-0 px-4 md:px-5 py-4 md:py-5 flex flex-col gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ u(f, { children: P && /* @__PURE__ */ u("svg", {
						"aria-hidden": "true",
						className: "absolute inset-0 w-full pointer-events-none",
						style: { height: P.height },
						overflow: "visible",
						children: /* @__PURE__ */ u(p.path, {
							d: x(P),
							stroke: "var(--primary)",
							strokeWidth: 1.5,
							strokeOpacity: .35,
							fill: "none",
							strokeLinecap: "round",
							initial: {
								pathLength: 0,
								opacity: 0
							},
							animate: I ? {
								pathLength: 1,
								opacity: 1
							} : {
								pathLength: 1,
								opacity: 0
							},
							exit: {
								opacity: 0,
								transition: { duration: .3 }
							},
							transition: {
								pathLength: {
									duration: .55,
									ease: [
										0,
										0,
										.2,
										1
									]
								},
								opacity: { duration: .15 }
							}
						}, `${P.fromX}-${P.toX}`)
					}) }),
					D.messages.map((e, r) => {
						let a = z - 1 - r, l = a === 0, f = e.role === "bot" && !l ? Math.max(.6, 1 - a * .04) : 1;
						return /* @__PURE__ */ d("div", {
							ref: e.id ? (t) => R(e.id, t) : void 0,
							className: "flex flex-col gap-2 transition-opacity duration-200 hover:opacity-100",
							style: { opacity: f },
							children: [
								/* @__PURE__ */ u(i, {
									role: e.role === "bot" ? "assistant" : "user",
									isReferenced: !!e.id && e.id === M,
									children: e.text && /* @__PURE__ */ u(i.Content, { children: e.text })
								}),
								e.richContent && /* @__PURE__ */ u("div", {
									className: "w-full",
									children: e.richContent
								}),
								e.products && /* @__PURE__ */ u("div", {
									className: "flex gap-3 overflow-x-auto pb-1 scrollbar-none",
									children: e.products.map((e, r) => /* @__PURE__ */ u("div", {
										className: "w-52 md:w-60 shrink-0",
										children: /* @__PURE__ */ d(s, { children: [
											e.image && /* @__PURE__ */ u(s.Media, {
												src: e.image,
												alt: e.name
											}),
											/* @__PURE__ */ d(s.Body, { children: [
												/* @__PURE__ */ d("div", {
													className: "flex items-start justify-between gap-2",
													children: [/* @__PURE__ */ u(s.Title, { children: e.name }), e.badge && /* @__PURE__ */ u(s.Badge, { children: /* @__PURE__ */ u(t, {
														label: e.badge,
														variant: e.badgeVariant ?? "default"
													}) })]
												}),
												e.subtitle && /* @__PURE__ */ u(s.Subtitle, { children: e.subtitle }),
												/* @__PURE__ */ u(s.Meta, { children: /* @__PURE__ */ u(n, {
													amount: e.price,
													currency: "AUD"
												}) })
											] }),
											(e.primaryAction || e.secondaryAction) && /* @__PURE__ */ d(c, { children: [e.primaryAction && /* @__PURE__ */ u(c.Primary, {
												onClick: () => C?.(e),
												children: e.primaryAction
											}), e.secondaryAction && /* @__PURE__ */ u(c.Secondary, {
												onClick: () => w?.(e),
												children: e.secondaryAction
											})] })
										] })
									}, r))
								}),
								e.quickReplies && e.role === "bot" && /* @__PURE__ */ u("div", { children: /* @__PURE__ */ u(o, {
									options: e.quickReplies,
									onSelect: (e) => {
										/pharmacist/i.test(e) && T?.({ messages: D.messages });
									}
								}) })
							]
						}, r);
					}),
					/* @__PURE__ */ u("div", { ref: O })
				]
			}),
			/* @__PURE__ */ u("div", {
				className: "border-t border-border px-4 md:px-5 py-3 md:py-4 shrink-0",
				children: /* @__PURE__ */ d(a, {
					onSend: () => {},
					children: [/* @__PURE__ */ u(a.Field, {}), /* @__PURE__ */ u(a.Send, {})]
				})
			})
		]
	});
}
function x({ fromX: e, fromY: t, toX: n, toY: r }) {
	return `M ${e} ${t} Q ${(e + n) / 2} ${(t + r) / 2 - Math.abs(r - t) * .35} ${n} ${r}`;
}
//#endregion
export { b as ChatWidget };
