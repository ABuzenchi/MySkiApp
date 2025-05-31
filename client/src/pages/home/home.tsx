import { useEffect, useState } from "react";
import classes from "./home.module.css";
import ResortsSection from "../../components/resortsSection/resortsSection";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import MapComponent from "../../components/map/map";

interface SkiDomain {
  name: string;
  imageUrl: string;
}

const Home = () => {
  const [resortOptions, setResortOptions] = useState<{ value: string }[]>([]);
  const [carouselItems, setCarouselItems] = useState<SkiDomain[]>([]);
const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/ski-domains")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((d: any) => d.imageUrl); // doar cele cu imagine
        const options = filtered.map((domain: any) => ({
          value: domain.name,
        }));
        setResortOptions(options);
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
    </div>

   </>
);

};

export default Home;