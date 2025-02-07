import { Button, Menu } from "@mantine/core";
import { FaMap } from "react-icons/fa";
import classes from "./resortsOptions.module.css"
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
          <span className={classes.buttonText}>Resorts</span>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="/Sinaia">
          Sinaia
        </Menu.Item>
        <Menu.Item component="a" href="/Poiana Brasov">
          Poiana Brasov
        </Menu.Item>
        <Menu.Item component="a" href="/Straja">
          Straja
        </Menu.Item>
        <Menu.Item component="a" href="/Transalpina">
          Transalpina
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResortsOptions;
