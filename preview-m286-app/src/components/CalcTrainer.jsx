import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, RefreshCw, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CALC } from "@/calc";
import { fmt, parseNum, pick } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const FORMULAS = [
    ["Übertragungszeit", "Zeit = Datenmenge ÷ Geschwindigkeit"],
    ["Bit → Byte", "Mbit/s ÷ 8 = MB/s"],
    ["Einheiten (Kurs)", "1 KB = 1000 B · 1 KiB = 1024 B"],
    ["GB → GiB", "× 10⁹ ÷ 2³⁰"],
    ["Bild", "Breite × Höhe × Bit ÷ 8"],
    ["Audio", "Hz × Bit × Kanäle × Sek. ÷ 8"],
    ["Text", "Zeichen × 1 Byte (ASCII)"],
    ["Note", "5 × Punkte ÷ Max + 1"],
];

// kleine Zahlen nicht auf 0 runden: 0.000007 statt 0
function fmtAns(x) {
    if (x !== 0 && Math.abs(x) < 0.01) return String(Number(x.toPrecision(3)));
    return fmt(x, 3);
}

export default function CalcTrainer() {
    const [type, setType] = useState("mix");
    const [task, setTask] = useState(null);
    const [value, setValue] = useState("");
    const [result, setResult] = useState(null); // null | "ok" | "no" | "nan"
    const [counted, setCounted] = useState(false);
    const [score, setScore] = useState({ right: 0, total: 0 });
    const [showFormulas, setShowFormulas] = useState(false);
    const inputRef = useRef(null);

    const newTask = useCallback((t = type) => {
        const k = t === "mix" ? pick(Object.keys(CALC)) : t;
        setTask(CALC[k].make());
        setValue("");
        setResult(null);
        setCounted(false);
        inputRef.current?.focus({ preventScroll: true });
    }, [type]);

    useEffect(() => { newTask(type); }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

    const check = () => {
        if (!task) return;
        const v = parseNum(value);
        if (isNaN(v)) { setResult("nan"); return; }
        // relative Toleranz (Rundung); bei sehr kleinen Zahlen kein fester Mindestwert
        const tol = Math.abs(task.ans) * 0.01 || 1e-12;
        const ok = Math.abs(v - task.ans) <= tol;
        setResult(ok ? "ok" : "no");
        if (!counted) {
            setCounted(true);
            setScore(s => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (result === "ok") newTask();
        else check();
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="flex-1" aria-label="Aufgabentyp">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mix">Gemischt (alle Typen)</SelectItem>
                        <SelectSeparator />
                        {Object.entries(CALC).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                    </SelectContent>
                </Select>
                <div className="flex h-10 items-center rounded-md border px-3 text-sm font-semibold tabular-nums">
                    {score.right}/{score.total}
                </div>
            </div>

            {task && (
                <Card>
                    <CardHeader className="pb-4">
                        <CardDescription>Aufgabe</CardDescription>
                        <p className="text-lg font-semibold leading-snug tracking-tight">{task.q}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={onSubmit} className="space-y-3">
                            <div className="relative">
                                <Input
                                    ref={inputRef}
                                    inputMode="decimal"
                                    autoComplete="off"
                                    placeholder="Deine Antwort"
                                    value={value}
                                    onChange={e => { setValue(e.target.value); if (result === "nan") setResult(null); }}
                                    className={cn(
                                        "h-12 pr-24 text-lg tabular-nums",
                                        result === "ok" && "border-success focus-visible:ring-success",
                                        result === "no" && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                                    {task.unit}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button type="submit" size="lg">{result === "ok" ? "Weiter" : "Prüfen"}</Button>
                                <Button type="button" variant="outline" size="lg" onClick={() => newTask()}>
                                    <RefreshCw /> Neue Aufgabe
                                </Button>
                            </div>
                        </form>

                        {result === "nan" && (
                            <p className="text-sm text-destructive">Bitte eine Zahl eingeben (Komma oder Punkt).</p>
                        )}
                        {(result === "ok" || result === "no") && (
                            <div className={cn("rounded-lg border p-3", result === "ok" ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10")}>
                                <div className={cn("flex items-center gap-2 text-sm font-semibold", result === "ok" ? "text-success" : "text-destructive")}>
                                    {result === "ok" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                    {result === "ok" ? "Richtig!" : `Leider falsch. Richtig: ${task.unit === "Note" ? task.ans.toFixed(1) : `${fmtAns(task.ans)} ${task.unit}`}`}
                                </div>
                                <div className="mt-3 rounded-md bg-background/70 p-3">
                                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Lösungsweg</div>
                                    <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">{task.sol}</pre>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            <Card>
                <button
                    className="flex w-full items-center justify-between p-5 text-left"
                    onClick={() => setShowFormulas(s => !s)}
                    aria-expanded={showFormulas}
                >
                    <div>
                        <CardTitle className="text-base">Formeln</CardTitle>
                        <CardDescription className="mt-1">Für den TI-30. Antworten ±1 % gelten als richtig.</CardDescription>
                    </div>
                    <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", showFormulas && "rotate-180")} />
                </button>
                {showFormulas && (
                    <CardContent>
                        <dl className="divide-y rounded-lg border">
                            {FORMULAS.map(([k, v]) => (
                                <div key={k} className="flex flex-col gap-0.5 px-3 py-2 sm:flex-row sm:justify-between sm:gap-4">
                                    <dt className="text-sm text-muted-foreground">{k}</dt>
                                    <dd className="font-mono text-[13px]">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
