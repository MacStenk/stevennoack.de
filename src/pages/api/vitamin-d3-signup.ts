import type { APIRoute } from "astro";

export const prerender = false;

const MAILERLITE_SUBSCRIBE_URL =
    "https://assets.mailerlite.com/jsonp/977546/forms/183364843631281988/subscribe";

function sanitize(value: unknown, maxLength = 254): string {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export const POST: APIRoute = async ({ request }) => {
    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return htmlResponse("Die Anmeldung konnte nicht gelesen werden.", 400);
    }

    const email = sanitize(formData.get("fields[email]"));
    const website = sanitize(formData.get("website"), 500);

    if (website) {
        return htmlResponse("Danke. Bitte pruefe dein E-Mail-Postfach.", 200);
    }

    if (!isValidEmail(email)) {
        return htmlResponse("Bitte gib eine gueltige E-Mail-Adresse ein.", 400);
    }

    const mailerliteData = new URLSearchParams();
    mailerliteData.set("fields[email]", email);
    mailerliteData.set("ml-submit", "1");
    mailerliteData.set("anticsrf", "true");

    try {
        const mailerliteResponse = await fetch(MAILERLITE_SUBSCRIBE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: mailerliteData.toString(),
        });

        if (!mailerliteResponse.ok) {
            const errorText = await mailerliteResponse.text();
            console.error(
                `[vitamin-d3-signup] MailerLite returned ${mailerliteResponse.status}: ${errorText}`,
            );
            return htmlResponse(
                "Die Anmeldung hat gerade nicht funktioniert. Bitte versuche es spaeter erneut.",
                502,
            );
        }

        return htmlResponse(
            "Danke. Bitte pruefe dein E-Mail-Postfach und bestaetige die Anmeldung.",
            200,
        );
    } catch (error) {
        console.error("[vitamin-d3-signup] Unexpected error:", error);
        return htmlResponse(
            "Die Anmeldung hat gerade nicht funktioniert. Bitte versuche es spaeter erneut.",
            500,
        );
    }
};

function htmlResponse(message: string, status: number): Response {
    return new Response(
        `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Vitamin D3 Guide</title>
    <style>
      body {
        margin: 0;
        background: #fffaf5;
        color: #1f2937;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem;
      }
      div {
        max-width: 32rem;
        text-align: center;
      }
      p {
        font-size: 1.125rem;
        line-height: 1.6;
      }
      a {
        color: #ea580c;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <div>
        <p>${escapeHtml(message)}</p>
        <p><a href="/vitamin-d3/">Zurueck zur Seite</a></p>
      </div>
    </main>
  </body>
</html>`,
        {
            status,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        },
    );
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => {
        switch (char) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
            default:
                return char;
        }
    });
}
