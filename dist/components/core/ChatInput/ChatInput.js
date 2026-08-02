"use client";
import { cn as e } from "../../../lib/utils.js";
import { Button as t } from "../../ui/button.js";
import { mergeRefs as n } from "../../../lib/merge-refs.js";
import { jsx as r } from "react/jsx-runtime";
import { AnimatePresence as i, motion as a, useReducedMotion as o } from "motion/react";
import { createContext as s, useCallback as c, useContext as l, useEffect as u, useRef as d, useState as f } from "react";
import { ArrowUp as p, Mic as m } from "lucide-react";
//#region components/core/ChatInput/ChatInput.tsx
var h = s(null);
function g() {
	let e = l(h);
	if (!e) throw Error("ChatInput sub-components must be used inside <ChatInput>");
	return e;
}
function _({ placeholder: t = "Type a message…", className: i, ref: a, "aria-label": o = "Message input", ...s }) {
	let { value: c, setValue: l, handleSend: f } = g(), p = d(null);
	return u(() => {
		let e = p.current;
		e && (e.style.height = "auto", e.style.height = `${e.scrollHeight}px`);
	}, [c]), /* @__PURE__ */ r("textarea", {
		...s,
		ref: n(p, a),
		value: c,
		onChange: (e) => l(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), f());
		},
		placeholder: t,
		rows: 1,
		"aria-label": o,
		className: e("flex-1 resize-none bg-transparent text-base text-foreground", "placeholder:text-muted-foreground leading-relaxed", "outline-none border-0 ring-0 shadow-none", "max-h-32 md:max-h-40 overflow-y-auto", "py-1.5", i)
	});
}
function v({ className: n, "aria-label": s = "Send message", ...c }) {
	let { handleSend: l, value: u, disabled: d } = g(), f = o(), h = u.trim().length > 0 && !d;
	return /* @__PURE__ */ r(t, {
		...c,
		size: "icon",
		onClick: l,
		disabled: !h,
		"aria-label": s,
		className: e("shrink-0 rounded-full size-9 md:size-10", n),
		children: /* @__PURE__ */ r(i, {
			mode: "wait",
			initial: !1,
			children: h ? /* @__PURE__ */ r(a.span, {
				initial: f ? { opacity: 0 } : {
					opacity: 0,
					scale: .7,
					rotate: 45
				},
				animate: f ? { opacity: 1 } : {
					opacity: 1,
					scale: 1,
					rotate: 0
				},
				exit: f ? { opacity: 0 } : {
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
				children: /* @__PURE__ */ r(p, { className: "size-4 md:size-5" })
			}, "send") : /* @__PURE__ */ r(a.span, {
				initial: f ? { opacity: 0 } : {
					opacity: 0,
					scale: .7
				},
				animate: f ? { opacity: 1 } : {
					opacity: 1,
					scale: 1
				},
				exit: f ? { opacity: 0 } : {
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
				children: /* @__PURE__ */ r(m, { className: "size-4 md:size-5" })
			}, "mic")
		})
	});
}
function y({ onSend: t, disabled: n = !1, className: i, children: a, ...o }) {
	let [s, l] = f(""), u = c(() => {
		let e = s.trim();
		!e || n || (t(e), l(""));
	}, [
		s,
		n,
		t
	]);
	return /* @__PURE__ */ r(h.Provider, {
		value: {
			value: s,
			setValue: l,
			handleSend: u,
			disabled: n
		},
		children: /* @__PURE__ */ r("div", {
			className: e("flex items-end gap-2 md:gap-3 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]", "px-4 py-3 md:px-5 md:py-3.5", "transition-shadow duration-150 focus-within:ring-2 focus-within:ring-ring focus-within:shadow-[var(--shadow-elevated)]", i),
			...o,
			children: a
		})
	});
}
y.Field = _, y.Send = v;
//#endregion
export { y as ChatInput };
