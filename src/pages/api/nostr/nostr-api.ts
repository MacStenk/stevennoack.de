import type { APIRoute } from "astro";
import { nip19, SimplePool } from "nostr-tools";

export const prerender = false;

const RELAYS = [
    "wss://relay.stevennoack.de",
    "wss://relay.primal.net",
    "wss://nos.lol",
];

export const GET: APIRoute = async ({ params }) => {
    const { id } = params;

    if (!id) {
        return new Response(JSON.stringify({ error: "No ID provided" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const pool = new SimplePool();

        // Decode ID and build filter
        let filter: any = {};
        try {
            const decoded = nip19.decode(id);
            if (decoded.type === "nevent") {
                filter = { ids: [decoded.data.id] };
            } else if (decoded.type === "note") {
                filter = { ids: [decoded.data] };
            } else if (decoded.type === "naddr") {
                filter = {
                    kinds: [decoded.data.kind],
                    authors: [decoded.data.pubkey],
                    "#d": [decoded.data.identifier],
                };
            } else {
                throw new Error("Unsupported ID type: " + decoded.type);
            }
        } catch (e) {
            // If decoding fails, assume it's a raw hex ID
            if (/^[0-9a-f]{64}$/.test(id)) {
                filter = { ids: [id] };
            } else {
                throw new Error("Invalid ID format");
            }
        }

        // Fetch event with timeout
        const event = await Promise.race([
            pool.get(RELAYS, filter),
            new Promise<null>((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), 5000),
            ),
        ]);

        pool.close(RELAYS);

        if (!event) {
            return new Response(JSON.stringify({ error: "Event not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Return the raw event as JSON
        return new Response(JSON.stringify(event, null, 2), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (e) {
        return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
};
