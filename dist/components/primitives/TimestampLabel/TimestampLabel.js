"use client";
import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { useMemo as n } from "react";
//#region components/primitives/TimestampLabel/TimestampLabel.tsx
function r(e) {
	let t = new Date(e), n = Date.now() - t.getTime(), r = Math.floor(n / 1e3);
	if (r < 60) return "just now";
	if (r < 3600) return `${Math.floor(r / 60)} min ago`;
	if (r < 86400) return `${Math.floor(r / 3600)} hr ago`;
	let i = {
		month: "short",
		day: "numeric"
	};
	return t.getFullYear() !== (/* @__PURE__ */ new Date()).getFullYear() && (i.year = "numeric"), new Intl.DateTimeFormat(void 0, i).format(t);
}
function i({ datetime: i, className: a, ...o }) {
	let s = n(() => r(i), [i]);
	return /* @__PURE__ */ t("time", {
		dateTime: i,
		className: e("text-muted-foreground text-xs md:text-sm", a),
		...o,
		children: s
	});
}
//#endregion
export { i as TimestampLabel };
