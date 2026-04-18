/**
 * Kontaktformular-Endpunkt
 *
 * Empfängt POST-Requests vom Formular auf /kontakt und schickt via Resend
 * eine Mail an kontakt@stevennoack.de. Reply-To wird auf den Absender gesetzt,
 * damit ich direkt antworten kann.
 *
 * Spam-Schutz:
 *  - Honeypot-Feld "website" (muss leer bleiben, sonst: stille Ablehnung)
 *  - Rate-Limit ist aktuell nicht gesetzt, siehe Cloudflare Dashboard für
 *    Page-Rule-basierte Limits falls nötig.
 */

import type { APIRoute } from "astro";

// Diese Route darf nicht vorgerendert werden (braucht Server-Logik)
export const prerender = false;

interface ContactPayload {
    name: string;
    email: string;
    subject?: string;
    message: string;
    website?: string; // Honeypot — muss leer bleiben
}

function sanitize(value: unknown, maxLength = 5000): string {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
    // Pragmatisch, nicht RFC-5322-perfekt — aber gut genug für Formulare
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export const POST: APIRoute = async ({ request, locals }) => {
    // Content-Type prüfen
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        return jsonResponse({ error: "Expected application/json" }, 400);
    }

    let payload: ContactPayload;
    try {
        payload = (await request.json()) as ContactPayload;
    } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    // Honeypot: Wenn das Feld "website" ausgefüllt ist, ist's ein Bot.
    // Kein Fehler zurück — stille Erfolgsmeldung, damit der Bot nichts lernt.
    if (payload.website && payload.website.length > 0) {
        return jsonResponse({ ok: true }, 200);
    }

    // Felder säubern und prüfen
    const name = sanitize(payload.name, 200);
    const email = sanitize(payload.email, 254);
    const subject = sanitize(payload.subject ?? "Anfrage über stevennoack.de", 200);
    const message = sanitize(payload.message, 10000);

    if (!name || !email || !message) {
        return jsonResponse(
            { error: "Name, E-Mail und Nachricht sind Pflichtfelder." },
            400,
        );
    }

    if (!isValidEmail(email)) {
        return jsonResponse(
            { error: "Die E-Mail-Adresse sieht nicht gültig aus." },
            400,
        );
    }

    if (message.length < 10) {
        return jsonResponse(
            { error: "Die Nachricht ist zu kurz." },
            400,
        );
    }

    // API-Key holen: In Produktion aus Cloudflare-Env-Vars (via runtime),
    // in Dev aus import.meta.env / process.env.
    const apiKey =
        (locals as any)?.runtime?.env?.RESEND_API_KEY ??
        import.meta.env.RESEND_API_KEY ??
        process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("[contact] RESEND_API_KEY fehlt in der Umgebung");
        return jsonResponse(
            { error: "Server-Konfiguration unvollständig. Bitte später nochmal probieren." },
            500,
        );
    }

    // Mail bauen und via Resend schicken
    const mailBody = buildMailBody({ name, email, subject, message });

    try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Kontaktformular <kontakt@stevennoack.de>",
                to: ["kontakt@stevennoack.de"],
                reply_to: email,
                subject: `[stevennoack.de] ${subject}`,
                text: mailBody,
            }),
        });

        if (!resendResponse.ok) {
            const errorText = await resendResponse.text();
            console.error(`[contact] Resend returned ${resendResponse.status}: ${errorText}`);
            return jsonResponse(
                { error: "Mailversand fehlgeschlagen. Bitte später nochmal probieren." },
                502,
            );
        }

        return jsonResponse({ ok: true, message: "Nachricht gesendet." }, 200);
    } catch (error) {
        console.error("[contact] Unexpected error:", error);
        return jsonResponse(
            { error: "Unerwarteter Fehler beim Senden." },
            500,
        );
    }
};

function buildMailBody(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): string {
    return [
        `Neue Nachricht über das Kontaktformular auf stevennoack.de`,
        ``,
        `Von:     ${data.name} <${data.email}>`,
        `Betreff: ${data.subject}`,
        ``,
        `---`,
        ``,
        data.message,
        ``,
        `---`,
        `Reply-To ist auf den Absender gesetzt — einfach 'Antworten' drücken.`,
    ].join("\n");
}

function jsonResponse(body: unknown, status: number): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
            // Nur das eigene Origin darf das Formular absenden
            "Access-Control-Allow-Origin": "https://stevennoack.de",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

// OPTIONS-Handler für CORS-Preflight (falls mal nötig)
export const OPTIONS: APIRoute = () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "https://stevennoack.de",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};
