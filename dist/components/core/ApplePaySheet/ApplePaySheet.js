"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { mergeRefs as n } from "../../../lib/merge-refs.js";
import { ConfirmIcon as r } from "../../primitives/Apple-objects/ConfirmIcon.js";
import { CreditCardGold as i } from "../../primitives/Apple-objects/CreditCardIcons.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { AnimatePresence as c, motion as l, useReducedMotion as u } from "motion/react";
import { useEffect as d, useId as f, useRef as p } from "react";
import { ChevronRight as m, X as h } from "lucide-react";
//#region components/core/ApplePaySheet/ApplePaySheet.tsx
function g({ className: e }) {
	return /* @__PURE__ */ s("svg", {
		"aria-hidden": !0,
		width: "36",
		height: "36",
		viewBox: "0 0 36 36",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		children: [/* @__PURE__ */ o("rect", {
			width: "36",
			height: "36",
			rx: "10",
			fill: "#767680",
			fillOpacity: "0.12"
		}), /* @__PURE__ */ o("path", {
			d: "M12.4302 25.4692C11.9875 25.4692 11.6388 25.3696 11.3843 25.1704C11.1353 24.9767 11.0107 24.7083 11.0107 24.3652C11.0107 23.8285 11.1712 23.2668 11.4922 22.6802C11.8132 22.0881 12.278 21.5347 12.8867 21.02C13.4954 20.4998 14.2287 20.0793 15.0864 19.7583C15.9497 19.4318 16.9181 19.2686 17.9917 19.2686C19.0708 19.2686 20.0392 19.4318 20.897 19.7583C21.7603 20.0793 22.4935 20.4998 23.0967 21.02C23.7054 21.5347 24.1702 22.0881 24.4912 22.6802C24.8177 23.2668 24.981 23.8285 24.981 24.3652C24.981 24.7083 24.8537 24.9767 24.5991 25.1704C24.3501 25.3696 24.0042 25.4692 23.5615 25.4692H12.4302ZM18 17.7827C17.4079 17.7827 16.86 17.6222 16.3564 17.3013C15.8529 16.9748 15.4461 16.5376 15.1362 15.9897C14.8319 15.4364 14.6797 14.8166 14.6797 14.1304C14.6797 13.4552 14.8319 12.8465 15.1362 12.3042C15.4461 11.7619 15.8529 11.333 16.3564 11.0176C16.86 10.7021 17.4079 10.5444 18 10.5444C18.5921 10.5444 19.14 10.6994 19.6436 11.0093C20.1471 11.3192 20.5511 11.7453 20.8555 12.2876C21.1654 12.8244 21.3203 13.4331 21.3203 14.1138C21.3203 14.8055 21.1654 15.4281 20.8555 15.9814C20.5511 16.5348 20.1471 16.9748 19.6436 17.3013C19.14 17.6222 18.5921 17.7827 18 17.7827Z",
			fill: "black"
		})]
	});
}
function _({ className: e }) {
	return /* @__PURE__ */ s("svg", {
		"aria-hidden": !0,
		width: "36",
		height: "36",
		viewBox: "0 0 36 36",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		children: [/* @__PURE__ */ o("rect", {
			width: "36",
			height: "36",
			rx: "10",
			fill: "#767680",
			fillOpacity: "0.12"
		}), /* @__PURE__ */ o("path", {
			d: "M14.8789 12.022C14.8789 11.4465 15.0173 10.9235 15.2939 10.4531C15.5762 9.97721 15.9525 9.59814 16.4229 9.31592C16.8932 9.03369 17.4162 8.89258 17.9917 8.89258C18.5728 8.89258 19.0985 9.03369 19.5688 9.31592C20.0392 9.59814 20.4128 9.97721 20.6895 10.4531C20.9717 10.9235 21.1128 11.4465 21.1128 12.022C21.1128 12.509 21.0104 12.96 20.8057 13.375C20.6009 13.79 20.3215 14.1442 19.9673 14.4375C19.6131 14.7308 19.2119 14.9328 18.7637 15.0435V22.7466C18.7637 23.3608 18.7388 23.9032 18.689 24.3735C18.6392 24.8439 18.5755 25.2396 18.498 25.5605C18.4261 25.8815 18.3431 26.1222 18.249 26.2827C18.1605 26.4487 18.0747 26.5317 17.9917 26.5317C17.9087 26.5317 17.8229 26.4487 17.7344 26.2827C17.6458 26.1167 17.5628 25.8732 17.4854 25.5522C17.4079 25.2313 17.3442 24.8356 17.2944 24.3652C17.2446 23.9004 17.2197 23.3608 17.2197 22.7466V15.0435C16.7715 14.9328 16.3703 14.7308 16.0161 14.4375C15.6619 14.1442 15.3825 13.79 15.1777 13.375C14.9785 12.96 14.8789 12.509 14.8789 12.022ZM17.0952 12.188C17.3885 12.188 17.6403 12.0828 17.8506 11.8726C18.0609 11.6567 18.166 11.4049 18.166 11.1172C18.166 10.8294 18.0609 10.5804 17.8506 10.3701C17.6403 10.1598 17.3885 10.0547 17.0952 10.0547C16.813 10.0547 16.564 10.1598 16.3481 10.3701C16.1379 10.5804 16.0327 10.8294 16.0327 11.1172C16.0327 11.4049 16.1379 11.6567 16.3481 11.8726C16.564 12.0828 16.813 12.188 17.0952 12.188Z",
			fill: "black"
		})]
	});
}
function v({ className: t }) {
	return /* @__PURE__ */ o("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 14 18",
		className: e("fill-current", t),
		children: /* @__PURE__ */ o("path", { d: "M9.6 3.1c.62-.77 1.04-1.83.93-2.9A4.04 4.04 0 0 0 7.9 1.58a3.72 3.72 0 0 0-.9 2.82c1.02.08 2.07-.52 2.6-1.3zM10.55 4.6c-1.44-.08-2.67.82-3.36.82-.69 0-1.74-.78-2.87-.76A4.23 4.23 0 0 0 .77 6.8C-.73 9.6.5 13.85 1.95 16.2c.72 1.07 1.59 2.25 2.73 2.21 1.08-.04 1.49-.7 2.8-.7 1.31 0 1.68.7 2.81.68 1.18-.02 1.93-.98 2.65-2.05.83-1.18 1.17-2.33 1.19-2.39a3.67 3.67 0 0 1-2.2-3.37 3.75 3.75 0 0 1 1.78-3.18 3.84 3.84 0 0 0-3.16-1.8z" })
	});
}
function y({ icon: t, lines: n, label: r, onClick: i, iconNoWrap: a, className: c }) {
	return /* @__PURE__ */ s("div", {
		role: i ? "button" : void 0,
		tabIndex: i ? 0 : void 0,
		onClick: i,
		onKeyDown: i ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i());
		} : void 0,
		className: e("flex items-start gap-3.5 px-4 py-3.5 rounded-3xl", "bg-card shadow-[var(--shadow-sm)]", i && "cursor-pointer hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", c),
		children: [
			a ? /* @__PURE__ */ o("div", {
				className: "shrink-0 flex items-center mt-0.5",
				children: t
			}) : /* @__PURE__ */ o("div", {
				className: "shrink-0 size-9 rounded-xl bg-muted flex items-center justify-center mt-0.5",
				children: t
			}),
			/* @__PURE__ */ s("div", {
				className: "flex-1 min-w-0 flex flex-col",
				children: [r && /* @__PURE__ */ o("span", {
					className: "text-xs text-muted-foreground leading-5",
					children: r
				}), n.filter(Boolean).map((t, n) => /* @__PURE__ */ o("span", {
					className: e("truncate leading-[1.35]", n === 0 && !r ? "text-sm font-medium text-foreground" : "text-sm text-foreground", n === 0 && r ? "text-sm font-medium text-foreground" : ""),
					children: t
				}, n))]
			}),
			i && /* @__PURE__ */ o(m, {
				className: "size-4 text-muted-foreground shrink-0 mt-1",
				"aria-hidden": !0
			})
		]
	});
}
function b({ loading: e, onClick: n }) {
	let i = u();
	return /* @__PURE__ */ s(t, {
		type: "button",
		variant: "ghost",
		onClick: e ? void 0 : n,
		disabled: e,
		"aria-label": e ? "Processing payment" : "Confirm payment with side button",
		className: "flex flex-col items-center gap-2.5 py-1 h-auto w-full rounded-lg",
		children: [/* @__PURE__ */ o(l.div, {
			"aria-hidden": !0,
			animate: e && !i ? { opacity: [
				1,
				.3,
				1
			] } : { opacity: 1 },
			transition: {
				duration: 1.2,
				repeat: Infinity,
				ease: "easeInOut"
			},
			children: /* @__PURE__ */ o(r, {})
		}), /* @__PURE__ */ o("span", {
			className: "text-xs md:text-sm font-medium text-foreground",
			children: e ? "Confirming…" : "Confirm with Side Button"
		})]
	});
}
function x(e, t) {
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: t
	}).format(e);
}
var S = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
function C({ open: r, onClose: C, onConfirm: w, merchantName: T, total: E, currency: D = "USD", paymentCard: O, contact: k, shippingAddress: A, onChangeCard: j, onChangeContact: M, onChangeShipping: N, cardIcon: P, loading: F = !1, className: I, ref: L, style: R, ...z }) {
	let B = u(), V = p(null), H = f();
	d(() => {
		if (!r) return;
		let e = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.body.style.overflow = e;
		};
	}, [r]), d(() => {
		if (!r) return;
		let e = (e) => {
			e.key === "Escape" && C();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [r, C]), d(() => {
		if (!r || !V.current) return;
		let e = V.current, t = () => Array.from(e.querySelectorAll(S));
		t()[0]?.focus();
		let n = (e) => {
			if (e.key !== "Tab") return;
			let n = t();
			if (!n.length) return;
			let r = n[0], i = n[n.length - 1];
			e.shiftKey && document.activeElement === r ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r.focus());
		};
		return e.addEventListener("keydown", n), () => e.removeEventListener("keydown", n);
	}, [r]);
	let U = {
		hidden: B ? { opacity: 0 } : {
			opacity: 0,
			y: "100%"
		},
		show: B ? { opacity: 1 } : {
			opacity: 1,
			y: "0%"
		},
		exit: B ? { opacity: 0 } : {
			opacity: 0,
			y: "100%"
		}
	};
	return /* @__PURE__ */ o(c, { children: r && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(l.div, {
		className: "fixed inset-0 z-40 bg-foreground/50",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: B ? .01 : .2,
			ease: [
				0,
				0,
				.2,
				1
			]
		},
		onClick: C,
		"aria-hidden": !0
	}, "applepay-backdrop"), /* @__PURE__ */ s(l.div, {
		...z,
		ref: n(V, L),
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": H,
		style: {
			fontFamily: "var(--font-apple)",
			...R
		},
		className: e("fixed inset-x-0 bottom-0 z-50", "flex flex-col", "bg-card/80 backdrop-blur-2xl", "rounded-t-[2rem] md:rounded-t-[2.5rem]", "shadow-[var(--shadow-elevated)]", "md:max-w-md md:mx-auto md:inset-x-auto md:left-1/2 md:-translate-x-1/2", "w-full", I),
		variants: U,
		initial: "hidden",
		animate: "show",
		exit: "exit",
		transition: {
			duration: B ? .01 : .32,
			ease: [
				.32,
				.72,
				0,
				1
			]
		},
		children: [
			/* @__PURE__ */ o("div", {
				className: "flex justify-center pt-3 pb-0 shrink-0",
				"aria-hidden": !0,
				children: /* @__PURE__ */ o("div", { className: "w-9 h-1 rounded-full bg-border" })
			}),
			/* @__PURE__ */ s("div", {
				className: "flex items-start justify-between px-4 pt-3.5 pb-1 shrink-0",
				children: [/* @__PURE__ */ s("h2", {
					id: H,
					className: "flex items-center gap-1 text-[25px] leading-normal font-medium text-foreground",
					children: [/* @__PURE__ */ o(v, { className: "size-[18px] -mt-px" }), "Pay"]
				}), /* @__PURE__ */ o(t, {
					variant: "ghost",
					size: "icon",
					onClick: C,
					"aria-label": "Close Apple Pay",
					className: "size-10 rounded-full bg-[var(--apple-fills-tertiary)] hover:bg-[var(--apple-fills-tertiary-hover)] dark:mix-blend-plus-lighter focus-visible:ring-0 focus-visible:outline-none shrink-0",
					children: /* @__PURE__ */ o(h, {
						className: "size-6 text-[var(--apple-labels-vibrant-secondary)] dark:mix-blend-plus-lighter",
						strokeWidth: 2,
						"aria-hidden": !0
					})
				})]
			}),
			/* @__PURE__ */ s("div", {
				className: "flex flex-col gap-3 px-4 pb-4 overflow-y-auto",
				children: [
					/* @__PURE__ */ o(y, {
						icon: P ?? /* @__PURE__ */ o(i, {}),
						iconNoWrap: !0,
						lines: [
							O.name,
							`•••• ${O.lastFour}`,
							O.billingAddress
						],
						onClick: j
					}),
					/* @__PURE__ */ o(y, {
						icon: /* @__PURE__ */ o(g, {}),
						iconNoWrap: !0,
						label: "Contact",
						lines: [k.email, k.phone],
						onClick: M
					}),
					/* @__PURE__ */ o(y, {
						icon: /* @__PURE__ */ o(_, {}),
						iconNoWrap: !0,
						label: "Ship to",
						lines: [
							A.recipientName,
							A.line1,
							A.line2,
							A.country
						],
						onClick: N
					})
				]
			}),
			/* @__PURE__ */ s("div", {
				className: "relative shrink-0",
				children: [/* @__PURE__ */ o("div", {
					"aria-hidden": !0,
					className: "absolute inset-x-0 -top-8 h-8 pointer-events-none",
					style: { background: "linear-gradient(to bottom, transparent, var(--card))" }
				}), /* @__PURE__ */ s("div", {
					className: "flex flex-col gap-3 px-4 pt-2 pb-6 md:pb-8 bg-card",
					children: [/* @__PURE__ */ s("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ s("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ s("span", {
								className: "text-xs text-muted-foreground leading-5",
								children: ["Pay ", T]
							}), /* @__PURE__ */ o("span", {
								className: "text-3xl font-semibold text-foreground tracking-tight leading-tight",
								children: x(E, D)
							})]
						}), /* @__PURE__ */ o(m, {
							className: "size-5 text-muted-foreground mb-1",
							"aria-hidden": !0
						})]
					}), /* @__PURE__ */ o(b, {
						loading: F,
						onClick: w
					})]
				})]
			})
		]
	}, "applepay-sheet")] }) });
}
//#endregion
export { C as ApplePaySheet };
