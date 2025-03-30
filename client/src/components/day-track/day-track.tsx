import React, { useEffect, useState } from 'react';
import { fetchSlopesByLocation } from '../../api/slopes.api';
import { logDayTrack } from '../../api/dayTrack.api';

const DayTrackForm = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [slopes, setSlopes] = useState<any[]>([]);
  const [times, setTimes] = useState<Record<string, number>>({});
  const [status, setStatus] = useState('');

  const username = 'alex'; // Poți pune userul din context sau state

  const locations = ['Sinaia', 'Poiana Brașov', 'Predeal'];

  useEffect(() => {
    if (location) {
      fetchSlopesByLocation(location)
        .then((data) => {
          setSlopes(data);
          const emptyTimes = Object.fromEntries(data.map((s: any) => [s._id, 0]));
          setTimes(emptyTimes);
        })
        .catch((err) => setStatus(err.message));
    }
  }, [location]);

  const handleChangeTimes = (slopeId: string, value: number) => {
    setTimes((prev) => ({ ...prev, [slopeId]: value }));
  };

  const handleSubmit = async () => {
    const slopeData = Object.entries(times)
      .filter(([_, t]) => t > 0)
      .map(([slopeId, t]) => ({ slopeId, times: t }));

    try {
      await logDayTrack(username, { date, slopes: slopeData });
      setStatus('✔️ Zi salvată cu succes!');
    } catch (err: any) {
      setStatus(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Înregistrează o zi pe pârtie 🎿</h2>

      <label>Data:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>Stațiune:</label>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Alege stațiunea</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {slopes.length > 0 && (
        <>
          <h4>Pârtii din {location}:</h4>
          {slopes.map((slope) => (
            <div key={slope._id}>
              <label>{slope.name}</label>
              <input
                type="number"
                min="0"
                value={times[slope._id] || 0}
                onChange={(e) => handleChangeTimes(slope._id, Number(e.target.value))}
              />
            </div>
          ))}
        </>
      )}

      <button onClick={handleSubmit} style={{ marginTop: 12 }}>
        Salvează ziua
      </button>

      <p>{status}</p>
    </div>
  );
};

export default DayTrackForm;
