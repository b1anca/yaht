export const COLORS = {
  blue100: "rgb(224 242 254)", // sky
  blue200: "rgb(186 230 253)",
  blue300: "rgb(125 211 252)",
  blue400: "rgb(56 189 248)",
  blue500: "rgb(14 165 233)",
  blue600: "rgb(2 132 199)",
  blue700: "rgb(3 105 161)",
  blue800: "rgb(7 89 133)",
  blue900: "rgb(12 74 110)",
  blue950: "rgb(8 47 73)",
  green300: "rgb(134 239 172)",
  green600: "rgb(22 163 74)",
  green800: "rgb(22 101 52)",
  green950: "rgb(5 46 22)",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  lime300: "rgb(190 242 100)",
  lime400: "rgb(163 230 53)",
  lime500: "rgb(132 204 22)",
  lime600: "rgb(101 163 13)",
  lime700: "rgb(77 124 15)",
  zinc600: "rgb(82 82 91)",
  red500: "rgb(239 68 68)",
};

export const TEXT_COLORS = {
  base: "text-zinc-600/90 dark:text-zinc-100/90",
  primary: "text-green-700/90",
  secondary: "text-zinc-600/90 dark:text-zinc-200/70", // muted
  light: "text-zinc-100/90",
};

export const BG_COLORS = {
  primary: "bg-green-700 hover:bg-green-700/90",
  secondary: "!bg-slate-200 dark:!bg-[#24292E]",
};

export const BORDER_STYLES = {
  default: "border rounded border-slate-900/10 dark:border-slate-100/10",
  light: "border rounded !border-slate-100/30",
};

export const BUTTON_STYLES = {
  base: "text-base whitespace-nowrap py-2 px-4 justify-center font-extrabold py-2.5 px-4",
  primary: `w-full shadow rounded-lg ${TEXT_COLORS.light} ${BG_COLORS.primary}`,
  secondary: `shadow rounded-lg ${TEXT_COLORS.primary} border border-green-700/90 dark:border-green-700/90`,
};

export const DEFAULT_HABIT_COLOR = COLORS.slate300;
