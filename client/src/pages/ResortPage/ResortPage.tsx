import { useParams } from "react-router-dom";
import { useState } from "react";
import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import SlopeStatus from "../../components/slope-status/slope-status";
import SlopeFilter from "../../components/slope-filter/slope-filter";
import { SlopeReviews } from "../../components/reviews/SlopeReviews";
import { useSlopesByDomain } from "../../hooks/useSlopesByDomain";
import { useDomainByName } from "../../hooks/useDomainByName";
import Payment from "../../components/payment/payment";
import MapSearch from "../../components/map/map-search";
import ResortSidebar from "../../components/resortSidebar/resortSidebar";
import classes from "./ResortPage.module.css";

const imageSets: { [key: string]: string[] } = {
  "Poiana Brașov": [/* ... */],
  Sinaia: [/* ... */],
};

export default function ResortPage() {
  const { name } = useParams();
  const resortName = decodeURIComponent(name || "");
  const images = imageSets[resortName] || [];

  const { slopes, loading, error } = useSlopesByDomain(resortName);
  const { domainId, loading: domainLoading } = useDomainByName(resortName);

  const [activeSection, setActiveSection] = useState<string>("weather");

  if (loading || domainLoading) return <p>Se încarcă datele...</p>;
  if (error) return <p>Eroare: {error}</p>;

  return (
    <>
      <div className={classes.pageBackground} />
      <div className={classes.pageLayout}>
     
  <ResortSidebar onSelectSection={setActiveSection} />

        <div className={classes.mainContent}>
          <SlopeStatus name={resortName} />

          {activeSection === "weather" && (
            <>
            <div className={classes.weatherContainer}>
              <Weather location={resortName} />
              </div>
              <CarouselPhoto images={images} />
            </>
          )}

          {activeSection === "slopes" && <SlopeFilter slopes={slopes} />}

          {activeSection === "reviews" && domainId && (
            <SlopeReviews domainId={domainId} />
          )}

          {activeSection === "map" && <MapSearch />}

          {activeSection === "payment" && <Payment />}

          {activeSection === "webcam" && (
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/Ifw-41CDRjQ"
              title={`Webcam ${resortName}`}
              allowFullScreen
              style={{
                borderRadius: "16px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
