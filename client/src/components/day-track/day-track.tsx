import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchAllLocations } from '../../api/allSlopes.api';
import { fetchSlopesByLocation } from '../../api/slopes.api';
import { logDayTrack } from '../../api/dayTrack.api';

const DayTrackCalendar = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [locations, setLocations] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [slopes, setSlopes] = useState<any[]>([]);
  const [times, setTimes] = useState<Record<string, number>>({});
  const [status, setStatus] = useState('');

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - d.getDay() + i);
    return d;
  });

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  useEffect(() => {
    fetchAllLocations().then(setLocations).catch((err) => setStatus(err.message));
  }, []);

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
      await logDayTrack(username!, {
        date: formatDate(selectedDate),
        slopes: slopeData,
      });
      setStatus('✔️ Zi salvată cu succes!');
    } catch (err: any) {
      setStatus(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{
        backgroundColor: '#4B6CB7',
        color: '#fff',
        borderRadius: '12px 12px 0 0',
        padding: '16px',
        textAlign: 'center',
      }}>
        <h3>MY CALENDAR</h3>
        <select
          style={{ marginTop: 10 }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Alege stațiunea</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Weekday selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#EEF1F6',
        padding: '10px 0',
        borderBottom: '1px solid #ccc'
      }}>
        {daysOfWeek.map((day, i) => {
          const isSelected = formatDate(day) === formatDate(selectedDate);
          return (
            <div
              key={i}
              onClick={() => setSelectedDate(day)}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: isSelected ? '#4B6CB7' : 'transparent',
                color: isSelected ? '#fff' : '#333',
                cursor: 'pointer',
                textAlign: 'center',
                width: 40,
              }}
            >
              <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div>{day.getDate()}</div>
            </div>
          );
        })}
      </div>

      {/* Schedule view */}
      <div style={{ padding: 16 }}>
      {slopes
  .filter((s) => times[s._id] > 0)
  .map((s) => {
    const count = times[s._id];
    const totalDistance = s.length * count;
    return (
      <div key={s._id} style={{
        borderLeft: '4px solid #7D83FF',
        paddingLeft: 8,
        marginBottom: 10,
      }}>
        <strong>🎿 {s.name}</strong> – {count} coborâri – {totalDistance}m
      </div>
    );
  })
}

        {slopes.length > 0 && (
          <>
            <hr />
            <h4>Înregistrează coborâri:</h4>
            {slopes.map((slope) => (
              <div key={slope._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}>
                <label>{slope.name}</label>
                <input
                  type="number"
                  min="0"
                  value={times[slope._id] || 0}
                  onChange={(e) => handleChangeTimes(slope._id, Number(e.target.value))}
                  style={{ width: 50 }}
                />
              </div>
            ))}
            <button onClick={handleSubmit} style={{
              marginTop: 10,
              padding: '8px 16px',
              backgroundColor: '#4B6CB7',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer'
            }}>
              Salvează ziua
            </button>
            {status && <p style={{ marginTop: 8 }}>{status}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default DayTrackCalendar;
