// localStorage kann im privaten Modus fehlen oder werfen: immer abfangen
export function load(key, fallback) {
    try {
        const v = localStorage.getItem("m286-" + key);
        return v === null ? fallback : JSON.parse(v);
    } catch {
        return fallback;
    }
}

export function save(key, value) {
    try {
        localStorage.setItem("m286-" + key, JSON.stringify(value));
    } catch {
        /* ohne Speicher weiter */
    }
}
