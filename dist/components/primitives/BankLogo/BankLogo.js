"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
//#region components/primitives/BankLogo/BankLogo.tsx
var n = {
	sm: "size-6 md:size-5",
	md: "size-9 md:size-8",
	lg: "size-12 md:size-11"
};
function r({ src: r, alt: i, size: a = "md", className: o, ...s }) {
	return /* @__PURE__ */ t("img", {
		src: r,
		alt: i,
		className: e("object-contain", n[a], o),
		draggable: !1,
		...s
	});
}
//#endregion
export { r as BankLogo };
