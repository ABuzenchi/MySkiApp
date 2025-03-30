export const logDayTrack = async (
    username: string,
    data: {
      date: string;
      slopes: { slopeId: string; times: number }[];
    }
  ) => {
    const res = await fetch(`http://localhost:3000/day-track/${username}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to log day');
    }
  
    return res.json();
  };
  