// hooks/useDomainByName.ts
import { useEffect, useState } from "react";

export function useDomainByName(domainName: string) {
  const [domainId, setDomainId] = useState<string | null>(null);
  const [domain, setDomain] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!domainName) return;

    const fetchDomain = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/ski-domains/name/${encodeURIComponent(domainName)}`);
        const data = await res.json();

        if (!data?._id) throw new Error("Domeniul nu a fost găsit.");

        setDomainId(data._id);
        setDomain(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [domainName]);

  return { domainId, domain, loading, error };
}
