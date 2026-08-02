import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region components/primitives/AvailabilityDot/AvailabilityDot.tsx
var r = {
	available: "text-success",
	limited: "text-warning",
	unavailable: "text-muted-foreground/50"
}, i = {
	available: "text-foreground",
	limited: "text-foreground",
	unavailable: "text-muted-foreground"
}, a = {
	available: "Available",
	limited: "Limited availability",
	unavailable: "Unavailable"
};
function o({ className: e }) {
	return /* @__PURE__ */ t("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 10 10",
		fill: "none",
		"aria-hidden": "true",
		className: e,
		children: /* @__PURE__ */ t("circle", {
			cx: "5",
			cy: "5",
			r: "4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		})
	});
}
function s({ className: e }) {
	return /* @__PURE__ */ n("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 10 10",
		"aria-hidden": "true",
		className: e,
		children: [/* @__PURE__ */ t("path", {
			d: "M 5 1 A 4 4 0 0 1 5 9 Z",
			fill: "currentColor"
		}), /* @__PURE__ */ t("circle", {
			cx: "5",
			cy: "5",
			r: "4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			fill: "none"
		})]
	});
}
function c({ className: e }) {
	return /* @__PURE__ */ n("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 10 10",
		fill: "none",
		"aria-hidden": "true",
		className: e,
		children: [/* @__PURE__ */ t("circle", {
			cx: "5",
			cy: "5",
			r: "4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ t("line", {
			x1: "2.17",
			y1: "2.17",
			x2: "7.83",
			y2: "7.83",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
}
var l = {
	available: o,
	limited: s,
	unavailable: c
};
function u({ level: o, showLabel: s = !1, className: c, "aria-hidden": u, ...d }) {
	let f = l[o];
	return /* @__PURE__ */ n("span", {
		className: e("inline-flex items-center gap-1.5", c),
		"aria-label": u ? void 0 : a[o],
		"aria-hidden": u,
		...d,
		children: [/* @__PURE__ */ t(f, { className: r[o] }), s && /* @__PURE__ */ t("span", {
			className: e("text-xs", i[o]),
			children: a[o]
		})]
	});
}
//#endregion
export { u as AvailabilityDot, r as availabilityColorClasses, i as availabilityLabelColorClasses };
