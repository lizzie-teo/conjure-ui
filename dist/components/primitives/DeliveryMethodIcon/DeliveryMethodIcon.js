import { cn as e } from "../../../lib/utils.js";
import { jsx as t } from "react/jsx-runtime";
import { Car as n, Home as r } from "lucide-react";
//#region components/primitives/DeliveryMethodIcon/DeliveryMethodIcon.tsx
function i({ type: i, size: a = 24, className: o, ...s }) {
	return /* @__PURE__ */ t(i === "home-delivery" ? r : n, {
		size: a,
		className: e("shrink-0", o),
		...s
	});
}
//#endregion
export { i as DeliveryMethodIcon };
