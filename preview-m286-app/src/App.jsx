import { useEffect, useState } from "react";
import { Calculator, Layers, ListChecks, Moon, Scale, Sun } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Flashcards from "@/components/Flashcards";
import Quiz from "@/components/Quiz";
import CalcTrainer from "@/components/CalcTrainer";
import Nwa from "@/components/Nwa";
import { load, save } from "@/lib/storage";

function useTheme() {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        try { localStorage.setItem("m286-theme", dark ? "dark" : "light"); } catch { /* egal */ }
    }, [dark]);
    return [dark, setDark];
}

const TABS = [
    { id: "karten", label: "Karten", icon: Layers },
    { id: "quiz", label: "Quiz", icon: ListChecks },
    { id: "rechnen", label: "Rechnen", icon: Calculator },
    { id: "nwa", label: "Nutzwert", icon: Scale },
];

export default function App() {
    const [dark, setDark] = useTheme();
    const [tab, setTab] = useState(() => load("tab", "karten"));
    useEffect(() => save("tab", tab), [tab]);

    return (
        <div className="min-h-dvh">
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-3 px-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
                            286
                        </div>
                        <div className="min-w-0 leading-tight">
                            <div className="truncate text-sm font-semibold">M286 Trainer</div>
                            <div className="truncate text-xs text-muted-foreground">BZZ · ICT-Grundlagen</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="hidden sm:inline-flex">LB1 = LU01–LU05</Badge>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDark(d => !d)}
                            aria-label={dark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren"}
                        >
                            {dark ? <Sun /> : <Moon />}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 pb-16 pt-5">
                <Tabs value={tab} onValueChange={setTab}>
                    <TabsList className="grid h-auto w-full grid-cols-4">
                        {TABS.map(({ id, label, icon: Icon }) => (
                            <TabsTrigger key={id} value={id} className="flex-col gap-1 px-1 py-2 text-xs sm:flex-row sm:text-sm">
                                <Icon />
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="karten"><Flashcards /></TabsContent>
                    <TabsContent value="quiz"><Quiz /></TabsContent>
                    <TabsContent value="rechnen"><CalcTrainer /></TabsContent>
                    <TabsContent value="nwa"><Nwa /></TabsContent>
                </Tabs>
                <p className="mt-10 text-center text-xs text-muted-foreground">
                    Inhalte aus dem Moodle-Kurs M286 (BZZ). Viel Erfolg an der LB1!
                </p>
            </main>
        </div>
    );
}
