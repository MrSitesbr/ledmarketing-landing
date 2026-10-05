import "./index.css";

const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mainNav = document.querySelector<HTMLElement>("#main-nav");

function closeMenu() {
  if (!menuButton || !mainNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  mainNav.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
  if (!mainNav) return;
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav?.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

const leadForm = document.querySelector<HTMLFormElement>("#lead-form");
const formStatus = document.querySelector<HTMLElement>("#lead-form-status");

leadForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!leadForm.reportValidity()) return;

  const formData = new FormData(leadForm);
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const lines = [
    "Olá, Led Marketing! Quero conversar sobre o marketing da minha empresa.",
    `Nome: ${name}`,
    company ? `Empresa: ${company}` : "",
    `WhatsApp para contato: ${phone}`,
    `Principal interesse: ${interest}`,
  ].filter(Boolean);

  const whatsappUrl = new URL("https://api.whatsapp.com/send/");
  whatsappUrl.searchParams.set("phone", "5511974698846");
  whatsappUrl.searchParams.set("text", lines.join("\n"));
  whatsappUrl.searchParams.set("type", "phone_number");
  whatsappUrl.searchParams.set("app_absent", "0");

  const whatsappWindow = window.open(whatsappUrl.toString(), "_blank");
  if (whatsappWindow) {
    whatsappWindow.opener = null;
    if (formStatus) {
      formStatus.textContent =
        "O WhatsApp foi aberto. Revise e envie a mensagem para a Led.";
    }
    return;
  }

  if (formStatus) {
    formStatus.textContent =
      "Abrindo o WhatsApp nesta aba para você revisar e enviar a mensagem.";
  }
  window.location.assign(whatsappUrl.toString());
});

const year = document.querySelector<HTMLElement>("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
