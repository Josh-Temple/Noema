"use client";

import { useEffect } from "react";

export const PwaRegistrar = () => {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration failures are non-fatal; the app still works without offline support.
    });
  }, []);

  return null;
};
