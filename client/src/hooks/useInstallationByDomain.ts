// hooks/useInstallationsByDomain.ts
import { useEffect, useState } from "react";
import { SkiInstallation } from "../interfaces/installation.interface";

export function useInstallationsByDomain(domainId: string) {
  const [installations, setInstallations] = useState<SkiInstallation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!domainId) return;

    setLoading(true);
    fetch(`http://localhost:3000/installations/${domainId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Eroare la încărcarea instalațiilor");
        return res.json();
      })
      .then((data) => {
        setInstallations(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [domainId]);

  return { installations, loading, error };
}
