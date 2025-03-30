export const fetchSlopesByLocation = async (location: string) => {
    const res = await fetch(`http://localhost:3000/slopes/location/${location}`);
    if (!res.ok) throw new Error('Failed to fetch slopes');
    return res.json();
  };