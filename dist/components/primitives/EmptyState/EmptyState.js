"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Package as i } from "lucide-react";
//#region components/primitives/EmptyState/EmptyState.tsx
function a({ icon: a, heading: o, body: s, action: c, className: l, ...u }) {
	return /* @__PURE__ */ r("div", {
		className: e("flex flex-col items-center justify-center gap-3 md:gap-4", "px-4 py-8 md:py-12 text-center", l),
		...u,
		children: [
			/* @__PURE__ */ n("div", {
				className: "text-muted-foreground/50 [&_svg]:size-10 [&_svg]:md:size-12",
				children: a ?? /* @__PURE__ */ n(i, { "aria-hidden": !0 })
			}),
			/* @__PURE__ */ r("div", {
				className: "flex flex-col gap-1 md:gap-1.5 max-w-xs",
				children: [/* @__PURE__ */ n("p", {
					className: "text-sm md:text-base font-semibold text-foreground",
					children: o
				}), s && /* @__PURE__ */ n("p", {
					className: "text-xs md:text-sm text-muted-foreground leading-relaxed",
					children: s
				})]
			}),
			c && /* @__PURE__ */ n(t, {
				variant: "outline",
				onClick: c.onClick,
				className: "h-9 md:h-10 mt-1",
				children: c.label
			})
		]
	});
}
//#endregion
export { a as EmptyState };
