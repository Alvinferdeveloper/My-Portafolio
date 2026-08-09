import figlet from "figlet";

export function getNameBanner(): string {
  return figlet.textSync("ALBIN", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });
}
