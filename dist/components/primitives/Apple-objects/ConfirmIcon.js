import { cn as e } from "../../../lib/utils.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useId as r } from "react";
//#region components/primitives/Apple-objects/ConfirmIcon.tsx
function i({ className: i }) {
	let a = r(), o = `confirm-clip-${a}`, s = `confirm-mask-${a}`;
	return /* @__PURE__ */ n("svg", {
		width: "35",
		height: "35",
		viewBox: "0 0 35 35",
		fill: "none",
		"aria-hidden": !0,
		className: e("text-apple-pay-blue", i),
		children: [
			/* @__PURE__ */ n("g", {
				clipPath: `url(#${o})`,
				children: [
					/* @__PURE__ */ t("rect", {
						x: "-2.335",
						y: "5.665",
						width: "19.67",
						height: "39.67",
						rx: "3.335",
						fill: "currentColor",
						fillOpacity: "0.15"
					}),
					/* @__PURE__ */ t("rect", {
						x: "-2.335",
						y: "5.665",
						width: "19.67",
						height: "39.67",
						rx: "3.335",
						stroke: "currentColor",
						strokeWidth: "1.33"
					}),
					/* @__PURE__ */ t("rect", {
						x: "1.5",
						y: "8.5",
						width: "8",
						height: "1",
						rx: "0.5",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ t("mask", {
						id: s,
						fill: "white",
						children: /* @__PURE__ */ t("path", { d: "M18 13.67V13.67C18.5523 13.67 19 14.1177 19 14.67V20.336C19 20.8883 18.5523 21.336 18 21.336V21.336V13.67Z" })
					}),
					/* @__PURE__ */ t("path", {
						d: "M18 13.67M18 21.336M18 13.67M19 14.67H17.67V20.336H19H20.33V14.67H19ZM18 21.336M18 21.336H19.33V13.67H18H16.67V21.336H18ZM19 20.336H17.67C17.67 20.1537 17.8177 20.006 18 20.006V21.336V22.666C19.2868 22.666 20.33 21.6228 20.33 20.336H19ZM18 13.67V15C17.8177 15 17.67 14.8522 17.67 14.67H19H20.33C20.33 13.3832 19.2868 12.34 18 12.34V13.67Z",
						fill: "currentColor",
						mask: `url(#${s})`
					}),
					/* @__PURE__ */ t("path", {
						d: "M21.6665 17.079C21.6665 16.843 21.7675 16.5955 21.9246 16.4401L25.5657 12.7048C25.7452 12.5207 25.9528 12.4286 26.1604 12.4286C26.6541 12.4286 26.9907 12.7797 26.9907 13.2459C26.9907 13.5106 26.8785 13.712 26.7214 13.8674L25.4479 15.1797L24.2865 16.279L25.4983 16.2099H30.9257C31.4531 16.2099 31.8065 16.561 31.8065 17.079C31.8065 17.597 31.4531 17.9423 30.9257 17.9423H25.4983L24.2865 17.879L25.4479 18.9725L26.7214 20.279C26.8785 20.4401 26.9907 20.6416 26.9907 20.9006C26.9907 21.3668 26.6541 21.7236 26.1604 21.7236C25.9528 21.7236 25.7452 21.6315 25.5713 21.4531L21.9246 17.7121C21.7675 17.5567 21.6665 17.3092 21.6665 17.079Z",
						fill: "currentColor"
					})
				]
			}),
			/* @__PURE__ */ t("rect", {
				x: "-1",
				y: "1",
				width: "33",
				height: "33",
				rx: "16.5",
				transform: "matrix(-1 0 0 1 33 0)",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("clipPath", {
				id: o,
				children: /* @__PURE__ */ t("rect", {
					width: "35",
					height: "35",
					rx: "17.5",
					transform: "matrix(-1 0 0 1 35 0)",
					fill: "white"
				})
			}) })
		]
	});
}
//#endregion
export { i as ConfirmIcon };
