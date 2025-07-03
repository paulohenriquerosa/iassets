"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "cookie_consent";
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000; // ms

type Consent = "all" | "necessary";

function getConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? (decodeURIComponent(match[1]) as Consent) : null;
}

function setConsent(value: Consent) {
  const expires = new Date(Date.now() + ONE_YEAR).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    setConsent("all");
    setVisible(false);
    // Trigger a custom event so scripts can load after consent
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  };

  const decline = () => {
    setConsent("necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-gray-100 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="flex-1">
          Usamos cookies para melhorar sua experiência, analisar tráfego e exibir
          anúncios relevantes. Ao clicar em &quot;Aceitar&quot;, você concorda com o uso
          de todos os cookies. Para saber mais, leia nossa {" "}
          <a href="/privacidade" className="underline text-blue-400">Política de Privacidade</a>.
        </p>
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
          >
            Somente essenciais
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none text-white"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
} 