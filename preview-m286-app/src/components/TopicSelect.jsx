import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { T } from "@/data";

export const LB1 = ["LU01", "LU02", "LU03", "LU04", "LU05"];

export function filterBy(list, v) {
    if (v === "lb1") return list.filter(c => c.lb1);
    if (v === "all") return list;
    return list.filter(c => c.topic === v);
}

export function topicLabel(v) {
    if (v === "lb1") return "LB1-Stoff (LU01–LU05)";
    if (v === "all") return "Alle Themen";
    return T[v];
}

export function TopicSelect({ value, onChange, className }) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className} aria-label="Thema wählen">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="lb1">LB1-Stoff (LU01–LU05)</SelectItem>
                <SelectItem value="all">Alle Themen</SelectItem>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>LB1</SelectLabel>
                    {LB1.map(k => <SelectItem key={k} value={k}>{T[k]}</SelectItem>)}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>Weitere Themen</SelectLabel>
                    {Object.keys(T).filter(k => !LB1.includes(k)).map(k => <SelectItem key={k} value={k}>{T[k]}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
