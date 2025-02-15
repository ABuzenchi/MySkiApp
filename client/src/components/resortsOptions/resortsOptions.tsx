import { Button, Menu } from "@mantine/core";
import { FaMap } from "react-icons/fa";
import classes from "./resortsOptions.module.css"
import {EnDictionary } from "../../dictionaries/en";
const ResortsOptions = () => {
  return (
    <Menu
      width={200}
      shadow="md"
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Button variant="transparent" color="#040024" size="lg">
          <FaMap />
          <span className={classes.buttonText}>{EnDictionary.Resorts}</span>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="/Sinaia" className={classes.item}>
         {EnDictionary.Sinaia}
        </Menu.Item>
        <Menu.Item component="a" href="/Poiana Brasov" className={classes.item}>
         {EnDictionary.PoianaBrasov}
        </Menu.Item>
        <Menu.Item component="a" href="/Straja" className={classes.item}>
         {EnDictionary.Straja}
        </Menu.Item>
        <Menu.Item component="a" href="/Transalpina" className={classes.item}>
          {EnDictionary.Transalpina}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResortsOptions;
