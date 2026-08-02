import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { PencilLine as r } from "lucide-react";
//#region components/primitives/EditWindowNotice/EditWindowNotice.tsx
function i(e) {
	return new Intl.DateTimeFormat(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: !0
	}).format(new Date(e));
}
function a({ editableUntil: a, className: o, ...s }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2.5 md:py-3", o),
		...s,
		children: [/* @__PURE__ */ t(r, { className: "size-3.5 md:size-4 text-muted-foreground shrink-0 mt-0.5" }), /* @__PURE__ */ n("p", {
			className: "text-xs md:text-sm text-muted-foreground leading-snug",
			children: [
				"You can edit or cancel this order until",
				" ",
				/* @__PURE__ */ t("span", {
					className: "text-foreground font-medium",
					children: i(a)
				}),
				"."
			]
		})]
	});
}
//#endregion
export { a as EditWindowNotice };
