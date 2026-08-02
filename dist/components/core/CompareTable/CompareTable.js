"use client";
import { cn as e } from "../../../lib/utils.js";
import { PriceDisplay as t } from "../../primitives/PriceDisplay/PriceDisplay.js";
import { Button as n } from "../../ui/button.js";
import { Tag as r } from "../../primitives/Tag/Tag.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Check as o, Minus as s } from "lucide-react";
//#region components/core/CompareTable/CompareTable.tsx
var c = (e, t) => Object.keys(t).filter((t) => e.some((e) => t in e.attributes));
function l({ value: e }) {
	return typeof e == "boolean" ? e ? /* @__PURE__ */ i("span", {
		className: "inline-flex items-center justify-center text-success",
		children: /* @__PURE__ */ i(o, {
			className: "size-4 md:size-5",
			strokeWidth: 2.5,
			"aria-label": "Yes"
		})
	}) : /* @__PURE__ */ i("span", {
		className: "inline-flex items-center justify-center text-muted-foreground/40",
		children: /* @__PURE__ */ i(s, {
			className: "size-4 md:size-5",
			"aria-label": "No"
		})
	}) : /* @__PURE__ */ i(r, { label: e });
}
function u({ columns: r, attributeLabels: o, onSelect: s, className: u }) {
	let d = c(r, o);
	return r.length, /* @__PURE__ */ i("div", {
		className: e("w-full overflow-x-auto", u),
		children: /* @__PURE__ */ a("table", {
			className: "w-full border-collapse text-sm md:text-base",
			children: [/* @__PURE__ */ i("thead", { children: /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
				scope: "col",
				className: "sticky left-0 z-10 bg-background w-28 md:w-36 min-w-[7rem] md:min-w-[9rem] text-left p-3 md:p-4 border-b border-border text-muted-foreground font-medium text-xs md:text-sm"
			}), r.map((n) => /* @__PURE__ */ i("th", {
				scope: "col",
				className: e("min-w-[9rem] md:min-w-[11rem] p-3 md:p-4 text-center border-b border-border", "group transition-colors hover:bg-accent/40 focus-within:bg-accent/40"),
				children: /* @__PURE__ */ a("div", {
					className: "flex flex-col items-center gap-2 md:gap-3",
					children: [
						n.image && /* @__PURE__ */ i("img", {
							src: n.image,
							alt: "",
							className: "size-12 md:size-16 object-contain rounded-[var(--radius)]"
						}),
						/* @__PURE__ */ i("span", {
							className: "font-semibold text-foreground leading-snug",
							children: n.label
						}),
						/* @__PURE__ */ i(t, {
							amount: n.price,
							currency: n.currency ?? "USD"
						})
					]
				})
			}, n.id))] }) }), /* @__PURE__ */ a("tbody", { children: [d.map((t, n) => /* @__PURE__ */ a("tr", {
				className: e(n % 2 == 0 ? "bg-background" : "bg-muted/30"),
				children: [/* @__PURE__ */ i("td", {
					className: e("sticky left-0 z-10 p-3 md:p-4 border-b border-border", "text-xs md:text-sm font-medium text-muted-foreground", n % 2 == 0 ? "bg-background" : "bg-muted/30"),
					children: o[t]
				}), r.map((e) => /* @__PURE__ */ i("td", {
					className: "p-3 md:p-4 border-b border-border text-center transition-colors hover:bg-accent/40",
					children: t in e.attributes ? /* @__PURE__ */ i("div", {
						className: "flex items-center justify-center",
						children: /* @__PURE__ */ i(l, { value: e.attributes[t] })
					}) : /* @__PURE__ */ i("span", {
						className: "text-muted-foreground/40",
						children: "—"
					})
				}, e.id))]
			}, t)), s && /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("td", { className: "sticky left-0 z-10 bg-background p-3 md:p-4" }), r.map((e) => /* @__PURE__ */ i("td", {
				className: "p-3 md:p-4 text-center",
				children: /* @__PURE__ */ i(n, {
					onClick: () => s(e.id),
					className: "h-9 md:h-10 w-full",
					size: "sm",
					children: "Add to cart"
				})
			}, e.id))] })] })]
		})
	});
}
//#endregion
export { u as CompareTable };
