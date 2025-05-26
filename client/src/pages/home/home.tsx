import { Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./home.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { EnDictionary } from "../../dictionaries/en";
import MapComponent from "../../components/map/map";

const Home = () => {
  const navigate = useNavigate();
  const [resortOptions, setResortOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/ski-domains")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((domain: any) => ({
          value: domain.name,
        }));
        setResortOptions(options);
      })
      .catch((err) => console.error("Failed to fetch ski domains", err));
  }, []);

  const handleOptionSubmit = (value: string) => {
    navigate(`/${value}`);
  };

  return (
    <div className={classes.pageBackground}>
      <div className={classes.centerContainer}>
        <div className={classes.contentContainer}>
          <h1 className={classes.headerTitle}>{EnDictionary.Destinations}</h1>
          <Autocomplete
            classNames={{ options: classes.dropdownItem }}
            placeholder={EnDictionary.SearchLocation}
            rightSection={
              <div className={classes.rightsection}>
                <MdOutlineSearch size={20} />
              </div>
            }
            data={resortOptions}
            onOptionSubmit={handleOptionSubmit}
            className={classes.searchInput}
          />
        </div>
      </div>
      <MapComponent />
    </div>
  );
};

export default Home;
