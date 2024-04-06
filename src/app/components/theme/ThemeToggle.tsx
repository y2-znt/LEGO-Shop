"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import { Moon, SunMedium } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        variant="ghost"
        aria-label="toggle theme"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        <SunMedium
          size="25"
          className="rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"
        />

        <Moon
          size="25"
          className="absolute rotate-90 scale-0  transition-all dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only"></span>
      </Button>
    </div>
  );
};
