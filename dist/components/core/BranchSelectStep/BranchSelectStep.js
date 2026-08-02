"use client";
import { cn as e } from "../../../lib/utils.js";
import { AvailabilityDot as t } from "../../primitives/AvailabilityDot/AvailabilityDot.js";
import { SelectionGroup as n } from "../SelectionGroup/SelectionGroup.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { AnimatePresence as a, motion as o, useReducedMotion as s } from "motion/react";
import { Bell as c, MapPin as l } from "lucide-react";
//#region components/core/BranchSelectStep/BranchSelectStep.tsx
var u = e("w-full h-12 md:h-10 rounded-md border border-border bg-background", "px-3 text-sm text-foreground placeholder:text-muted-foreground", "outline-none focus:ring-2 focus:ring-ring focus:border-ring", "transition-shadow duration-150"), d = {
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
}, f = {
	hidden: {
		opacity: 0,
		y: 6
	},
	show: (e) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: .2,
			delay: e * .05,
			ease: [
				0,
				0,
				.2,
				1
			]
		}
	})
};
function p({ branches: e, selectedBranchId: a, onBranchSelect: o, ...s }) {
	return /* @__PURE__ */ r(n, {
		...s,
		type: "radio",
		value: a,
		onChange: (e) => o(e),
		children: e.map((e) => /* @__PURE__ */ i(n.Option, {
			value: e.id,
			icon: /* @__PURE__ */ r(l, { className: "size-4" }),
			description: e.address,
			children: [/* @__PURE__ */ i("span", {
				className: "flex items-center gap-2 flex-wrap",
				children: [e.name, /* @__PURE__ */ r(t, {
					level: e.availableSlots === 0 ? "unavailable" : e.availableSlots < 3 ? "limited" : "available",
					showLabel: !0
				})]
			}), /* @__PURE__ */ r("span", {
				className: "text-xs text-muted-foreground font-normal block",
				children: e.distanceKm < 1 ? `${Math.round(e.distanceKm * 1e3)} m away` : `${e.distanceKm.toFixed(1)} km away`
			})]
		}, e.id))
	});
}
function m({ details: t, onChange: n, shouldReduce: a, className: s, ...l }) {
	return /* @__PURE__ */ r(o.div, {
		variants: d,
		initial: "hidden",
		animate: "show",
		exit: "exit",
		className: e("mt-3", s),
		...l,
		children: /* @__PURE__ */ i("div", {
			className: "rounded-xl border border-border bg-muted/30 p-4 md:p-5 space-y-3 md:space-y-4",
			children: [
				/* @__PURE__ */ r("p", {
					className: "text-xs md:text-sm font-medium text-foreground",
					children: "Car boot details — so our team can find you"
				}),
				[
					{
						key: "vehicleColour",
						label: "Vehicle colour",
						placeholder: "e.g. Silver"
					},
					{
						key: "vehicleMake",
						label: "Make & model",
						placeholder: "e.g. Toyota RAV4"
					},
					{
						key: "registrationPlate",
						label: "Registration plate",
						placeholder: "e.g. ABC 123"
					}
				].map((e, s) => /* @__PURE__ */ i(o.div, {
					custom: s,
					variants: a ? void 0 : f,
					initial: "hidden",
					animate: "show",
					className: "space-y-1",
					children: [/* @__PURE__ */ r("label", {
						htmlFor: `car-boot-${e.key}`,
						className: "text-xs text-muted-foreground",
						children: e.label
					}), /* @__PURE__ */ r("input", {
						id: `car-boot-${e.key}`,
						type: "text",
						value: t[e.key],
						onChange: (r) => n({
							...t,
							[e.key]: r.target.value
						}),
						placeholder: e.placeholder,
						className: u
					})]
				}, e.key)),
				/* @__PURE__ */ i(o.div, {
					custom: 3,
					variants: a ? void 0 : f,
					initial: "hidden",
					animate: "show",
					className: "flex items-center justify-between pt-1",
					children: [/* @__PURE__ */ i("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ r(c, { className: "size-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ i("div", { children: [/* @__PURE__ */ r("p", {
							className: "text-xs md:text-sm text-foreground font-medium leading-snug",
							children: "Arrival notification"
						}), /* @__PURE__ */ r("p", {
							className: "text-xs text-muted-foreground leading-snug",
							children: "Alert the team when you pull in"
						})] })]
					}), /* @__PURE__ */ r("button", {
						type: "button",
						role: "switch",
						"aria-checked": t.arrivalNotification,
						onClick: () => n({
							...t,
							arrivalNotification: !t.arrivalNotification
						}),
						className: e("relative shrink-0 h-6 w-10 rounded-full border-2 transition-colors duration-200", "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", t.arrivalNotification ? "bg-primary border-primary" : "bg-muted border-border"),
						"aria-label": "Toggle arrival notification",
						children: /* @__PURE__ */ r("span", { className: e("absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow-sm transition-transform duration-200", t.arrivalNotification && "translate-x-4") })
					})]
				})
			]
		})
	});
}
function h({ branches: t, selectedBranchId: n, carBootDetails: o, onBranchSelect: c, onCarBootChange: l, className: u, ...d }) {
	let f = s() ?? !1, h = o ?? {
		vehicleColour: "",
		vehicleMake: "",
		registrationPlate: "",
		arrivalNotification: !0
	};
	return /* @__PURE__ */ i("div", {
		className: e("space-y-1", u),
		...d,
		children: [/* @__PURE__ */ r(p, {
			branches: t,
			selectedBranchId: n,
			onBranchSelect: (e) => {
				c(e), o || l(h);
			}
		}), /* @__PURE__ */ r(a, {
			initial: !1,
			children: n && /* @__PURE__ */ r(m, {
				details: o ?? h,
				onChange: l,
				shouldReduce: f
			}, "car-boot-form")
		})]
	});
}
h.BranchList = p, h.CarBootForm = m;
//#endregion
export { h as BranchSelectStep };
