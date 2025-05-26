import { useEffect, useState } from "react";
import { Slope } from "../interfaces/slope.interface";

export function useSlopesByLocationName(location: string) {
  const [slopes, setSlopes] = useState<Slope[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchSlopes = async () => {
      try {
        setLoading(true);
        setError(null);

        const domainRes = await fetch(
          `http://localhost:3000/ski-domains/name/${encodeURIComponent(location)}`
        );
        const domain = await domainRes.json();

        if (!domain?._id) {
          throw new Error(`Domeniul „${location}” nu a fost găsit.`);
        }

        const slopesRes = await fetch(
          `http://localhost:3000/slopes/domain/${domain._id}`
        );
        const slopesData = await slopesRes.json();

        setSlopes(slopesData);
      } catch (err: any) {
        setError(err.message || "Eroare la încărcarea pârtiilor");
        setSlopes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlopes();
  }, [location]);

  return { slopes, loading, error };
}
