"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { AddressTile as n } from "../../primitives/AddressTile/AddressTile.js";
import { DeliveryMethodIcon as r } from "../../primitives/DeliveryMethodIcon/DeliveryMethodIcon.js";
import { SelectionGroup as i } from "../SelectionGroup/SelectionGroup.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { AnimatePresence as s, motion as c, useReducedMotion as l } from "motion/react";
import { Pencil as u } from "lucide-react";
//#region components/core/DeliveryMethodStep/DeliveryMethodStep.tsx
var d = {
	hidden: {
		opacity: 0,
		height: 0,
		overflow: "hidden"
	},
	show: {
		opacity: 1,
		height: "auto",
		overflow: "visible",
		transition: {
			duration: .25,
			ease: [
				0,
				0,
				.2,
				1
			]
		}
	},
	exit: {
		opacity: 0,
		height: 0,
		overflow: "hidden",
		transition: { duration: .2 }
	}
};
function f({ address: e, onEdit: r, ...i }) {
	return /* @__PURE__ */ a(c.div, {
		variants: d,
		initial: "hidden",
		animate: "show",
		exit: "exit",
		...i,
		children: /* @__PURE__ */ o("div", {
			className: "mt-3 flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 md:px-5 md:py-4",
			children: [/* @__PURE__ */ a(n, { ...e }), r && /* @__PURE__ */ a(t, {
				variant: "ghost",
				size: "icon-sm",
				onClick: r,
				"aria-label": "Change delivery address",
				className: "shrink-0 mt-0.5",
				children: /* @__PURE__ */ a(u, { className: "size-3.5" })
			})]
		})
	});
}
function p({ value: n, defaultValue: u, homeAddress: p, onMethodChange: m, onAddressEdit: h, className: g, ..._ }) {
	let v = l(), y = (n ?? u) === "home-delivery";
	return /* @__PURE__ */ o("div", {
		className: e("space-y-1", g),
		..._,
		children: [/* @__PURE__ */ o(i, {
			type: "radio",
			value: n,
			defaultValue: u,
			onChange: (e) => m?.(e),
			children: [/* @__PURE__ */ a(i.Option, {
				value: "home-delivery",
				icon: /* @__PURE__ */ a(r, {
					type: "home-delivery",
					size: 18
				}),
				description: "Delivered straight to your door",
				children: "Home delivery"
			}), /* @__PURE__ */ a(i.Option, {
				value: "click-collect",
				icon: /* @__PURE__ */ a(r, {
					type: "click-collect",
					size: 18
				}),
				description: "Drive up and we'll load your order into your car",
				children: "Click & Collect — car boot"
			})]
		}), /* @__PURE__ */ o(s, {
			initial: !1,
			children: [y && p && /* @__PURE__ */ a(f, {
				address: p,
				onEdit: h
			}, "address-preview"), y && !p && /* @__PURE__ */ a(c.div, {
				variants: v ? void 0 : d,
				initial: "hidden",
				animate: "show",
				exit: "exit",
				className: "mt-3",
				children: /* @__PURE__ */ a(t, {
					variant: "outline",
					onClick: h,
					className: "w-full h-12 md:h-10 border-dashed",
					children: "+ Add delivery address"
				})
			}, "add-address")]
		})]
	});
}
p.AddressPreview = f;
//#endregion
export { p as DeliveryMethodStep };
