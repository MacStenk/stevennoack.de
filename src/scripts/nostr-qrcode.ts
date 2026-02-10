import qrcode from "qrcode-generator";

const modal = document.getElementById("qr-modal");
const modalTitle = document.getElementById("qr-modal-title");
const modalCode = document.getElementById("qr-modal-code");
const modalQr = document.getElementById("qr-modal-qr");

const openModal = (code: string, label: string) => {
    if (!modal || !modalTitle || !modalCode || !modalQr) return;

    modalTitle.textContent = label ? `QR: ${label}` : "QR";
    modalCode.textContent = code;

    const qr = qrcode(0, "M");
    qr.addData(code);
    qr.make();

    const svg = qr.createSvgTag({
        scalable: true,
        margin: 2,
    });

    modalQr.innerHTML = svg;
    modal.removeAttribute("hidden");
};

const closeModal = () => {
    if (!modal || !modalQr || !modalCode) return;
    modal.setAttribute("hidden", "");
    modalQr.innerHTML = "";
    modalCode.textContent = "";
};

document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;

    const btn = t.closest("[data-qr]");
    if (btn) {
        const code = btn.getAttribute("data-qr");
        const label = btn.getAttribute("data-qr-label") || "";
        if (code) openModal(code, label);
    }

    if (t.closest("[data-qr-close]")) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
