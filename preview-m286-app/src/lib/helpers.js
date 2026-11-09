export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
export function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
export function fmt(x, d = 2) {
    const r = Math.round(x * 10 ** d) / 10 ** d;
    const [i, f] = r.toString().split(".");
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + (f ? "." + f : "");
}
export function parseNum(s) {
    s = String(s).trim().replace(/['’\s]/g, "").replace(",", ".");
    if (s === "" || isNaN(Number(s))) return NaN;
    return Number(s);
}
