import { useEffect, useRef, useState } from "react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function usePageViews() {
  const [count, setCount] = useState<number | null>(null);
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;

    fetch(`${API_BASE}/api/page-views`, { method: "POST" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count: number }) => setCount(data.count))
      .catch(() => {
        fetch(`${API_BASE}/api/page-views`)
          .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
          .then((data: { count: number }) => setCount(data.count))
          .catch(() => {});
      });
  }, []);

  return count;
}
