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

const chatDemo = document.querySelector<HTMLElement>(".chat-demo");
const chatMessageList = chatDemo?.querySelector<HTMLElement>(".chat-messages");
const chatRows = chatDemo
  ? Array.from(
      chatDemo.querySelectorAll<HTMLElement>(".chat-row:not(.chat-typing)")
    )
  : [];
const typingRows = chatDemo
  ? Array.from(chatDemo.querySelectorAll<HTMLElement>(".chat-typing"))
  : [];

let chatTimer: number | undefined;
let chatIsPlaying = false;
let chatStepIndex = 0;

const chatSequence: Array<{
  show?: HTMLElement;
  hide?: HTMLElement;
  reset?: boolean;
  wait: number;
}> =
  chatRows.length === 6 && typingRows.length === 3
    ? [
        { show: chatRows[0], wait: 700 },
        { show: typingRows[0], wait: 900 },
        { hide: typingRows[0], show: chatRows[1], wait: 1150 },
        { show: chatRows[2], wait: 1050 },
        { show: typingRows[1], wait: 900 },
        { hide: typingRows[1], show: chatRows[3], wait: 1200 },
        { show: chatRows[4], wait: 1050 },
        { show: typingRows[2], wait: 900 },
        { hide: typingRows[2], show: chatRows[5], wait: 2100 },
        { reset: true, wait: 550 },
      ]
    : [];

function resetChatRows() {
  [...chatRows, ...typingRows].forEach(row => {
    row.classList.remove("is-visible");
  });
  if (chatMessageList) chatMessageList.scrollTop = 0;
}

function stopChatCycle() {
  chatIsPlaying = false;
  if (chatTimer !== undefined) {
    window.clearTimeout(chatTimer);
    chatTimer = undefined;
  }
  resetChatRows();
}

function runChatStep() {
  if (!chatIsPlaying || chatSequence.length === 0) return;
  const step = chatSequence[chatStepIndex];
  if (!step) return;

  if (step.reset) {
    resetChatRows();
    chatStepIndex = 0;
  } else {
    step.hide?.classList.remove("is-visible");
    step.show?.classList.add("is-visible");
    if (step.show && !step.show.classList.contains("chat-typing")) {
      chatMessageList?.scrollTo({
        top: chatMessageList.scrollHeight,
        behavior: "smooth",
      });
    }
    chatStepIndex += 1;
  }

  chatTimer = window.setTimeout(runChatStep, step.wait);
}

function startChatCycle() {
  if (!chatDemo || chatSequence.length === 0) return;
  stopChatCycle();
  chatDemo.classList.remove("is-playing");
  void chatDemo.offsetWidth;
  chatDemo.classList.add("is-playing");
  chatIsPlaying = true;
  chatStepIndex = 0;
  runChatStep();
}

const animatedSections = Array.from(
  document.querySelectorAll<HTMLElement>(".publication-kanban, .chat-demo")
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (animatedSections.length > 0 && "IntersectionObserver" in window) {
  const visibilityObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const section = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (section === chatDemo) {
            startChatCycle();
          } else {
            section.classList.add("is-playing");
          }
        } else {
          section.classList.remove("is-playing");
          if (section === chatDemo) stopChatCycle();
        }
      });
    },
    { threshold: 0.2 }
  );

  const syncMotionPreference = () => {
    visibilityObserver.disconnect();
    if (reducedMotion.matches) {
      animatedSections.forEach(section => {
        section.classList.remove("is-playing");
      });
      stopChatCycle();
      return;
    }
    animatedSections.forEach(section => visibilityObserver.observe(section));
  };

  syncMotionPreference();
  reducedMotion.addEventListener("change", syncMotionPreference);
}
