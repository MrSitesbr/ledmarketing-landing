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
let manualMotionOptIns = new WeakSet<HTMLIFrameElement>();

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

function startDemo(frame: HTMLIFrameElement, restart = false) {
  const source = frame.dataset.demoSrc;
  if (!source || (!restart && frame.dataset.playing === "true")) return;

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

function replayFrameFor(button: HTMLButtonElement) {
  const kind = button.dataset.demoReplay;
  const frame = demoFrames.find(
    candidate => candidate.dataset.demoFrame === kind
  );
  if (!frame) return;

  manualMotionOptIns.add(frame);
  frame.scrollIntoView({
    behavior: reducedMotion.matches ? "auto" : "smooth",
    block: "center",
  });
  const bounds = frame.getBoundingClientRect();
  const isVisible =
    bounds.width > 0 &&
    bounds.height > 0 &&
    bounds.top < window.innerHeight &&
    bounds.bottom > 0 &&
    bounds.left < window.innerWidth &&
    bounds.right > 0;

  if ("IntersectionObserver" in window && !isVisible) {
    stopDemo(frame);
    return;
  }
  startDemo(frame, true);
}

document
  .querySelectorAll<HTMLButtonElement>("[data-demo-replay]")
  .forEach(button => {
    button.addEventListener("click", () => replayFrameFor(button));
  });

resizeDemoFrames();
window.addEventListener("resize", resizeDemoFrames, { passive: true });

if ("IntersectionObserver" in window) {
  const visibilityObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const frame = entry.target as HTMLIFrameElement;
        if (entry.isIntersecting) {
          if (!reducedMotion.matches || manualMotionOptIns.has(frame)) {
            startDemo(frame);
          }
        } else {
          stopDemo(frame);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px 72px 0px" }
  );

  const observeFrames = () => {
    visibilityObserver.disconnect();
    demoFrames.forEach(frame => visibilityObserver.observe(frame));
  };

  observeFrames();
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      manualMotionOptIns = new WeakSet<HTMLIFrameElement>();
      demoFrames.forEach(stopDemo);
    }
    observeFrames();
  });
} else if (!reducedMotion.matches) {
  demoFrames.forEach(frame => startDemo(frame));
}
