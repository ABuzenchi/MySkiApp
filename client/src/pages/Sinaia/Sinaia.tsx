import { useState, useEffect } from "react";
import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Sinaia.module.css";
import sinaiaMap from "../../assets/sinaia-map.jpg";
import sinaiaPicture01 from "../../assets/sinaia-picture01.jpg";
import sinaiaPicture02 from "../../assets/sinaia-picture02.jpg";
import sinaiaPicture03 from "../../assets/sinaia-picture03.jpg";
import sinaiaPicture04 from "../../assets/sinaia-picture04.jpg";
import { Slope } from "../../interfaces/slope.interface";
import SlopeStatus from "../../components/slope-status/slope-status";
import SlopeFilter from "../../components/slope-filter/slope-filter";
import { SlopeReviews } from "../../components/reviews/SlopeReviews";
import { useSlopesByDomain } from "../../hooks/useSlopesByDomain";
import { useDomainByName } from "../../hooks/useDomainByName";
import { UploadVideo } from "../../components/uploadVideo/uploadVideo";
import ResortSidebar from "../../components/resortSidebar/resortSidebar";

const images = [
  sinaiaMap,
  sinaiaPicture01,
  sinaiaPicture02,
  sinaiaPicture03,
  sinaiaPicture04,
];

export default function Sinaia() {
  const { slopes, loading, error } = useSlopesByDomain("Sinaia");
  const { domainId, loading: domainLoading } = useDomainByName("Sinaia");

  if (loading) return <p>Se încarcă pârtiile...</p>;
  if (error) return <p>Eroare: {error}</p>;

  return (
    <>
      <SlopeStatus name="Sinaia" />
      <div className={classes.container}>
        <Weather location="Sinaia" />
        <CarouselPhoto images={images} />
      </div>

      <div className={classes.slopeTable}>
        <SlopeFilter slopes={slopes} />
      </div>
      <div className={classes.reviewsSection}>
          {domainId ? (
            <SlopeReviews domainId={domainId} />
          ) : (
            <p>Se încarcă datele domeniului...</p>
          )}
        </div>

      <div>
        <iframe
          width="1074"
          height="604"
          src="https://www.youtube.com/embed/7wOYoWK869Q"
          title="🔴 LIVE | Webcam Ski Resort Transalpina cota 2000 | Starea Pârtiilor în Timp Real"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <ResortSidebar/>
    </>
  );
}
