"use client";

import { useEffect } from "react";

export function FirebaseAnalytics() {
  useEffect(() => {
    let active = true;
    async function initializeAnalytics() {
      const { getAnalytics, isSupported } = await import("firebase/analytics");
      if (!(await isSupported()) || !active) return;
      const { firebaseApp } = await import("@/lib/firebase");
      if (active) getAnalytics(firebaseApp);
    }
    void initializeAnalytics().catch(() => {
      // Analytics must not interrupt the site if an extension or network blocks it.
    });
    return () => {
      active = false;
    };
  }, []);

  return null;
}
