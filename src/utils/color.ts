import { FluxNodeType, Settings } from "./types";

export function adjustColor(color: string, amount: number) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

export function getFluxNodeTypeColor(type: FluxNodeType, proCon?: "pro" | "con"): string {
  switch (type) {
    case FluxNodeType.System:
      return "#C5E2F6";
    case FluxNodeType.User:
      if (proCon === "pro") return "#90EE90";
      if (proCon === "con") return "#F08080";
      return "#EEEEEE";
    case FluxNodeType.GPT:
      return "#d9f3d6";
    case FluxNodeType.TweakedGPT:
      return "#f7d0a1";
  }
}

export function getFluxNodeTypeDarkColor(type: FluxNodeType, proCon?: "pro" | "con"): string {
  switch (type) {
    case FluxNodeType.System:
      return "#5F8AF7";
    case FluxNodeType.User:
      if (proCon === "pro") return "#228B22";
      if (proCon === "con") return "#B22222";
      return "#A9ABAE";
    case FluxNodeType.GPT:
      return "#619F83";
    case FluxNodeType.TweakedGPT:
      return "#CB7937";
  }
}
