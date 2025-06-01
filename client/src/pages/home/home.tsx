import { useEffect, useState } from "react";
import classes from "./home.module.css";
import ResortsSection from "../../components/resortsSection/resortsSection";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../components/map/map";
import FeatureCard from "../../components/feature-card/featureCard";
import { FaVideo } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

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

      <div className={classes.featuresSection}>
        <div className={classes.linksColumn}>
          <h2 className={classes.sectionTitle}>Explorează funcționalități</h2>
          <div className={classes.cardsGrid}>
            <FeatureCard
              icon={<FaMessage size={36} />}
              title="Chat AI"
              description="Pune întrebări despre pârtii, condiții meteo și locații."
              onClick={() => navigate("/chat")}
            />
            <FeatureCard
              icon={<FaVideo size={36} />}
              title="Video Analyzer"
              description="Încarcă un video de ski și analizează viteza și traseul."
              onClick={() => navigate("/analyzer")}
            />
          </div>
        </div>

        <div className={classes.mapColumn}>
          <MapComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
