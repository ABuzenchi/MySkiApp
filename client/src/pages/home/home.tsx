import { Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { MdOutlineSearch } from "react-icons/md";
import {EnDictionary } from "../../dictionaries/en";
import MapComponent from "../../components/map/map";

const Home = () => {
  const navigate = useNavigate();

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
      <MapComponent/>
    </div>
  );
};

export default Home;
