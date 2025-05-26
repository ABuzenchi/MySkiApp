export const fetchAllSkiDomains = async (): Promise<string[]> => {
  const res = await fetch("http://localhost:3000/ski-domains");
  if (!res.ok) throw new Error("Eroare la încărcarea domeniilor");

  const data = await res.json();
  return data.map((domain: any) => domain.name);
};
