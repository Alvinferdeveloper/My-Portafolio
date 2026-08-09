import figlet from "figlet";

export function getNameBanner(): string {
  return figlet.textSync("ALBIN   FERNANDEZ", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });
}
