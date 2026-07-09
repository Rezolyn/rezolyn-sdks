import { sendMessage } from "./api";
import { STYLES } from "./styles";
import type { ChatMessage, WidgetConfig } from "./types";

// In-memory only — no localStorage, no cookies. Cleared on page refresh.
const sessionId = crypto.randomUUID();
const history: ChatMessage[] = [];

function readConfig(script: HTMLScriptElement): WidgetConfig {
  const publishableKey = script.dataset.key;
  const projectId = script.dataset.project;
  if (!publishableKey || !projectId) {
    throw new Error("LingoHQ widget: data-key and data-project are required on the script tag");
  }
  return {
    publishableKey,
    projectId,
    apiUrl: script.dataset.apiUrl ?? "https://api.lingohq.io",
  };
}

function mount(config: WidgetConfig): void {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = STYLES;
  root.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "launcher";
  launcher.setAttribute("aria-label", "Open chat");
  launcher.textContent = "💬";
  root.appendChild(launcher);

  const panel = document.createElement("div");
  panel.className = "panel";
  panel.innerHTML = `
    <div class="header">Chat with us</div>
    <div class="messages"></div>
    <div class="composer">
      <input type="text" placeholder="Type a message…" />
      <button type="button">Send</button>
    </div>
  `;
  root.appendChild(panel);

  const messagesEl = panel.querySelector<HTMLDivElement>(".messages")!;
  const inputEl = panel.querySelector<HTMLInputElement>("input")!;
  const sendEl = panel.querySelector<HTMLButtonElement>("button")!;

  launcher.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  function renderMessage(msg: ChatMessage): void {
    const el = document.createElement("div");
    el.className = `msg ${msg.role}`;
    el.textContent = msg.text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function handleSend(): Promise<void> {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = "";
    inputEl.disabled = true;
    sendEl.disabled = true;

    const userMsg: ChatMessage = { role: "user", text };
    history.push(userMsg);
    renderMessage(userMsg);

    try {
      const result = await sendMessage(config, sessionId, text);
      const reply: ChatMessage = { role: "assistant", text: result.suggestion };
      history.push(reply);
      renderMessage(reply);
    } catch {
      renderMessage({ role: "assistant", text: "Sorry, something went wrong. Please try again." });
    } finally {
      inputEl.disabled = false;
      sendEl.disabled = false;
      inputEl.focus();
    }
  }

  sendEl.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
}

const currentScript = document.currentScript as HTMLScriptElement | null;
if (currentScript) {
  mount(readConfig(currentScript));
}
