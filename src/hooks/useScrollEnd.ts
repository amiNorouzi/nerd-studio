"use client";
import { useEffect } from "react";

export function useScrollEnd<T>(el: HTMLElement | null, value: T) {
  useEffect(() => {
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [value, el]);
}
