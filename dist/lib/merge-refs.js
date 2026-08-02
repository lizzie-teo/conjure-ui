//#region lib/merge-refs.ts
function e(...e) {
	return (t) => {
		let n = e.map((e) => {
			if (typeof e == "function") return e(t);
			e && (e.current = t);
		});
		return () => {
			n.forEach((t, n) => {
				if (typeof t == "function") {
					t();
					return;
				}
				let r = e[n];
				typeof r == "function" ? r(null) : r && (r.current = null);
			});
		};
	};
}
//#endregion
export { e as mergeRefs };
