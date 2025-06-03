import { useEffect, useState } from "react";
import { Button, Menu } from "@mantine/core";
import classes from "./resortsOptions.module.css";
import { EnDictionary } from "../../dictionaries/en";

const ResortsOptions = () => {
  const [resorts, setResorts] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/ski-domains")
      .then((res) => res.json())
      .then((data) => setResorts(data.map((d: any) => d.name)))
      .catch((err) => console.error("Eroare la preluarea stațiunilor:", err));
  }, []);

  return (
    <Menu
      width={200}
      shadow="md"
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Button variant="transparent" color="white" size="lg">
          <span className={classes.buttonText}>{EnDictionary.Resorts}</span>
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdownScrollable}>
        {resorts.map((resortName) => (
          <Menu.Item
            key={resortName}
            component="a"
          href={`/resorts/${encodeURIComponent(resortName)}`}

            className={classes.item}
          >
            {resortName}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResortsOptions;
