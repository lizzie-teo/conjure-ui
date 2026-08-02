"use client";
import { cn as e } from "../../../lib/utils.js";
import { PriceDisplay as t } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { Button as n } from "../../ui/button.js";
import { Tag as r } from "../../primitives/Tag/Tag.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useState as o } from "react";
//#region components/core/CartSummary/CartSummary.tsx
function s({ name: n, quantity: r, price: o, currency: s, className: c, ...l }) {
	return /* @__PURE__ */ a("div", {
		className: e("flex items-center justify-between gap-3 py-2.5 md:py-3", "border-b border-border last:border-0", c),
		...l,
		children: [/* @__PURE__ */ a("span", {
			className: "text-xs md:text-sm text-foreground truncate min-w-0",
			children: [n, r > 1 && /* @__PURE__ */ a("span", {
				className: "text-muted-foreground ml-1",
				children: ["× ", r]
			})]
		}), /* @__PURE__ */ i(t, {
			amount: o * r,
			currency: s,
			className: "shrink-0"
		})]
	});
}
function c({ subtotal: n, discount: r, total: o, currency: s, className: c, ...l }) {
	return /* @__PURE__ */ a("div", {
		className: e("border-t border-border px-4 md:px-5 py-3 md:py-4 space-y-2", c),
		...l,
		children: [
			/* @__PURE__ */ a("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ i("span", {
					className: "text-xs md:text-sm text-muted-foreground",
					children: "Subtotal"
				}), /* @__PURE__ */ i(t, {
					amount: n,
					currency: s
				})]
			}),
			r !== void 0 && r > 0 && /* @__PURE__ */ a("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ i("span", {
					className: "text-xs md:text-sm text-muted-foreground",
					children: "Discount"
				}), /* @__PURE__ */ a("span", {
					className: "text-xs md:text-sm font-medium text-success",
					children: ["−", new Intl.NumberFormat(void 0, {
						style: "currency",
						currency: s
					}).format(r)]
				})]
			}),
			/* @__PURE__ */ a("div", {
				className: "flex items-center justify-between pt-2 border-t border-border",
				children: [/* @__PURE__ */ i("span", {
					className: "text-sm md:text-base font-semibold text-foreground",
					children: "Total"
				}), /* @__PURE__ */ i(t, {
					amount: o,
					currency: s,
					className: "text-sm md:text-base [&_span:last-child]:font-semibold"
				})]
			})
		]
	});
}
function l({ onApply: t, appliedCode: s, className: c, ...l }) {
	let [u, d] = o("");
	return /* @__PURE__ */ a("div", {
		className: e("space-y-2", c),
		...l,
		children: [s && /* @__PURE__ */ a("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ i(r, { label: s }), /* @__PURE__ */ i("span", {
				className: "text-xs text-muted-foreground",
				children: "applied"
			})]
		}), /* @__PURE__ */ a("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ i("input", {
				type: "text",
				value: u,
				onChange: (e) => d(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && u.trim() && (t(u.trim()), d(""));
				},
				placeholder: "Promo code",
				"aria-label": "Promo code",
				className: e("flex-1 h-12 md:h-10 rounded-md border border-border bg-background", "px-3 text-sm text-foreground placeholder:text-muted-foreground", "outline-none focus:ring-2 focus:ring-ring focus:border-ring", "transition-shadow duration-150")
			}), /* @__PURE__ */ i(n, {
				variant: "outline",
				onClick: () => {
					u.trim() && (t(u.trim()), d(""));
				},
				disabled: !u.trim(),
				className: "h-12 md:h-10 px-4 shrink-0",
				children: "Apply"
			})]
		})]
	});
}
function u({ items: t, currency: r = "USD", promoCode: o, discount: c, onPromoApply: l, onCheckout: d, className: f, ...p }) {
	let m = t.reduce((e, t) => e + t.price * t.quantity, 0), h = m - (c ?? 0);
	return /* @__PURE__ */ a("div", {
		className: e("bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden", f),
		...p,
		children: [
			t.length > 0 ? /* @__PURE__ */ i("div", {
				className: "px-4 md:px-5 pt-3 md:pt-4",
				children: t.map((e, t) => /* @__PURE__ */ i(s, {
					name: e.name,
					quantity: e.quantity,
					price: e.price,
					currency: r
				}, t))
			}) : /* @__PURE__ */ i("div", {
				className: "px-4 md:px-5 pt-4 pb-2 text-sm text-muted-foreground text-center",
				children: "Your cart is empty"
			}),
			/* @__PURE__ */ i(u.Total, {
				subtotal: m,
				discount: c,
				total: h,
				currency: r
			}),
			l && /* @__PURE__ */ i("div", {
				className: "px-4 md:px-5 pb-3 md:pb-4",
				children: /* @__PURE__ */ i(u.PromoField, {
					onApply: l,
					appliedCode: o
				})
			}),
			/* @__PURE__ */ i("div", {
				className: "px-4 md:px-5 pb-4 md:pb-5",
				children: /* @__PURE__ */ i(n, {
					onClick: d,
					className: "w-full h-12 md:h-10",
					children: "Proceed to review"
				})
			})
		]
	});
}
u.LineItem = s, u.PromoField = l, u.Total = c;
//#endregion
export { u as CartSummary };
