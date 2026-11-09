import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Check, PartyPopper, RotateCcw, Shuffle, Undo2, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TopicSelect, filterBy } from "@/components/TopicSelect";
import { CARDS, T } from "@/data";
import { shuffle } from "@/lib/helpers";

/*
  Quizlet-artig: Karte umdrehen, dann "Gewusst" (fliegt raus) oder "Nochmal" (kommt hinten wieder).
*/
export default function Flashcards() {
    const [topic, setTopic] = useState("lb1");
    const [termFirst, setTermFirst] = useState(true);
    const [queue, setQueue] = useState([]);
    const [known, setKnown] = useState([]);
    const [missed, setMissed] = useState(new Set());
    const [flipped, setFlipped] = useState(false);
    const [history, setHistory] = useState([]);

    const deck = useMemo(() => filterBy(CARDS, topic), [topic]);

    const restart = useCallback((cards) => {
        setQueue(shuffle(cards));
        setKnown([]);
        setMissed(new Set());
        setHistory([]);
        setFlipped(false);
    }, []);

    useEffect(() => restart(deck), [deck, restart]);

    const card = queue[0];
    const total = known.length + queue.length;
    const pct = total ? Math.round((known.length / total) * 100) : 0;

    const answer = useCallback((gotIt) => {
        if (!card) return;
        setHistory(h => [...h, { queue, known, missed }]);
        if (gotIt) {
            setKnown(k => [...k, card]);
            setQueue(q => q.slice(1));
        } else {
            setMissed(m => new Set(m).add(card.id));
            setQueue(q => [...q.slice(1), card]);
        }
        setFlipped(false);
    }, [card, queue, known, missed]);

    const undo = () => {
        const last = history[history.length - 1];
        if (!last) return;
        setQueue(last.queue);
        setKnown(last.known);
        setMissed(last.missed);
        setHistory(h => h.slice(0, -1));
        setFlipped(false);
    };

    useEffect(() => {
        const onKey = e => {
            if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName) || e.target.getAttribute("role") === "combobox") return;
            if (e.key === " ") { e.preventDefault(); setFlipped(f => !f); }
            if (e.key === "ArrowRight" && flipped) answer(true);
            if (e.key === "ArrowLeft" && flipped) answer(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [answer, flipped]);

    const front = card ? (termFirst ? card.term : card.def) : "";
    const back = card ? (termFirst ? card.def : card.term) : "";

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <TopicSelect value={topic} onChange={setTopic} className="flex-1" />
                <Button variant="outline" size="icon" onClick={() => setTermFirst(t => !t)} aria-label="Richtung wechseln" title="Begriff ↔ Erklärung">
                    <ArrowLeftRight />
                </Button>
                <Button variant="outline" size="icon" onClick={() => restart(deck)} aria-label="Neu mischen" title="Neu mischen">
                    <Shuffle />
                </Button>
            </div>

            <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{known.length} von {total} gewusst</span>
                    <span>{queue.length} offen</span>
                </div>
                <Progress value={pct} indicatorClassName="bg-success" />
            </div>

            {card ? (
                <>
                    <div
                        className="flip cursor-pointer select-none"
                        onClick={() => setFlipped(f => !f)}
                        role="button"
                        tabIndex={0}
                        aria-label="Karte umdrehen"
                        onKeyDown={e => e.key === "Enter" && setFlipped(f => !f)}
                    >
                        <div className={"flip-inner relative grid min-h-[260px] " + (flipped ? "flipped" : "")}>
                            <Face side={termFirst ? "Begriff" : "Erklärung"} text={front} topic={card.topic} big={termFirst} />
                            <Face side={termFirst ? "Erklärung" : "Begriff"} text={back} topic={card.topic} big={!termFirst} back />
                        </div>
                    </div>

                    {flipped ? (
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="lg" onClick={() => answer(false)} className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive">
                                <X /> Nochmal
                            </Button>
                            <Button size="lg" onClick={() => answer(true)} className="bg-success text-success-foreground hover:bg-success/90">
                                <Check /> Gewusst
                            </Button>
                        </div>
                    ) : (
                        <Button variant="secondary" size="lg" className="w-full" onClick={() => setFlipped(true)}>
                            Umdrehen
                        </Button>
                    )}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={undo} disabled={!history.length}>
                            <Undo2 /> Rückgängig
                        </Button>
                        <span className="hidden text-xs text-muted-foreground sm:block">Leertaste = umdrehen · ← nochmal · → gewusst</span>
                    </div>
                </>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                        <PartyPopper className="h-10 w-10 text-success" />
                        <div className="text-lg font-semibold">Alle {known.length} Karten gewusst!</div>
                        <p className="text-sm text-muted-foreground">
                            {missed.size ? `${missed.size} Karten brauchten einen zweiten Anlauf.` : "Alles beim ersten Mal. Stark!"}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                            {missed.size > 0 && (
                                <Button onClick={() => restart(deck.filter(c => missed.has(c.id)))}>
                                    Nur schwierige wiederholen
                                </Button>
                            )}
                            <Button variant="outline" onClick={() => restart(deck)}>
                                <RotateCcw /> Von vorne
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function Face({ side, text, topic, big, back }) {
    return (
        <Card className={"flip-face col-start-1 row-start-1 flex flex-col " + (back ? "flip-back bg-muted/40" : "")}>
            <div className="flex items-center justify-between p-4 pb-0">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{side}</span>
                <Badge variant="outline">{T[topic]}</Badge>
            </div>
            <div className="flex flex-1 items-center justify-center px-6 py-8 text-center">
                <p className={big ? "text-2xl font-semibold tracking-tight" : "text-base leading-relaxed"}>{text}</p>
            </div>
            {!back && <div className="pb-4 text-center text-xs text-muted-foreground">Tippen zum Umdrehen</div>}
        </Card>
    );
}
