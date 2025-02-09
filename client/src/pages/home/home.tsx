import { Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { Dictionary } from "../../dictionaries/en";

const Home = () => {
  const navigate = useNavigate();

  const handleOptionSubmit = (value: string) => {
    navigate(`/${value}`);
  };

  return (
    <div className={classes.pageBackground}>
      <div className={classes.centerContainer}>
        <div className={classes.contentContainer}>
          <h1 className={classes.headerTitle}>{Dictionary.Destinations}</h1>
          <Autocomplete
            classNames={{ options: classes.dropdownItem }}
            placeholder={Dictionary.SearchLocation}
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
    </div>
  );
};

export default Home;
