import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Clock as r } from "lucide-react";
//#region components/primitives/CutoffBadge/CutoffBadge.tsx
function i(e) {
	return new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit",
		hour12: !0
	}).format(new Date(e));
}
function a({ cutoffAt: a, missed: o = !1, className: s, ...c }) {
	let l = i(a);
	return /* @__PURE__ */ n("span", {
		className: e("inline-flex items-center gap-1 text-xs leading-none", o ? "text-muted-foreground line-through" : "text-warning", s),
		...c,
		children: [/* @__PURE__ */ t(r, { className: "size-3 shrink-0" }), /* @__PURE__ */ n("span", { children: ["Order by ", l] })]
	});
}
//#endregion
export { a as CutoffBadge };
