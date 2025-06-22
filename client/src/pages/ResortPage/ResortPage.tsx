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
import { useInstallationsByDomain } from "../../hooks/useInstallationByDomain";
import Installation from "../../components/installations/installations";
import Spinner from "../../components/spinner/spinner";

const imageSets: { [key: string]: string[] } = {
  "Poiana Brașov": [
    /* ... */
  ],
  Sinaia: [
    /* ... */
  ],
};

export default function ResortPage() {
  const { name } = useParams();
  const resortName = decodeURIComponent(name || "");
  const images = imageSets[resortName] || [];

  const { slopes, loading, error } = useSlopesByDomain(resortName);
  const {
    domainId,
    domain,
    webcamUrl,
    loading: domainLoading,
  } = useDomainByName(resortName);

  const [activeSection, setActiveSection] = useState<string>("slopes");
  const {
    installations,
    loading: installationsLoading,
    error: installationsError,
  } = useInstallationsByDomain(domainId || "");

  if (loading || domainLoading) return <Spinner />;
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
          {activeSection === "installation" && (
            <>
              {installationsLoading ? (
                <p>Se încarcă instalațiile...</p>
              ) : (
                <Installation installations={installations} />
              )}
            </>
          )}

          {activeSection === "slopes" && <SlopeFilter slopes={slopes} />}

          {activeSection === "reviews" && domainId && (
            <SlopeReviews domainId={domainId} />
          )}

          {activeSection === "map" && domain && <MapSearch domain={domain} />}

          {activeSection === "payment" && domain && <Payment domain={domain} />}

          {activeSection === "webcam" && webcamUrl && (
            <div className={classes.iframeWrapper}>
              <iframe
                className={classes.responsiveIframe}
                src={webcamUrl}
                title={`Webcam ${resortName}`}
                allowFullScreen
              />
            </div>
          )}

          {activeSection === "webcam" && !webcamUrl && (
            <p style={{ padding: "1rem", fontStyle: "italic" }}>
              Momentan nu există un webcam disponibil pentru acest domeniu.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
