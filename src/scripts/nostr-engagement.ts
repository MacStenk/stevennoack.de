import { SimplePool } from "nostr-tools";

const RELAYS = [
    "wss://nos.lol",
    "wss://relay.damus.io",
    "wss://relay.primal.net",
];

const statEls = Array.from(document.querySelectorAll("[data-engagement-a][data-engagement-field]")) as HTMLElement[];
const addrs = Array.from(new Set(statEls.map((el) => el.getAttribute("data-engagement-a") || "").filter(Boolean)));
const addrSet = new Set(addrs);

if (addrs.length) {
    const pool = new SimplePool();

    const timeoutMs = 7000;
    const withTimeout = <T>(p: Promise<T>): Promise<T> =>
        Promise.race([
            p,
            new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
        ]);

    const isQuote = (ev: { tags?: string[][] }) => Array.isArray(ev.tags) && ev.tags.some((t) => t && t[0] === "q" && t[1]);

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

    const likePubkeysByAddr: Record<string, Set<string>> = {};

    const limit = 2000;

    (async () => {
        try {
            const [likes, comments, reposts, zaps] = await withTimeout(
                Promise.all([
                    pool.querySync(RELAYS, { kinds: [7], "#a": addrs, limit }),
                    pool.querySync(RELAYS, { kinds: [1], "#a": addrs, limit }),
                    pool.querySync(RELAYS, { kinds: [6], "#a": addrs, limit }),
                    pool.querySync(RELAYS, { kinds: [9735], "#a": addrs, limit }),
                ]),
            );

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

            for (const ev of comments || []) {
                if (isQuote(ev)) continue;
                for (const a of targetsFor(ev)) stats[a].comments += 1;
            }

            for (const ev of reposts || []) {
                for (const a of targetsFor(ev)) stats[a].reposts += 1;
            }

            for (const ev of zaps || []) {
                for (const a of targetsFor(ev)) stats[a].zaps += 1;
            }

            for (const el of statEls) {
                const a = el.getAttribute("data-engagement-a") || "";
                const field = el.getAttribute("data-engagement-field") || "";
                const val = stats[a] && field in stats[a] ? stats[a][field as keyof typeof stats[typeof a]] : 0;
                el.textContent = String(val ?? 0);
            }
        } catch (e) {
            console.warn("engagement stats client-side error", e);
        } finally {
            try {
                pool.close(RELAYS);
            } catch {}
        }
    })();
}
