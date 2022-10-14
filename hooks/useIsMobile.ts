import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  function isMobileUser() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator?.userAgent.match(toMatchItem);
    });
  }

  useEffect(() => {
    setIsMobile(isMobileUser());
  }, []);

  return isMobile;
}
