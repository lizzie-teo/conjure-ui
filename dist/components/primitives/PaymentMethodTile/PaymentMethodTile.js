"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Check as r, CreditCard as i, Landmark as a } from "lucide-react";
//#region components/primitives/PaymentMethodTile/PaymentMethodTile.tsx
function o() {
	return /* @__PURE__ */ n("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 56 22",
		className: "h-5 w-auto fill-current",
		children: [/* @__PURE__ */ t("path", { d: "M9.6 3.1c.62-.77 1.04-1.83.93-2.9a4.04 4.04 0 0 0-2.63 1.38A3.72 3.72 0 0 0 7 4.4c1.02.08 2.07-.52 2.6-1.3zM10.55 4.6c-1.44-.08-2.67.82-3.36.82-.69 0-1.74-.78-2.87-.76A4.23 4.23 0 0 0 .77 6.8C-.73 9.6.5 13.85 1.95 16.2c.72 1.07 1.59 2.25 2.73 2.21 1.08-.04 1.49-.7 2.8-.7 1.31 0 1.68.7 2.81.68 1.18-.02 1.93-.98 2.65-2.05.83-1.18 1.17-2.33 1.19-2.39a3.67 3.67 0 0 1-2.2-3.37 3.75 3.75 0 0 1 1.78-3.18 3.84 3.84 0 0 0-3.16-1.8z" }), /* @__PURE__ */ t("text", {
			x: "16",
			y: "15.5",
			fontSize: "12",
			fontFamily: "system-ui,-apple-system,sans-serif",
			fontWeight: "500",
			children: "Pay"
		})]
	});
}
function s() {
	return /* @__PURE__ */ n("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 56 22",
		className: "h-5 w-auto",
		children: [/* @__PURE__ */ t("text", {
			x: "0",
			y: "15.5",
			fontSize: "13",
			fontFamily: "system-ui,sans-serif",
			fontWeight: "700",
			fill: "#4285F4",
			children: "G"
		}), /* @__PURE__ */ t("text", {
			x: "13",
			y: "15.5",
			fontSize: "12",
			fontFamily: "system-ui,sans-serif",
			fontWeight: "500",
			fill: "currentColor",
			children: "Pay"
		})]
	});
}
var c = {
	card: /* @__PURE__ */ t(i, {
		className: "size-5",
		"aria-hidden": !0
	}),
	"apple-pay": /* @__PURE__ */ t(o, {}),
	"google-pay": /* @__PURE__ */ t(s, {}),
	bank: /* @__PURE__ */ t(a, {
		className: "size-5",
		"aria-hidden": !0
	})
};
function l({ type: i, label: a, networkLogoSrc: o, selected: s, onClick: l, className: u, ...d }) {
	let f = !!l, p = o && i === "card" ? /* @__PURE__ */ t("img", {
		src: o,
		alt: "",
		className: "h-6 md:h-5 w-auto object-contain",
		draggable: !1
	}) : c[i];
	return /* @__PURE__ */ n("div", {
		...d,
		role: f ? "button" : void 0,
		"aria-pressed": f ? s : void 0,
		tabIndex: f ? 0 : void 0,
		onClick: l,
		onKeyDown: f ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.currentTarget.click());
		} : void 0,
		className: e("flex items-center gap-3 px-4 py-3 md:py-2.5 rounded-[calc(var(--radius)+2px)] border transition-colors", "bg-card text-card-foreground", s ? "border-primary ring-2 ring-primary/20" : "border-border", f && "cursor-pointer hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", u),
		children: [
			/* @__PURE__ */ t("span", {
				className: "shrink-0 text-foreground",
				children: p
			}),
			/* @__PURE__ */ t("span", {
				className: "flex-1 min-w-0 text-sm md:text-base font-medium truncate",
				children: a
			}),
			s && /* @__PURE__ */ t("span", {
				className: "shrink-0 text-primary",
				children: /* @__PURE__ */ t(r, {
					className: "size-4",
					strokeWidth: 2.5,
					"aria-hidden": !0
				})
			})
		]
	});
}
//#endregion
export { l as PaymentMethodTile };
