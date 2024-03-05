"use client";
import React, { useEffect, useState } from "react";

export function useFullScreenElement(
  el: React.MutableRefObject<HTMLElement | null>,
) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleIsActive() {
      if (document.fullscreenElement != null) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
    document.addEventListener("fullscreenchange", handleIsActive);

    return () => {
      document.removeEventListener("fullscreenchange", handleIsActive);
    };
  }, []);

  async function enterFullscreen() {
    const elem = el.current;
    if (!elem) return;

    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      await elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      await elem.webkitRequestFullscreen();
    }
  }

  async function exitFullscreen() {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      await document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      await document.webkitExitFullscreen();
    }
  }

  async function handleFullscreen() {
    if (!document.fullscreenElement) {
      await enterFullscreen();
    } else {
      await exitFullscreen();
    }
  }

  return { handleFullscreen, isActive };
}
