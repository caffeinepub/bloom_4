import { useState } from "react";

export function usePremium() {
  const [isPremium, setIsPremium] = useState(
    () => localStorage.getItem("premiumUnlocked") === "true",
  );

  const unlock = () => {
    localStorage.setItem("premiumUnlocked", "true");
    setIsPremium(true);
  };

  return { isPremium, unlock };
}
