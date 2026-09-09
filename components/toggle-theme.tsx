"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Icon } from "./ui/icon";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
      cursor-pointer
      fixed right-2 bottom-2 rounded-full bg-neutral-200 p-0 dark:bg-neutral-800"
    >
      <span
        className="
          flex h-6 w-6 items-center justify-center rounded-full
          bg-black shadow-sm
          dark:bg-white
        "
      >
        {isDark ? (
          <Icon name="sunDim" className="h-4 w-4 text-black" />
        ) : (
          <Icon name="moon" className="h-4 w-4 text-white" />
        )}
      </span>
    </button>
  );
}
