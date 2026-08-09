import { ui, type Lang } from "../i18n/ui";
import { profile } from "@data/profile";
import { experience } from "@data/experience";
import { proyects } from "@data/proyects";
import { logos } from "@data/logos";
import { pathForLang } from "../i18n/utils";

export interface CommandContext {
  lang: Lang;
  args: string[];
  rawInput: string;
  history: string[];
  bannerText: string;
}

export type CommandEffect =
  | { type: "navigate"; path: string }
  | { type: "copy"; target: "email" | "phone" }
  | { type: "openResume" };

export interface CommandOutput {
  html: string;
  clear?: boolean;
  effect?: CommandEffect;
}

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPE_MAP[c]);
}

interface CommandDef {
  id: string;
  aliases: string[];
  description: Record<Lang, string>;
}

export const COMMAND_DEFS: CommandDef[] = [
  { id: "help", aliases: ["help", "ayuda"], description: { es: "Muestra esta lista de comandos.", en: "Shows this list of commands." } },
  { id: "about", aliases: ["about", "sobre-mi"], description: { es: "Información sobre mí.", en: "Information about me." } },
  { id: "whoami", aliases: ["whoami"], description: { es: "Quién soy, en una línea.", en: "Who I am, in one line." } },
  { id: "experience", aliases: ["experience", "experiencia"], description: { es: "Mi experiencia laboral.", en: "My work experience." } },
  { id: "skills", aliases: ["skills", "habilidades"], description: { es: "Tecnologías que domino.", en: "Technologies I work with." } },
  { id: "projects", aliases: ["projects", "proyectos"], description: { es: "Lista de proyectos (projects <n> para detalle).", en: "List of projects (projects <n> for detail)." } },
  { id: "contact", aliases: ["contact", "contacto"], description: { es: "Cómo contactarme.", en: "How to reach me." } },
  { id: "resume", aliases: ["resume", "cv"], description: { es: "Descarga mi currículum.", en: "Download my resume." } },
  { id: "lang", aliases: ["lang", "idioma"], description: { es: "Cambia el idioma (lang es|en).", en: "Switch language (lang es|en)." } },
  { id: "clear", aliases: ["clear", "limpiar", "cls"], description: { es: "Limpia la pantalla.", en: "Clears the screen." } },
  { id: "history", aliases: ["history", "historial"], description: { es: "Muestra el historial de comandos.", en: "Shows the command history." } },
  { id: "banner", aliases: ["banner"], description: { es: "Vuelve a mostrar el banner ASCII.", en: "Reprints the ASCII banner." } },
  { id: "neofetch", aliases: ["neofetch"], description: { es: "Resumen estilo system-info.", en: "System-info style summary." } },
  { id: "sudo", aliases: ["sudo"], description: { es: "Intenta ejecutar algo como superusuario.", en: "Try to run something as superuser." } },
  { id: "date", aliases: ["date", "fecha"], description: { es: "Muestra la fecha y hora actual.", en: "Shows the current date and time." } },
  { id: "echo", aliases: ["echo"], description: { es: "Repite el texto que escribas.", en: "Echoes back the text you type." } },
];

const ALIAS_MAP: Record<string, string> = {};
for (const def of COMMAND_DEFS) {
  for (const alias of def.aliases) ALIAS_MAP[alias] = def.id;
}

export function allAliases(): string[] {
  return Object.keys(ALIAS_MAP);
}

function renderTechTags(technologies: readonly string[]): string {
  return `<div class="tech-tags">${technologies
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join("")}</div>`;
}

function renderHelp(lang: Lang): string {
  const s = ui[lang];
  const rows = COMMAND_DEFS.map(
    (def) =>
      `<dt>${def.aliases.join(", ")}</dt><dd>${escapeHtml(def.description[lang])}</dd>`
  ).join("");
  return `<p class="output-title">${s["help.title"]}</p><dl class="help-list">${rows}</dl><p class="output-hint">${s["help.footer"]}</p>`;
}

function renderAbout(lang: Lang): string {
  const s = ui[lang];
  const p = profile[lang];
  return `
    <p class="output-title">${s["about.title"]}</p>
    <p><span class="field-label">${s["about.nameLabel"]}:</span> ${escapeHtml(profile.name)}</p>
    <p><span class="field-label">${s["about.locationLabel"]}:</span> ${escapeHtml(p.location)}</p>
    <p class="bio-text">${escapeHtml(p.bio)}</p>
    <p class="output-hint">${s["about.resumeCta"]}</p>
  `;
}

function renderWhoami(lang: Lang): string {
  return `<p>${escapeHtml(profile[lang].whoami)}</p>`;
}

function renderExperience(lang: Lang): string {
  const s = ui[lang];
  const blocks = experience
    .map((job) => {
      const t = job[lang];
      const activities = t.activities.map((a: string) => `<li>${escapeHtml(a)}</li>`).join("");
      return `
        <div class="experience-entry">
          <div class="experience-entry__header">
            <img class="experience-entry__logo" src="${job.logo}" alt="${escapeHtml(job.company)} logo" loading="lazy" />
            <div>
              <p class="experience-entry__company">${escapeHtml(job.company)}</p>
              <p class="experience-entry__position">${escapeHtml(t.position)}</p>
              <p class="experience-entry__date">${escapeHtml(t.date)}</p>
            </div>
          </div>
          <ul class="experience-entry__activities">${activities}</ul>
        </div>
      `;
    })
    .join("");
  return `<p class="output-title">${s["experience.title"]}</p>${blocks}`;
}

function renderSkills(lang: Lang): string {
  const s = ui[lang];
  const items = logos
    .map(
      (logo) =>
        `<div class="skill-chip"><img src="${logo.url}" alt="${escapeHtml(logo.name)}" loading="lazy" /><span>${escapeHtml(logo.name)}</span></div>`
    )
    .join("");
  return `<p class="output-title">${s["skills.title"]}</p><div class="skills-grid">${items}</div>`;
}

function renderProjectsList(lang: Lang): string {
  const s = ui[lang];
  const items = proyects
    .map((proj, index) => {
      const t = proj[lang];
      return `
        <li>
          <span class="project-index">${index + 1}.</span>
          <span class="project-name">${escapeHtml(proj.name)}</span>
          <span class="project-summary">${escapeHtml(t.description).slice(0, 90)}${t.description.length > 90 ? "…" : ""}</span>
        </li>
      `;
    })
    .join("");
  return `<p class="output-title">${s["projects.title"]}</p><ol class="projects-list">${items}</ol><p class="output-hint">${s["projects.hint"]}</p>`;
}

function renderProjectDetail(lang: Lang, index: number): string {
  const s = ui[lang];
  const proj = proyects[index];
  if (!proj) return `<p class="output-error">${s["projects.notFound"]}</p>`;
  const t = proj[lang];
  const links = [
    proj.demo_url
      ? `<a href="${proj.demo_url}" target="_blank" rel="noopener noreferrer">${s["projects.demo"]} &#8599;</a>`
      : "",
    `<a href="${proj.github_url}" target="_blank" rel="noopener noreferrer">${s["projects.code"]} &#8599;</a>`,
  ]
    .filter(Boolean)
    .join(" · ");
  return `
    <div class="project-detail">
      <img class="project-detail__image" src="${proj.image}" alt="${escapeHtml(proj.name)}" loading="lazy" />
      <p class="output-title">${escapeHtml(proj.name)}</p>
      <p>${escapeHtml(t.description)}</p>
      <p><span class="field-label">${s["projects.stack"]}:</span></p>
      ${renderTechTags(proj.technologies)}
      <p class="project-detail__links">${links}</p>
    </div>
  `;
}

function isCopyTarget(value: string | undefined): value is "email" | "phone" {
  return value === "email" || value === "phone";
}

function isLang(value: string | undefined): value is Lang {
  return value === "es" || value === "en";
}

function renderContact(lang: Lang, args: string[]): CommandOutput {
  const s = ui[lang];
  if (args[0] === "copy") {
    const target = args[1];
    if (!isCopyTarget(target)) {
      return { html: `<p class="output-error">${s["contact.copyUsage"]}</p>` };
    }
    return { html: "", effect: { type: "copy", target } };
  }
  const html = `
    <p class="output-title">${s["contact.title"]}</p>
    <p>${s["contact.description"]}</p>
    <p><span class="field-label">${s["contact.emailLabel"]}:</span> ${escapeHtml(profile.email)}</p>
    <p><span class="field-label">${s["contact.phoneLabel"]}:</span> ${escapeHtml(profile.phone)}</p>
    <p class="output-hint">${s["contact.copyHint"]}</p>
    <p>${s["contact.alsoFind"]}</p>
    <p class="contact-links">
      <a href="${profile.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub &#8599;</a> ·
      <a href="${profile.linkedinUrl}" target="_blank" rel="noopener noreferrer">LinkedIn &#8599;</a>
    </p>
  `;
  return { html };
}

function renderNeofetch(lang: Lang, ctx: CommandContext): string {
  const s = ui[lang];
  const p = profile[lang];
  const stack = ["TypeScript", "Next.js", "Node.js", "React"].join(", ");
  return `
    <div class="neofetch">
      <pre class="ascii-banner">${escapeHtml(ctx.bannerText)}</pre>
      <dl class="neofetch-facts">
        <dt>${s["neofetch.role"]}</dt><dd>${escapeHtml(p.title)}</dd>
        <dt>${s["neofetch.location"]}</dt><dd>${escapeHtml(p.location)}</dd>
        <dt>${s["neofetch.stack"]}</dt><dd>${escapeHtml(stack)}</dd>
        <dt>${s["neofetch.focus"]}</dt><dd>${s["neofetch.focusValue"]}</dd>
      </dl>
    </div>
  `;
}

function renderHistory(lang: Lang, history: string[]): string {
  const s = ui[lang];
  if (history.length === 0) return `<p>${s["history.empty"]}</p>`;
  const rows = history
    .map((cmd, i) => `<li><span class="history-index">${i + 1}</span> ${escapeHtml(cmd)}</li>`)
    .join("");
  return `<p class="output-title">${s["history.title"]}</p><ol class="history-list">${rows}</ol>`;
}

function renderDate(lang: Lang): string {
  const locale = lang === "es" ? "es-NI" : "en-US";
  return `<p>${escapeHtml(new Date().toLocaleString(locale))}</p>`;
}

export async function runCommand(ctx: CommandContext): Promise<CommandOutput> {
  const { lang, args, rawInput } = ctx;
  const s = ui[lang];
  const token = (args[0] ?? "").toLowerCase();

  if (!token) return { html: "" };

  const id = ALIAS_MAP[token];

  if (!id) {
    return {
      html: `<p class="output-error">${s["notFound.prefix"]} ${escapeHtml(rawInput)}</p><p class="output-hint">${s["notFound.hint"]}</p>`,
    };
  }

  const rest = args.slice(1);

  switch (id) {
    case "help":
      return { html: renderHelp(lang) };
    case "about":
      return { html: renderAbout(lang) };
    case "whoami":
      return { html: renderWhoami(lang) };
    case "experience":
      return { html: renderExperience(lang) };
    case "skills":
      return { html: renderSkills(lang) };
    case "projects": {
      if (rest.length === 0) return { html: renderProjectsList(lang) };
      const n = Number.parseInt(rest[0], 10);
      if (Number.isNaN(n)) return { html: renderProjectsList(lang) };
      return { html: renderProjectDetail(lang, n - 1) };
    }
    case "contact":
      return renderContact(lang, rest);
    case "resume":
      return {
        html: `<p>${s["resume.opening"]}</p>${lang === "en" ? `<p class="output-hint">${s["resume.onlySpanish"]}</p>` : ""}`,
        effect: { type: "openResume" },
      };
    case "lang": {
      const target = rest[0]?.toLowerCase();
      if (!isLang(target)) {
        return {
          html: `<p><span class="field-label">${s["lang.current"]}:</span> ${lang}</p><p class="output-hint">${s["lang.usage"]}</p>`,
        };
      }
      if (target === lang) {
        return { html: `<p><span class="field-label">${s["lang.current"]}:</span> ${lang}</p>` };
      }
      return { html: `<p>${s["lang.switching"]} ${target}...</p>`, effect: { type: "navigate", path: pathForLang(target) } };
    }
    case "clear":
      return { html: "", clear: true };
    case "history":
      return { html: renderHistory(lang, ctx.history) };
    case "banner":
      return { html: `<pre class="ascii-banner">${escapeHtml(ctx.bannerText)}</pre>` };
    case "neofetch":
      return { html: renderNeofetch(lang, ctx) };
    case "sudo":
      return { html: `<p class="output-error">${s["sudo.response"]}</p>` };
    case "date":
      return { html: renderDate(lang) };
    case "echo":
      return { html: rest.length ? `<p>${escapeHtml(rest.join(" "))}</p>` : `<p class="output-hint">${s["echo.usage"]}</p>` };
    default:
      return {
        html: `<p class="output-error">${s["notFound.prefix"]} ${escapeHtml(rawInput)}</p><p class="output-hint">${s["notFound.hint"]}</p>`,
      };
  }
}
