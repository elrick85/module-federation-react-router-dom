import React, { ReactElement, useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routing/routes";

interface NavigationManagerProps {
  children: ReactElement;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      console.log('event', '[shell]', event)
      const pathname = (event as CustomEvent<string>).detail;
      const matchedRoutes = matchRoutes(routes, { pathname })

      if (location.pathname === (pathname || "/") || !matchedRoutes) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener("[shell] navigated", shellNavigationHandler);

    return () => {
      window.removeEventListener("[shell] navigated", shellNavigationHandler);
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[app1] navigated", { detail: location.pathname })
    );
  }, [location]);

  return children;
}
