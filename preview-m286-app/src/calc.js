import { pick, rnd, fmt } from "./lib/helpers.js";

const IFACES = [
    // Werte aus LU05c / LU05.A03 (praktische Geschwindigkeiten)
    { name: "USB 2.0", mbs: 35 },
    { name: "USB 3.0", mbs: 300 },
    { name: "WLAN (Wi-Fi 5)", mbs: 54 },
    { name: "Gigabit-Ethernet", mbs: 125 },
    { name: "USB-C (USB 3.2 Gen 2)", mbs: 1250 },
    { name: "Bluetooth 5.0", mbs: 0.25 }
];
export const CALC = {
    zeit: {
        label: "Übertragungszeit (MB/s)",
        make() {
            const gb = pick([0.5, 0.8, 1.2, 1.8, 2.5, 3.6, 4.5, 6, 8, 12, 25]);
            const i = pick(IFACES);
            const mb = gb * 1000;
            const t = mb / i.mbs;
            const unitH = t > 3600;
            return {
                q: `Eine Datei mit ${fmt(gb)} GB wird über ${i.name} (ca. ${fmt(i.mbs)} MB/s) übertragen. Wie lange dauert das in Sekunden?`,
                unit: "Sekunden",
                ans: t,
                sol: `Datenmenge in MB: ${fmt(gb)} GB × 1000 = ${fmt(mb)} MB\nZeit = Datenmenge / Geschwindigkeit\n= ${fmt(mb)} MB / ${fmt(i.mbs)} MB/s = ${fmt(t)} s` + (t >= 60 ? `\n= ${fmt(t / 60)} min` : "") + (unitH ? ` = ${fmt(t / 3600)} h` : "")
            };
        }
    },
    zeitBit: {
        label: "Übertragungszeit (Mbit/s, ÷ 8)",
        make() {
            const mbit = pick([8, 16, 40, 50, 80, 100, 200, 400, 500, 1000]);
            const size = pick([200, 400, 500, 750, 1200, 1500, 2000, 3000, 4500]);
            const mbs = mbit / 8;
            const t = size / mbs;
            return {
                q: `Ein Internetanschluss hat ${fmt(mbit)} Mbit/s. Wie viele Sekunden dauert der Download von ${fmt(size)} MB (theoretisch)?`,
                unit: "Sekunden",
                ans: t,
                sol: `Achtung Bit ≠ Byte: ${fmt(mbit)} Mbit/s ÷ 8 = ${fmt(mbs, 3)} MB/s\nZeit = ${fmt(size)} MB / ${fmt(mbs, 3)} MB/s = ${fmt(t)} s` + (t >= 60 ? ` = ${fmt(t / 60)} min` : "")
            };
        }
    },
    menge: {
        label: "Datenmenge aus Zeit",
        make() {
            const i = pick(IFACES.filter(x => x.mbs >= 35));
            const s = pick([5, 10, 20, 30, 45, 60, 90, 120]);
            const mb = i.mbs * s;
            return {
                q: `Über ${i.name} (ca. ${fmt(i.mbs)} MB/s) wird ${s} Sekunden lang kopiert. Wie viele GB wurden übertragen?`,
                unit: "GB",
                ans: mb / 1000,
                sol: `Datenmenge = Geschwindigkeit × Zeit\n= ${fmt(i.mbs)} MB/s × ${s} s = ${fmt(mb)} MB\n= ${fmt(mb)} / 1000 = ${fmt(mb / 1000, 3)} GB`
            };
        }
    },
    bitbyte: {
        label: "Bit ↔ Byte",
        make() {
            if (Math.random() < 0.5) {
                const v = pick([8, 16, 50, 100, 250, 400, 500, 1000, 2500, 10000]);
                return {
                    q: `Wie viele MB/s sind ${fmt(v)} Mbit/s?`,
                    unit: "MB/s",
                    ans: v / 8,
                    sol: `1 Byte = 8 Bit → durch 8 teilen\n${fmt(v)} Mbit/s ÷ 8 = ${fmt(v / 8, 3)} MB/s`
                };
            }
            const v = pick([1, 5, 12.5, 25, 40, 54, 125, 300]);
            return {
                q: `Wie viele Mbit/s sind ${fmt(v)} MB/s?`,
                unit: "Mbit/s",
                ans: v * 8,
                sol: `1 Byte = 8 Bit → mal 8\n${fmt(v)} MB/s × 8 = ${fmt(v * 8)} Mbit/s`
            };
        }
    },
    einheiten: {
        label: "Einheiten umrechnen (Basis 10)",
        make() {
            const U = ["Byte", "KB", "MB", "GB", "TB"];
            let a = rnd(1, 4), b;
            // in grössere Einheit höchstens 2 Stufen, sonst werden die Zahlen winzig
            do { b = rnd(0, 4); } while (b === a || (b < a && a - b > 3) || (b > a && b - a > 2));
            const v = b > a ? pick([250, 750, 1500, 4096, 12000, 64000, 500000]) : pick([0.5, 1.5, 2, 3.2, 7, 12, 64, 250, 750]);
            const ans = v * 1000 ** (a - b);
            const step = a > b ? `× 1000 pro Stufe (${a - b} Stufe${a - b > 1 ? "n" : ""}) = × ${fmt(1000 ** (a - b))}` : `÷ 1000 pro Stufe (${b - a} Stufe${b - a > 1 ? "n" : ""}) = ÷ ${fmt(1000 ** (b - a))}`;
            return {
                q: `Wie viele ${U[b]} sind ${fmt(v)} ${U[a]}? (1 KB = 1000 Byte)`,
                unit: U[b],
                ans,
                sol: `${U[a]} → ${U[b]}: ${step}\n${fmt(v)} ${U[a]} = ${fmt(ans, 6)} ${U[b]}`
            };
        }
    },
    gib: {
        label: "GB ↔ GiB / KB ↔ KiB",
        make() {
            const r = Math.random();
            if (r < 0.5) {
                const gb = pick([64, 128, 250, 256, 500, 512, 1000, 2000]);
                const gib = gb * 1e9 / 2 ** 30;
                return {
                    q: `Eine SSD hat laut Hersteller ${fmt(gb)} GB. Wie viele GiB zeigt das Betriebssystem an? (2 Dezimalstellen)`,
                    unit: "GiB",
                    ans: gib,
                    sol: `Byte: ${fmt(gb)} × 10⁹ = ${fmt(gb * 1e9)} B\n1 GiB = 2³⁰ = 1'073'741'824 B\n${fmt(gb * 1e9)} / 1'073'741'824 = ${fmt(gib)} GiB`
                };
            }
            if (r < 0.75) {
                const kib = pick([1, 2, 4, 16, 64, 256]);
                return {
                    q: `Wie viele Byte sind ${kib} KiB?`,
                    unit: "Byte",
                    ans: kib * 1024,
                    sol: `1 KiB = 2¹⁰ = 1024 Byte\n${kib} × 1024 = ${fmt(kib * 1024)} Byte`
                };
            }
            const mib = pick([1, 2, 5, 10, 100]);
            return {
                q: `Wie viele Byte sind ${mib} MiB?`,
                unit: "Byte",
                ans: mib * 1048576,
                sol: `1 MiB = 2²⁰ = 1'048'576 Byte\n${mib} × 1'048'576 = ${fmt(mib * 1048576)} Byte`
            };
        }
    },
    text: {
        label: "Speicherbedarf Text / Bücher",
        make() {
            const s = pick([150, 200, 250, 300, 400]);
            const z = pick([40, 50, 60]);
            const c = pick([55, 60, 65, 70]);
            const bytes = s * z * c;
            if (Math.random() < 0.5) {
                return {
                    q: `Ein Buch hat ${s} Seiten à ${z} Zeilen mit je ${c} Zeichen (ASCII). Wie viele MB braucht es?`,
                    unit: "MB",
                    ans: bytes / 1e6,
                    sol: `Zeichen = ${s} × ${z} × ${c} = ${fmt(bytes)} → 1 Zeichen = 1 Byte\n= ${fmt(bytes)} B = ${fmt(bytes / 1e6, 4)} MB`
                };
            }
            const disk = pick([1, 2, 4]);
            const n = Math.floor(disk * 1e12 / bytes);
            return {
                q: `Wie viele ganze Bücher (${s} Seiten à ${z} Zeilen à ${c} Zeichen, ASCII) passen auf eine ${disk}-TB-Festplatte? (1 KB = 1000 B)`,
                unit: "Bücher",
                ans: n,
                sol: `1 Buch = ${s} × ${z} × ${c} = ${fmt(bytes)} Byte\n${disk} TB = ${fmt(disk * 1e12)} Byte\n${fmt(disk * 1e12)} / ${fmt(bytes)} = ${fmt(disk * 1e12 / bytes)} → abrunden: ${fmt(n)} Bücher`
            };
        }
    },
    bild: {
        label: "Speicherbedarf Bild / Audio",
        make() {
            if (Math.random() < 0.5) {
                const [w, h] = pick([[800, 600], [1280, 720], [1920, 1080], [2560, 1440], [3840, 2160], [4000, 3000]]);
                const bit = pick([8, 16, 24, 32]);
                const b = w * h * bit / 8;
                return {
                    q: `Ein unkomprimiertes Bild hat ${w} × ${h} Pixel mit ${bit} Bit Farbtiefe. Wie viele MB?`,
                    unit: "MB",
                    ans: b / 1e6,
                    sol: `Pixel = ${w} × ${h} = ${fmt(w * h)}\nBit = ${fmt(w * h)} × ${bit} = ${fmt(w * h * bit)}\nByte = ÷ 8 = ${fmt(b)} B = ${fmt(b / 1e6, 3)} MB`
                };
            }
            const min = pick([1, 2, 3, 4, 5, 10]);
            const ch = pick([1, 2]);
            const b = 44100 * 16 * ch * min * 60 / 8;
            return {
                q: `Wie viele MB braucht ${min} Minute${min > 1 ? "n" : ""} unkomprimiertes Audio in CD-Qualität (44'100 Hz, 16 Bit, ${ch === 2 ? "Stereo" : "Mono"})?`,
                unit: "MB",
                ans: b / 1e6,
                sol: `Bit/s = 44'100 × 16 × ${ch} = ${fmt(44100 * 16 * ch)}\nSekunden = ${min} × 60 = ${min * 60}\nByte = ${fmt(44100 * 16 * ch)} × ${min * 60} ÷ 8 = ${fmt(b)} B = ${fmt(b / 1e6, 3)} MB`
            };
        }
    },
    leben: {
        label: "Pro Stunde → Leben (LU05.A01/A02)",
        make() {
            const gbh = pick([0.5, 0.8, 1, 1.2, 1.3, 1.5, 2]);
            const hd = pick([8, 12, 14, 16, 17, 18, 20]);
            const y = pick([50, 60, 65, 70, 75, 80]);
            const gb = gbh * hd * 365 * y;
            return {
                q: `Ein Mensch nimmt ${fmt(gbh)} GB pro Stunde auf, ${hd} Stunden pro Tag, während ${y} Jahren (365 Tage/Jahr). Wie viele TB sind das?`,
                unit: "TB",
                ans: gb / 1000,
                sol: `Pro Tag: ${fmt(gbh)} GB × ${hd} = ${fmt(gbh * hd)} GB\nPro Jahr: × 365 = ${fmt(gbh * hd * 365)} GB\nLeben: × ${y} = ${fmt(gb)} GB\n÷ 1000 = ${fmt(gb / 1000)} TB`
            };
        }
    },
    note: {
        label: "Note berechnen",
        make() {
            const max = pick([20, 24, 30, 36, 40, 45, 50]);
            const p = rnd(Math.round(max * 0.3), max);
            const n = Math.round((5 * p / max + 1) * 10) / 10;
            return {
                q: `Du hast ${p} von ${max} Punkten. Welche Note (auf 0.1 gerundet)?`,
                unit: "Note",
                ans: n,
                sol: `Note = 5 × Punkte / Max + 1\n= 5 × ${p} / ${max} + 1 = ${fmt(5 * p / max + 1, 4)} → ${n.toFixed(1)}`
            };
        }
    }
};
