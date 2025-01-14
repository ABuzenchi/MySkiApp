import React from "react";
import { Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { MdOutlineSearch } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();

  const handleOptionSubmit = (value:string) => {
    navigate(`/${value}`);
  };

  return (
    <div className={classes.pageBackground}>
      <div className={classes.centerContainer}>
        <div className={classes.contentContainer}>
          <h1 className={classes.headerTitle}>DESTINATIONS</h1>
          <Autocomplete
            placeholder="Search a location"
            rightSection={ <div className={classes.rightsection}>
              <MdOutlineSearch size={20} />
            </div>}
            data={[
              { value: "Sinaia" },
              { value: "Poiana Brasov" },
              { value: "Straja" },
              { value: "Transalpina" },
            ]}
            onOptionSubmit={handleOptionSubmit}
            className={classes.searchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
