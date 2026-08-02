"use client";
import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { useId as r } from "react";
//#region components/primitives/Apple-objects/CreditCardIcons.tsx
var i = /* @__PURE__ */ n(e, { children: [
	/* @__PURE__ */ t("path", {
		d: "M31 16.7676C31.6127 17.3168 32 18.1124 32 19C32 19.8874 31.6124 20.6822 31 21.2314C30.3876 20.6822 30 19.8874 30 19C30 18.1124 30.3873 17.3168 31 16.7676Z",
		fill: "#FF6002"
	}),
	/* @__PURE__ */ t("path", {
		d: "M29 16C29.7692 16 30.469 16.2916 31 16.7676C30.3873 17.3168 30 18.1124 30 19C30 19.8874 30.3876 20.6822 31 21.2314C30.469 21.7077 29.7695 22 29 22C27.3431 22 26 20.6569 26 19C26 17.3431 27.3431 16 29 16Z",
		fill: "#EB021E"
	}),
	/* @__PURE__ */ t("path", {
		d: "M33 16C34.6569 16 36 17.3431 36 19C36 20.6569 34.6569 22 33 22C32.2305 22 31.531 21.7077 31 21.2314C31.6124 20.6822 32 19.8874 32 19C32 18.1124 31.6127 17.3168 31 16.7676C31.531 16.2916 32.2308 16 33 16Z",
		fill: "#F79F1E"
	})
] });
function a({ className: e }) {
	let a = r();
	return /* @__PURE__ */ n("svg", {
		width: "40",
		height: "25",
		viewBox: "0 0 40 25",
		fill: "none",
		"aria-hidden": !0,
		className: e,
		children: [
			/* @__PURE__ */ t("rect", {
				width: "40",
				height: "25",
				rx: "4",
				fill: `url(#${a})`
			}),
			i,
			/* @__PURE__ */ t("defs", { children: /* @__PURE__ */ n("linearGradient", {
				id: a,
				x1: "11",
				y1: "-1.11461e-07",
				x2: "30.5",
				y2: "26.5",
				gradientUnits: "userSpaceOnUse",
				children: [
					/* @__PURE__ */ t("stop", { stopColor: "#B07B11" }),
					/* @__PURE__ */ t("stop", {
						offset: "0.342412",
						stopColor: "#CB9B3B"
					}),
					/* @__PURE__ */ t("stop", {
						offset: "0.913462",
						stopColor: "#C7A976"
					})
				]
			}) })
		]
	});
}
//#endregion
export { a as CreditCardGold };
