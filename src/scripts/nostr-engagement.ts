/**
 * Nostr Engagement Stats — Client-Side Loading
 * 
 * STATUS: FUNKTIONIERT NICHT (Stand: 2026-02-10)
 * 
 * PROBLEM: Stats werden NICHT korrekt geladen. Zeigt 0 oder falsche Werte.
 * 
 * Getestet:
 * - Stats sind UNVOLLSTÄNDIG — Nostr ist dezentral, verschiedene Relays haben verschiedene Daten
 * - relay.nostr.band wäre ideal (aggregiert), aber ist geblockt (1Host/DNS?)
 * - YakiHonne zeigt z.B. 132 Zaps, wir zeigen 2 — weil die einen eigenen Aggregator haben
 * 
 * TODO wenn fortgesetzt:
 * - [ ] relay.nostr.band in Firewall/DNS erlauben
 * - [ ] Mehr Relays hinzufügen (aber: mehr Relays = längere Wartezeit)
 * - [ ] Sat-Summe aus Zaps extrahieren (bolt11 parsen)
 * - [ ] Quotes implementieren (Kind 1 mit #q Tag)
 * - [ ] Caching-Layer damit nicht jeder Pageload alle Relays abfragt
 * 
 * Siehe auch: /docs/NOSTR-ENGAGEMENT.md
 */

import { SimplePool } from "nostr-tools";

/**
 * RELAYS — Welche Nostr-Relays abgefragt werden
 * 
 * Getestet und NICHT funktionierend:
 * - wss://relay.nostr.band — Connection refused (vermutlich 1Host DNS-Block)
 * - wss://nostr-02.yakihonne.com — Gibt 0 zurück (anderes Datenformat?)
 * 
 * Diese hier funktionieren, haben aber nicht alle Daten:
 */
const RELAYS = [
    "wss://nos.lol",
    "wss://relay.damus.io",
    "wss://relay.primal.net",
];

/**
 * Sucht im DOM nach Elementen mit data-engagement-a und data-engagement-field
 * Diese wurden vom Astro-Template gerendert mit dem Format:
 * <span data-engagement-a="30023:pubkey:d-tag" data-engagement-field="likes">—</span>
 */
const statEls = Array.from(document.querySelectorAll("[data-engagement-a][data-engagement-field]")) as HTMLElement[];
const addrs = Array.from(new Set(statEls.map((el) => el.getAttribute("data-engagement-a") || "").filter(Boolean)));
const addrSet = new Set(addrs);

if (addrs.length) {
    const pool = new SimplePool();

    // Timeout für alle Queries zusammen — wenn ein Relay hängt, brechen wir ab
    const timeoutMs = 7000;
    const withTimeout = <T>(p: Promise<T>): Promise<T> =>
        Promise.race([
            p,
            new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
        ]);

    /**
     * Prüft ob ein Event ein Quote ist (Kind 1 mit #q Tag)
     * Quotes werden von Comments getrennt gezählt (wie bei YakiHonne)
     * ACHTUNG: Quotes werden aktuell NICHT angezeigt, nur rausgefiltert
     */
    const isQuote = (ev: { tags?: string[][] }) => Array.isArray(ev.tags) && ev.tags.some((t) => t && t[0] === "q" && t[1]);

    /**
     * Extrahiert die Artikel-Referenzen aus einem Event
     * Events referenzieren Artikel via #a Tag im Format "kind:pubkey:d-tag"
     */
    const targetsFor = (ev: { tags?: string[][] }) => {
        const out = new Set<string>();
        for (const t of ev.tags || []) {
            if (t && t[0] === "a" && t[1] && addrSet.has(t[1])) out.add(t[1]);
        }
        return Array.from(out);
    };

    const init = () => ({ likes: 0, comments: 0, quotes: 0, reposts: 0, zaps: 0 });
    const stats: Record<string, ReturnType<typeof init>> = {};
    for (const a of addrs) stats[a] = init();

    // De-dupe Likes per Pubkey (ein User kann nur einmal liken)
    const likePubkeysByAddr: Record<string, Set<string>> = {};

    const limit = 2000;

    (async () => {
        try {
            /**
             * 4 parallele Queries an alle Relays:
             * - Kind 7: Reactions (Likes) — NIP-25
             * - Kind 1: Notes (Comments, aber ohne Quotes)
             * - Kind 6: Reposts
             * - Kind 9735: Zap Receipts — NIP-57
             * 
             * Filter: #a = Addressable Reference auf unsere Artikel
             */
            const [likes, comments, reposts, zaps] = await withTimeout(
                Promise.all([
                    pool.querySync(RELAYS, { kinds: [7], "#a": addrs, limit }),
                    pool.querySync(RELAYS, { kinds: [1], "#a": addrs, limit }),
                    pool.querySync(RELAYS, { kinds: [6], "#a": addrs, limit }),
                    pool.querySync(RELAYS, { kinds: [9735], "#a": addrs, limit }),
                ]),
            );

            // Likes: Nur content === "+" zählt als Like (NIP-25), de-duped per Pubkey
            for (const ev of likes || []) {
                if ((ev.content || "").trim() !== "+") continue;
                for (const a of targetsFor(ev)) {
                    (likePubkeysByAddr[a] ||= new Set());
                    if (!likePubkeysByAddr[a].has(ev.pubkey)) {
                        likePubkeysByAddr[a].add(ev.pubkey);
                        stats[a].likes += 1;
                    }
                }
            }

            // Comments: Kind 1 die auf den Artikel referenzieren, OHNE Quotes
            for (const ev of comments || []) {
                if (isQuote(ev)) continue;
                for (const a of targetsFor(ev)) stats[a].comments += 1;
            }

            // Reposts: Kind 6
            for (const ev of reposts || []) {
                for (const a of targetsFor(ev)) stats[a].reposts += 1;
            }

            // Zaps: Kind 9735 — TODO: Sat-Summe extrahieren statt nur Count
            for (const ev of zaps || []) {
                for (const a of targetsFor(ev)) stats[a].zaps += 1;
            }

            // Stats in DOM schreiben
            for (const el of statEls) {
                const a = el.getAttribute("data-engagement-a") || "";
                const field = el.getAttribute("data-engagement-field") || "";
                const val = stats[a] && field in stats[a] ? stats[a][field as keyof typeof stats[typeof a]] : 0;
                el.textContent = String(val ?? 0);
            }
        } catch (e) {
            // Bei Fehler/Timeout bleiben die Platzhalter (— oder 0) stehen
            console.warn("engagement stats client-side error", e);
        } finally {
            try {
                pool.close(RELAYS);
            } catch {}
        }
    })();
}
