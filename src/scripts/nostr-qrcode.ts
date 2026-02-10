/**
 * Nostr QR-Code Modal
 * 
 * STATUS: NICHT GETESTET (Stand: 2026-02-10)
 * 
 * Zeigt QR-Codes für Nostr-Identifier (npub, nevent, naddr)
 * 
 * Usage im HTML:
 * <button data-qr="npub1abc..." data-qr-label="npub">QR anzeigen</button>
 * 
 * Modal muss im HTML vorhanden sein:
 * <div id="qr-modal" hidden>
 *   <div id="qr-modal-title"></div>
 *   <div id="qr-modal-code"></div>
 *   <div id="qr-modal-qr"></div>
 *   <button data-qr-close>Schließen</button>
 * </div>
 */

import qrcode from "qrcode-generator";

const modal = document.getElementById("qr-modal");
const modalTitle = document.getElementById("qr-modal-title");
const modalCode = document.getElementById("qr-modal-code");
const modalQr = document.getElementById("qr-modal-qr");

/**
 * Öffnet das Modal mit QR-Code für den gegebenen Code
 */
const openModal = (code: string, label: string) => {
    if (!modal || !modalTitle || !modalCode || !modalQr) return;

    modalTitle.textContent = label ? `QR: ${label}` : "QR";
    modalCode.textContent = code;

    // QR-Code generieren (Type 0 = auto, Error Correction M = 15%)
    const qr = qrcode(0, "M");
    qr.addData(code);
    qr.make();

    // Als SVG rendern (skalierbar)
    const svg = qr.createSvgTag({
        scalable: true,
        margin: 2,
    });

    modalQr.innerHTML = svg;
    modal.removeAttribute("hidden");
};

/**
 * Schließt das Modal
 */
const closeModal = () => {
    if (!modal || !modalQr || !modalCode) return;
    modal.setAttribute("hidden", "");
    modalQr.innerHTML = "";
    modalCode.textContent = "";
};

// Click Handler für QR-Buttons und Close
document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;

    // QR öffnen bei Klick auf Element mit data-qr
    const btn = t.closest("[data-qr]");
    if (btn) {
        const code = btn.getAttribute("data-qr");
        const label = btn.getAttribute("data-qr-label") || "";
        if (code) openModal(code, label);
    }

    // Schließen bei Klick auf Element mit data-qr-close
    if (t.closest("[data-qr-close]")) {
        closeModal();
    }
});

// ESC zum Schließen
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// Klick auf Backdrop (Modal selbst) schließt auch
modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
