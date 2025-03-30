export const fetchAllLocations = async (): Promise<string[]> => {
    const res = await fetch('http://localhost:3000/slopes/locations');
    if (!res.ok) throw new Error('Failed to fetch locations');
    return res.json();
  };