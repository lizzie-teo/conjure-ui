"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { jsx as n } from "react/jsx-runtime";
import { AnimatePresence as r, motion as i, useReducedMotion as a } from "motion/react";
import { createContext as o, useCallback as s, useContext as c, useEffect as l, useRef as u, useState as d } from "react";
import { ArrowUp as f, Mic as p } from "lucide-react";
//#region components/core/ChatInput/ChatInput.tsx
var m = o(null);
function h() {
	let e = c(m);
	if (!e) throw Error("ChatInput sub-components must be used inside <ChatInput>");
	return e;
}
function g({ placeholder: t = "Type a message…", className: r }) {
	let { value: i, setValue: a, handleSend: o } = h(), s = u(null);
	return l(() => {
		let e = s.current;
		e && (e.style.height = "auto", e.style.height = `${e.scrollHeight}px`);
	}, [i]), /* @__PURE__ */ n("textarea", {
		ref: s,
		value: i,
		onChange: (e) => a(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o());
		},
		placeholder: t,
		rows: 1,
		"aria-label": "Message input",
		className: e("flex-1 resize-none bg-transparent text-base text-foreground", "placeholder:text-muted-foreground leading-relaxed", "outline-none border-0 ring-0 shadow-none", "max-h-32 md:max-h-40 overflow-y-auto", "py-1.5", r)
	});
}
function _({ className: o }) {
	let { handleSend: s, value: c, disabled: l } = h(), u = a(), d = c.trim().length > 0 && !l;
	return /* @__PURE__ */ n(t, {
		size: "icon",
		onClick: s,
		disabled: !d,
		"aria-label": "Send message",
		className: e("shrink-0 rounded-full size-9 md:size-10", o),
		children: /* @__PURE__ */ n(r, {
			mode: "wait",
			initial: !1,
			children: d ? /* @__PURE__ */ n(i.span, {
				initial: u ? { opacity: 0 } : {
					opacity: 0,
					scale: .7,
					rotate: 45
				},
				animate: u ? { opacity: 1 } : {
					opacity: 1,
					scale: 1,
					rotate: 0
				},
				exit: u ? { opacity: 0 } : {
					opacity: 0,
					scale: .7,
					rotate: 45
				},
				transition: {
					duration: .15,
					ease: [
						0,
						0,
						.2,
						1
					]
				},
				className: "flex items-center justify-center",
				children: /* @__PURE__ */ n(f, { className: "size-4 md:size-5" })
			}, "send") : /* @__PURE__ */ n(i.span, {
				initial: u ? { opacity: 0 } : {
					opacity: 0,
					scale: .7
				},
				animate: u ? { opacity: 1 } : {
					opacity: 1,
					scale: 1
				},
				exit: u ? { opacity: 0 } : {
					opacity: 0,
					scale: .7
				},
				transition: {
					duration: .15,
					ease: [
						0,
						0,
						.2,
						1
					]
				},
				className: "flex items-center justify-center",
				children: /* @__PURE__ */ n(p, { className: "size-4 md:size-5" })
			}, "mic")
		})
	});
}
function v({ onSend: t, disabled: r = !1, className: i, children: a }) {
	let [o, c] = d(""), l = s(() => {
		let e = o.trim();
		!e || r || (t(e), c(""));
	}, [
		o,
		r,
		t
	]);
	return /* @__PURE__ */ n(m.Provider, {
		value: {
			value: o,
			setValue: c,
			handleSend: l,
			disabled: r
		},
		children: /* @__PURE__ */ n("div", {
			className: e("flex items-end gap-2 md:gap-3 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]", "px-4 py-3 md:px-5 md:py-3.5", "transition-shadow duration-150 focus-within:ring-2 focus-within:ring-ring focus-within:shadow-[var(--shadow-elevated)]", i),
			children: a
		})
	});
}
v.Field = g, v.Send = _;
//#endregion
export { v as ChatInput };
