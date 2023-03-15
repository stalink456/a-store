import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOnClickOutSide } from "./use-on-click-outside";

export const useSidePanel = (ref: React.RefObject<HTMLDivElement>) => {
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const handleOpenMenu = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useOnClickOutSide(ref, () => setOpen(false));

  useEffect(() => {
    if (pathname) {
      setOpen(false);
    }
  }, [pathname]);

  return {
    open,
    handleOpenMenu,
  };
};
