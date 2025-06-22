import { useEffect, useState } from "react";
import classes from "./home.module.css";
import ResortsSection from "../../components/resortsSection/resortsSection";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../components/map/map";
import FeatureCard from "../../components/feature-card/featureCard";
import { FaVideo } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Button } from "@mantine/core";
import ChatMonty from "../../assets/chat.png";
import Video from "../../assets/video.png"

interface SkiDomain {
  name: string;
  imageUrl: string;
}

const Home = () => {
  const [carouselItems, setCarouselItems] = useState<SkiDomain[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/ski-domains")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((d: any) => d.imageUrl);
        setCarouselItems(filtered);
      })
      .catch((err) => console.error("Failed to fetch ski domains", err));
  }, []);

  return (
    <>
      <div className={classes.pageBackground}>
        <div className={classes.centerContainer}>
          <div className={classes.contentContainer}>
            <h1 className={classes.headerTitle}>
              Descoperă cele mai spectaculoase pârtii din România
            </h1>
          </div>
        </div>

        <div className={classes.resortSectionInside}>
          <ResortsSection resorts={carouselItems} />
        </div>

        <div className={classes.imageFadeOverlay} />
      </div>

      <div className={classes.zigZagWrapper}>
        <div className={classes.zigZagRow}>
          <div className={classes.zigZagImage}>
           <img src={ChatMonty} alt="Monty" className={classes.zigZagImgContent} />

          </div>
          <div className={classes.zigZagText}>
            <h2>Monty – Asistentul tău de zăpadă</h2>
            <p>
              Află prețuri, condiții sau curiozități despre pârtii. Pune-i o
              întrebare!
            </p>
            <Button className={classes.zigZagButton} onClick={() => navigate("/chat")}>Vorbește cu Monty</Button>
          </div>
        </div>

        <div className={`${classes.zigZagRow} ${classes.reverse}`}>
          <div className={classes.zigZagImage}>
           <img
              src={Video}
              alt="Video"
           className={classes.zigZagImgContent}
            />
          </div>
          <div className={classes.zigZagText}>
            <h2 >Analiză video </h2>
            <p>Încarcă un video de ski și analizează viteza și traseul.</p>
            <Button className={classes.zigZagButton} onClick={() => navigate("/analyzer")}>Încarcă video</Button>
          </div>
        </div>

        <div className={classes.zigZagRow}>
          <div id="map"className={classes.mapColumn}>
            <MapComponent />
          </div>
          <div className={classes.zigZagText}>
            <h2>Harta domeniilor schiabile</h2>
            <p>
             Explorează domeniile marcate și află mai multe despre fiecare.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
