import { useCallback, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TopicSelect, filterBy } from "@/components/TopicSelect";
import { CARDS, MC, T } from "@/data";
import { pick, shuffle } from "@/lib/helpers";
import { cn } from "@/lib/utils";

function makeQuestion(topic) {
    const facts = filterBy(MC, topic);
    const cards = filterBy(CARDS, topic);
    // halb feste Faktenfragen, halb aus den Karten gebaut
    if (facts.length && (Math.random() < 0.5 || cards.length < 4)) {
        const f = pick(facts);
        return { topic: f.topic, type: "Faktenfrage", q: f.q, right: f.right, opts: shuffle(f.opts) };
    }
    const c = pick(cards);
    let pool = CARDS.filter(x => x.topic === c.topic && x.id !== c.id);
    if (pool.length < 3) pool = CARDS.filter(x => x.id !== c.id);
    const others = shuffle(pool).slice(0, 3);
    if (Math.random() < 0.5) {
        return { topic: c.topic, type: "Welcher Begriff passt?", q: c.def, right: c.term, opts: shuffle([c.term, ...others.map(o => o.term)]) };
    }
    return { topic: c.topic, type: "Welche Erklärung passt?", q: c.term, right: c.def, opts: shuffle([c.def, ...others.map(o => o.def)]) };
}

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz() {
    const [topic, setTopic] = useState("lb1");
    const [q, setQ] = useState(() => makeQuestion("lb1"));
    const [chosen, setChosen] = useState(null);
    const [score, setScore] = useState({ right: 0, total: 0, streak: 0 });

    const next = useCallback(() => {
        setQ(makeQuestion(topic));
        setChosen(null);
    }, [topic]);

    useEffect(() => {
        setScore({ right: 0, total: 0, streak: 0 });
        setQ(makeQuestion(topic));
        setChosen(null);
    }, [topic]);

    const choose = (o) => {
        if (chosen !== null) return;
        setChosen(o);
        const ok = o === q.right;
        setScore(s => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1, streak: ok ? s.streak + 1 : 0 }));
    };

    useEffect(() => {
        const onKey = e => {
            if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName) || e.target.getAttribute("role") === "combobox") return;
            const i = "1234".indexOf(e.key);
            if (i >= 0 && q.opts[i] !== undefined) choose(q.opts[i]);
            if (e.key === "Enter" && chosen !== null) next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    const pct = score.total ? Math.round((score.right / score.total) * 100) : 0;
    const ok = chosen === q.right;

    return (
        <div className="space-y-4">
            <TopicSelect value={topic} onChange={setTopic} className="w-full" />

            <div className="grid grid-cols-3 gap-2">
                <Stat label="Richtig" value={`${score.right}/${score.total}`} />
                <Stat label="Quote" value={score.total ? `${pct} %` : "–"} />
                <Stat label="Serie" value={score.streak} />
            </div>

            <Card>
                <CardHeader className="gap-3 pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="outline">{T[q.topic]}</Badge>
                        <span className="text-xs text-muted-foreground">{q.type}</span>
                    </div>
                    <p className="text-lg font-semibold leading-snug tracking-tight">{q.q}</p>
                </CardHeader>
                <CardContent className="grid gap-2">
                    {q.opts.map((o, i) => {
                        const isRight = chosen !== null && o === q.right;
                        const isWrong = chosen === o && o !== q.right;
                        return (
                            <button
                                key={o}
                                onClick={() => choose(o)}
                                disabled={chosen !== null}
                                className={cn(
                                    "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                                    chosen === null && "hover:bg-accent",
                                    isRight && "border-success/60 bg-success/10",
                                    isWrong && "border-destructive/60 bg-destructive/10",
                                    chosen !== null && !isRight && !isWrong && "opacity-60"
                                )}
                            >
                                <span className={cn(
                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-semibold",
                                    isRight && "border-success bg-success text-success-foreground",
                                    isWrong && "border-destructive bg-destructive text-destructive-foreground"
                                )}>
                                    {isRight ? <CheckCircle2 className="h-4 w-4" /> : isWrong ? <XCircle className="h-4 w-4" /> : LETTERS[i]}
                                </span>
                                <span className="pt-0.5 leading-snug">{o}</span>
                            </button>
                        );
                    })}
                </CardContent>
                {chosen !== null && (
                    <CardFooter className="flex-col items-stretch gap-3">
                        <div className={cn(
                            "flex items-start gap-2 rounded-lg p-3 text-sm",
                            ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        )}>
                            {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                            <span>{ok ? "Richtig!" : <>Falsch. Richtig ist: <b>{q.right}</b></>}</span>
                        </div>
                        <Button onClick={next} size="lg">
                            Nächste Frage <ArrowRight />
                        </Button>
                    </CardFooter>
                )}
            </Card>
            <Progress value={pct} className="h-1.5" indicatorClassName="bg-success" />
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="rounded-xl border bg-card px-3 py-2.5">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-lg font-semibold tabular-nums">{value}</div>
        </div>
    );
}
