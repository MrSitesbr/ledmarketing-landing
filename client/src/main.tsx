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

const demoFrames = Array.from(
  document.querySelectorAll<HTMLIFrameElement>(
    "iframe[data-demo-frame][data-demo-src]"
  )
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getFrameShell(frame: HTMLIFrameElement): HTMLElement | null {
  return frame.closest<HTMLElement>(".demo-frame-shell");
}

function resizeDemoFrames() {
  demoFrames.forEach(frame => {
    const shell = getFrameShell(frame);
    const designWidth = Number(frame.dataset.frameWidth);
    const contentWidth = Number(frame.dataset.frameContentWidth) || designWidth;
    const designHeight = Number(frame.dataset.frameHeight);
    if (!shell || !designWidth || !contentWidth || !designHeight) return;

    const availableWidth = shell.getBoundingClientRect().width;
    const scale =
      availableWidth > 0 ? Math.min(1, availableWidth / contentWidth) : 1;
    frame.style.width = `${designWidth}px`;
    frame.style.height = `${designHeight}px`;
    frame.style.transform = `translateX(-50%) scale(${scale})`;
    shell.style.height = `${Math.ceil(designHeight * scale)}px`;
  });
}

function startDemo(frame: HTMLIFrameElement) {
  const source = frame.dataset.demoSrc;
  if (!source || frame.dataset.playing === "true") return;

  getFrameShell(frame)?.classList.remove("is-loaded");
  frame.dataset.playing = "true";
  const separator = source.includes("?") ? "&" : "?";
  frame.src = `${source}${separator}replay=${Date.now()}`;
}

function stopDemo(frame: HTMLIFrameElement) {
  if (frame.dataset.playing !== "true") return;
  frame.dataset.playing = "false";
  getFrameShell(frame)?.classList.remove("is-loaded");
  frame.removeAttribute("src");
}

demoFrames.forEach(frame => {
  frame.addEventListener("load", () => {
    if (frame.dataset.playing === "true") {
      getFrameShell(frame)?.classList.add("is-loaded");
    }
  });
});

function syncDemoPlayback() {
  resizeDemoFrames();
  if (reducedMotion.matches) {
    demoFrames.forEach(stopDemo);
    return;
  }
  demoFrames.forEach(startDemo);
}

syncDemoPlayback();
window.addEventListener("resize", resizeDemoFrames, { passive: true });
reducedMotion.addEventListener("change", syncDemoPlayback);

/* Simulação LedChat inline: mesmos fluxos do arquivo original enviado. */
type LedChatFlow = {
  title: string;
  bg: string;
  scroll: string;
  pairs: [string, string][];
  cta: string;
};

const ledchatFlows: LedChatFlow[] = [
  {
    title: "Assistente p/ Imóveis",
    bg: "#1a1c2a",
    scroll: "#3b82f6",
    pairs: [
      [
        "Olá, estou procurando um apartamento.",
        "Claro! Você pretende comprar ou alugar?",
      ],
      ["Comprar, com dois quartos.", "Perfeito! Em qual região você prefere?"],
      ["Perto da praia.", "Ótima escolha! Qual faixa de valor?"],
      ["Até 450 mil.", "Tenho ótimas opções dentro desse perfil."],
    ],
    cta: "Posso te enviar algumas opções.",
  },
  {
    title: "Assistente p/ Estética",
    bg: "#5e1ab5",
    scroll: "#c084fc",
    pairs: [
      [
        "Oi, queria cuidar melhor da minha pele.",
        "Que ótimo! Você já faz algum tratamento?",
      ],
      ["Nunca fiz.", "Podemos começar com uma limpeza de pele profunda."],
      ["Ajuda mesmo?", "Sim! Melhora textura, viço e saúde da pele."],
    ],
    cta: "Posso agendar sua avaliação.",
  },
  {
    title: "Assistente p/ Advocacia",
    bg: "#024d3a",
    scroll: "#10b981",
    pairs: [
      ["Preciso de orientação jurídica.", "Em qual área posso ajudar?"],
      ["Trabalhista.", "É sobre rescisão ou direitos não pagos?"],
      ["Sim.", "Podemos analisar seu caso com calma."],
    ],
    cta: "Posso agendar uma consulta.",
  },
];

const ledchatApp = document.querySelector<HTMLElement>("#ledchat-app");
const ledchatHeader = document.querySelector<HTMLElement>("#ledchat-header");
const ledchatMessages =
  document.querySelector<HTMLElement>("#ledchat-messages");
const ledchatInput = document.querySelector<HTMLElement>("#ledchat-input");

if (ledchatApp && ledchatHeader && ledchatMessages && ledchatInput) {
  const app = ledchatApp;
  const header = ledchatHeader;
  const messages = ledchatMessages;
  const input = ledchatInput;
  const ICON_USER =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  const ICON_BOT =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';

  let flowIndex = 0;
  let step = 0;

  function applyLedchatTheme(flow: LedChatFlow) {
    app.style.setProperty("--ledchat-bg", flow.bg);
    app.style.setProperty("--ledchat-scroll-thumb", flow.scroll);
  }

  function addLedchatRow(from: "user" | "ia", text: string) {
    const row = document.createElement("div");
    row.className =
      from === "user"
        ? "ledchat-sim-row ledchat-sim-row-user"
        : "ledchat-sim-row";
    row.innerHTML = `<div class="ledchat-sim-avatar">${from === "user" ? ICON_USER : ICON_BOT}</div><div class="ledchat-sim-bubble ledchat-sim-bubble-${from}">${text}</div>`;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function addLedchatTyping() {
    const row = document.createElement("div");
    row.className = "ledchat-sim-row";
    row.innerHTML = `<div class="ledchat-sim-avatar">${ICON_BOT}</div><div class="ledchat-sim-bubble ledchat-sim-bubble-ia ledchat-sim-typing"><span class="ledchat-sim-dot"></span><span class="ledchat-sim-dot"></span><span class="ledchat-sim-dot"></span></div>`;
    messages.appendChild(row);
    return row;
  }

  async function ledchatBot(text: string) {
    const typing = addLedchatTyping();
    await new Promise(resolve => setTimeout(resolve, 800));
    typing.remove();
    addLedchatRow("ia", text);
  }

  async function runLedchatFlow() {
    if (!app.isConnected) return;
    const flow = ledchatFlows[flowIndex];
    const [question, answer] = flow.pairs[step];

    input.textContent = question;
    await new Promise(resolve => setTimeout(resolve, 400));
    addLedchatRow("user", question);
    input.textContent = "";
    await ledchatBot(answer);

    step += 1;

    if (step >= flow.pairs.length) {
      await ledchatBot(flow.cta);
      await new Promise(resolve => setTimeout(resolve, 1400));
      flowIndex = (flowIndex + 1) % ledchatFlows.length;
      step = 0;
      messages.innerHTML = "";
      applyLedchatTheme(ledchatFlows[flowIndex]);
      header.textContent = ledchatFlows[flowIndex].title;
    }

    setTimeout(runLedchatFlow, 2000);
  }

  applyLedchatTheme(ledchatFlows[0]);
  header.textContent = ledchatFlows[0].title;

  if (reducedMotion.matches) {
    const [firstQuestion, firstAnswer] = ledchatFlows[0].pairs[0];
    input.textContent = firstQuestion;
    addLedchatRow("user", firstQuestion);
    input.textContent = "";
    addLedchatRow("ia", firstAnswer);
  } else {
    runLedchatFlow();
  }
}
