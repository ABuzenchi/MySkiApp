import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Sinaia.module.css";
import sinaiaMap from "../../assets/sinaia-map.jpg";
import sinaiaPicture01 from "../../assets/sinaia-picture01.jpg";
import sinaiaPicture02 from "../../assets/sinaia-picture02.jpg";
import sinaiaPicture03 from "../../assets/sinaia-picture03.jpg";
import sinaiaPicture04 from "../../assets/sinaia-picture04.jpg";
import { useState, useEffect } from 'react';
import {Slope} from "../../interfaces/slope.interface"

const images = [
  sinaiaMap,
  sinaiaPicture01,
  sinaiaPicture02,
  sinaiaPicture03,
  sinaiaPicture04,
];

export default function Sinaia() {
  const [partii, setPartii] = useState<Slope[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPartii();
  }, []);

  const fetchPartii = async () => {
    try {
      const response = await fetch('http://localhost:3000/slopes/sinaia');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPartii(data);
      setLoading(false);
    } catch (err:any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Weather location="Sinaia" />
        <CarouselPhoto images={images} />
        </div>
        
        {loading && <div>Se încarcă...</div>}
        
        {error && (
          <div>Eroare la încărcarea datelor: {error}</div>
        )}
        
        {!loading && !error && (
          <div>
          <h2>Slopes</h2>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Length</th>
                <th>Departure altitude</th>
              </tr>
            </thead>
            <tbody>
              {partii.map((partie, index) => (
                <tr key={index}>
                  <td>{partie.name}</td>
                  <td>{partie.status}</td>
                  <td>{partie.length}</td>
                  <td>{partie.departureAltitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      
    </>
  );
}