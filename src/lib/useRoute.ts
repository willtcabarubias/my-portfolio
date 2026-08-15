import { useEffect, useState } from "react";

export type Route = { name: "home"; hash?: string } | { name: "project"; slug: string };

function parse(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  if (raw.startsWith("work/")) {
    return { name: "project", slug: raw.slice(5) };
  }
  return { name: "home", hash: raw || undefined };
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parse());

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}
