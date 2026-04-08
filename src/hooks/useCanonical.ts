import { useEffect } from "react";

export function useCanonical(path: string) {
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://genzoic.com${path}`;
    }
  }, [path]);
}
