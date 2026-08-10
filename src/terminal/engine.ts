import { runCommand, escapeHtml, allAliases, type CommandEffect, type Theme } from "./commands";
import { ui, type Lang } from "../i18n/ui";
import { profile } from "@data/profile";

const HISTORY_KEY = "terminal.history";
const LANG_NOTICE_KEY = "terminal.langSwitchNotice";
const THEME_KEY = "terminal.theme";
const MAX_HISTORY = 50;

function isTheme(value: string | null): value is Theme {
  return value === "brand" || value === "matrix" || value === "amber";
}

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));
  } catch {
    // storage unavailable (private mode, quota) — history just won't persist
  }
}

function init(): void {
  const root = document.getElementById("terminal");
  const outputEl = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input") as HTMLInputElement | null;
  const bodyEl = document.getElementById("terminal-body");
  const bannerEl = document.querySelector<HTMLElement>(".ascii-banner");

  if (!root || !outputEl || !input || !bodyEl) return;

  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (isTheme(savedTheme)) root.dataset.theme = savedTheme;
  } catch {
    // ignore
  }
  let currentTheme: Theme = isTheme(root.dataset.theme ?? null) ? (root.dataset.theme as Theme) : "brand";

  const lang = (root.dataset.lang as Lang) || "es";
  const s = ui[lang];
  const bannerText = bannerEl?.textContent ?? "";
  const promptPrefix = `${s["prompt.user"]}@${s["prompt.host"]}:~$`;
  const bootHtml = outputEl.innerHTML;

  let history = loadHistory();
  let historyCursor = history.length;

  function scrollToBottom() {
    bodyEl!.scrollTop = bodyEl!.scrollHeight;
  }

  function appendHtml(html: string) {
    const wrapper = document.createElement("div");
    wrapper.className = "output-block";
    wrapper.innerHTML = html;
    outputEl!.appendChild(wrapper);
  }

  function echoCommand(command: string) {
    const line = document.createElement("div");
    line.className = "output-block terminal__line";
    line.innerHTML = `<span class="prompt-decorator">${promptPrefix}</span> <span class="echoed-command">${escapeHtml(command)}</span>`;
    outputEl!.appendChild(line);
  }

  async function handleEffect(effect: CommandEffect) {
    switch (effect.type) {
      case "navigate": {
        saveHistory(history);
        const targetLang = effect.path === "/" ? "es" : effect.path.replace(/\//g, "");
        try {
          sessionStorage.setItem(LANG_NOTICE_KEY, targetLang);
        } catch {
          // ignore
        }
        window.location.href = effect.path;
        return;
      }
      case "copy": {
        const text = effect.target === "email" ? profile.email : profile.phone;
        try {
          await navigator.clipboard.writeText(text);
          appendHtml(`<p class="output-success">${escapeHtml(text)} — ${s["contact.copied"]}</p>`);
        } catch {
          appendHtml(`<p class="output-error">${s["contact.copyError"]}</p>`);
        }
        return;
      }
      case "openResume": {
        window.open(effect.url, "_blank", "noopener,noreferrer");
        return;
      }
      case "theme": {
        currentTheme = effect.value;
        root!.dataset.theme = effect.value;
        try {
          localStorage.setItem(THEME_KEY, effect.value);
        } catch {
          // ignore
        }
        return;
      }
    }
  }

  async function executeCommand(rawInput: string) {
    const trimmed = rawInput.trim();
    echoCommand(trimmed);
    if (!trimmed) {
      scrollToBottom();
      return;
    }

    const historySnapshot = history.slice();
    history.push(trimmed);
    if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
    historyCursor = history.length;
    saveHistory(history);

    const args = trimmed.split(/\s+/).filter(Boolean);
    const result = await runCommand({ lang, args, rawInput: trimmed, history: historySnapshot, bannerText, currentTheme });

    if (result.clear) {
      outputEl!.innerHTML = bootHtml;
    } else if (result.html) {
      appendHtml(result.html);
    }

    if (result.effect) await handleEffect(result.effect);
    scrollToBottom();
  }

  function autocomplete() {
    const value = input!.value.trim().toLowerCase();
    if (!value) return;
    const matches = allAliases().filter((alias) => alias.startsWith(value));
    if (matches.length === 1) {
      input!.value = matches[0];
    } else if (matches.length > 1) {
      appendHtml(`<p class="output-hint">${matches.join("&nbsp;&nbsp;")}</p>`);
      scrollToBottom();
    }
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = input!.value;
      input!.value = "";
      void executeCommand(value);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyCursor > 0) {
        historyCursor -= 1;
        input!.value = history[historyCursor] ?? "";
        requestAnimationFrame(() => input!.setSelectionRange(input!.value.length, input!.value.length));
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyCursor < history.length) {
        historyCursor += 1;
        input!.value = history[historyCursor] ?? "";
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      autocomplete();
    }
  });

  root.addEventListener("click", () => {
    if (window.getSelection()?.toString()) return;
    input!.focus();
  });

  try {
    const notice = sessionStorage.getItem(LANG_NOTICE_KEY);
    if (notice === lang) {
      appendHtml(`<p class="output-success">${s["lang.current"]}: ${lang} ✓</p>`);
      sessionStorage.removeItem(LANG_NOTICE_KEY);
    }
  } catch {
    // ignore
  }

  input.focus();
  scrollToBottom();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
