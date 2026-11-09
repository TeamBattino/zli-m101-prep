import { useMemo, useState } from "react";
import { AlertTriangle, RotateCcw, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { fmt, parseNum } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const VARIANTS = ["Notebook A", "Notebook B", "Notebook C"];
const START = [
    { k: "Preis", w: 30, p: [5, 3, 2] },
    { k: "Akkulaufzeit", w: 25, p: [2, 4, 5] },
    { k: "Gewicht", w: 20, p: [3, 4, 5] },
    { k: "Leistung (CPU/RAM)", w: 15, p: [3, 5, 4] },
    { k: "Anschlüsse", w: 10, p: [4, 3, 2] },
];

const STEPS = [
    ["Kriterien festlegen", "relevant und möglichst objektiv (messbar)"],
    ["Gewichten", "wie wichtig ist jedes Kriterium? Zusammen 100 %"],
    ["Bewerten", "jede Variante pro Kriterium mit Punkten (hier 1–5)"],
    ["Rechnen", "Teilnutzen = Punkte × Gewicht ÷ 100, alles addieren = Nutzwert"],
    ["Entscheiden", "höchster Nutzwert = Empfehlung, mit Begründung"],
];

export default function Nwa() {
    const [rows, setRows] = useState(() => structuredClone(START));

    const setW = (i, v) => setRows(r => r.map((x, j) => j === i ? { ...x, w: v } : x));
    const setP = (i, k, v) => setRows(r => r.map((x, j) => j === i ? { ...x, p: x.p.map((y, m) => m === k ? v : y) } : x));

    const { wsum, sums, best } = useMemo(() => {
        const num = v => { const n = parseNum(v); return isNaN(n) ? 0 : n; };
        const wsum = rows.reduce((s, r) => s + num(r.w), 0);
        const sums = VARIANTS.map((_, k) => rows.reduce((s, r) => s + num(r.p[k]) * num(r.w) / 100, 0));
        return { wsum, sums, best: Math.max(...sums) };
    }, [rows]);

    const winner = VARIANTS[sums.indexOf(best)];
    const valid = Math.abs(wsum - 100) < 0.001;

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">So geht die Nutzwertanalyse</CardTitle>
                    <CardDescription>LU02 · Geräte objektiv vergleichen</CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="space-y-2.5">
                        {STEPS.map(([t, d], i) => (
                            <li key={t} className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{i + 1}</span>
                                <div className="text-sm leading-snug">
                                    <span className="font-medium">{t}</span>
                                    <span className="text-muted-foreground"> · {d}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-3">
                    <div className="space-y-1.5">
                        <CardTitle className="text-base">Beispiel: Notebook für unterwegs</CardTitle>
                        <CardDescription>Gewichte und Punkte sind veränderbar.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setRows(structuredClone(START))} aria-label="Zurücksetzen" title="Zurücksetzen">
                        <RotateCcw />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {rows.map((r, i) => (
                        <div key={r.k} className="rounded-lg border p-3">
                            <div className="mb-2 flex items-center justify-between gap-2">
                                <span className="text-sm font-medium">{r.k}</span>
                                <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    Gewicht
                                    <Input
                                        inputMode="decimal"
                                        value={r.w}
                                        onChange={e => setW(i, e.target.value)}
                                        className="h-8 w-16 px-2 text-right text-sm tabular-nums text-foreground"
                                        aria-label={`Gewicht ${r.k}`}
                                    />
                                    %
                                </label>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {VARIANTS.map((v, k) => {
                                    const n = parseNum(r.p[k]);
                                    const tn = (isNaN(n) ? 0 : n) * (parseNum(r.w) || 0) / 100;
                                    return (
                                        <label key={v} className="space-y-1">
                                            <span className="block text-[11px] text-muted-foreground">{v.replace("Notebook ", "NB ")}</span>
                                            <Input
                                                inputMode="numeric"
                                                value={r.p[k]}
                                                onChange={e => setP(i, k, e.target.value)}
                                                className="h-9 text-center tabular-nums"
                                                aria-label={`Punkte ${v} ${r.k}`}
                                            />
                                            <span className="block text-center text-[11px] tabular-nums text-muted-foreground">= {fmt(tn)}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className={cn("flex items-center justify-between rounded-lg px-3 py-2 text-sm", valid ? "bg-muted" : "bg-destructive/10 text-destructive")}>
                        <span className="flex items-center gap-2">
                            {!valid && <AlertTriangle className="h-4 w-4" />}
                            Summe der Gewichte
                        </span>
                        <span className="font-semibold tabular-nums">{fmt(wsum)} %</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Ergebnis (Nutzwert)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {VARIANTS.map((v, k) => (
                        <div key={v} className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 font-medium">
                                    {v}
                                    {valid && sums[k] === best && <Badge variant="success"><Trophy className="mr-1 h-3 w-3" />Empfehlung</Badge>}
                                </span>
                                <span className="font-semibold tabular-nums">{fmt(sums[k])}</span>
                            </div>
                            <Progress value={(sums[k] / 5) * 100} indicatorClassName={valid && sums[k] === best ? "bg-success" : ""} />
                        </div>
                    ))}
                    <p className="pt-1 text-sm text-muted-foreground">
                        {valid
                            ? <>Empfehlung: <b className="text-foreground">{winner}</b> hat den höchsten Nutzwert ({fmt(best)} von max. 5).</>
                            : <>Die Gewichte ergeben {fmt(wsum)} %. Sie müssen zusammen genau 100 % ergeben.</>}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
