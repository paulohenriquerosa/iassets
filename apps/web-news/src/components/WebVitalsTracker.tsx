"use client";

import { useEffect } from "react";
import { sendToAnalytics } from "@/lib/gtag";
import * as vitals from "web-vitals";

export default function WebVitalsTracker() {
  useEffect(() => {
    function init() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const v: any = vitals as any;
      v.onCLS(sendToAnalytics);
      v.onFID?.(sendToAnalytics);
      v.onLCP(sendToAnalytics);
      v.onINP?.(sendToAnalytics);
      v.onTTFB(sendToAnalytics);
      v.onFCP(sendToAnalytics);
    }

    if (document.cookie.includes("cookie_consent=all") && typeof window.gtag === "function") {
      init();
    } else {
      window.addEventListener("cookie-consent-accepted", init, { once: true });
    }
  }, []);

  return null;
} 