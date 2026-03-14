"use client";

import { useEffect } from "react";

const TIMEOUT = 30 * 60 * 1000;

export function useAutoLogout(onLogout: () => void) {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        console.log("AUTO LOGOUT TIMER");
        onLogout();
      }, TIMEOUT);
    };

    const resetTimer = () => {
      startTimer();
      localStorage.setItem("last_activity", Date.now().toString());
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        const last = localStorage.getItem("last_activity");

        if (!last) return;

        const diff = Date.now() - Number(last);

        if (diff > TIMEOUT) {
          console.log("AUTO LOGOUT TRIGGERED");
          onLogout();
        } else {
          startTimer();
        }
      }
    };

    startTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("keydown", resetTimer);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(timer);

      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [onLogout]);
}
