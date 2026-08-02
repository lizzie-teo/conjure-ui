"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
//#region components/primitives/payment-logos/PaymentLogo.tsx
var n = {
	sm: "h-5 md:h-4",
	md: "h-8 md:h-7",
	lg: "h-10 md:h-9"
};
function r({ src: r, alt: i, size: a = "md", className: o, ...s }) {
	return /* @__PURE__ */ t("img", {
		src: r,
		alt: i,
		className: e("w-auto object-contain", n[a], o),
		draggable: !1,
		...s
	});
}
//#endregion
export { r as PaymentLogo };
