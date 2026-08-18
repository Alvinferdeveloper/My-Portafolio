import figlet from "figlet";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function getNameBanner(): { desktop: string; mobile: string } {
  const desktop = figlet.textSync("ALBIN   FERNANDEZ", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  const mobile = figlet.textSync("ALBIN", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  return { desktop, mobile };
}

export function getBannerHtml(): string {
  const { desktop, mobile } = getNameBanner();
  return `<div class="ascii-banner-wrapper">
  <pre class="ascii-banner ascii-banner--desktop">${escapeHtml(desktop)}</pre>
  <pre class="ascii-banner ascii-banner--mobile">${escapeHtml(mobile)}</pre>
</div>`;
}

