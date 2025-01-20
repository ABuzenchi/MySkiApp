import { Button, Menu } from "@mantine/core";
import { FaMap } from "react-icons/fa";
import { Dictionary } from "../../dictionaries/en";
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
        <Button variant="default" size="lg">
          <FaMap />
          {Dictionary.Resorts}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="/Sinaia">
         {Dictionary.Sinaia}
        </Menu.Item>
        <Menu.Item component="a" href="/Poiana Brasov">
         {Dictionary.Poiana_Brasov}
        </Menu.Item>
        <Menu.Item component="a" href="/Straja">
          {Dictionary.Straja}
        </Menu.Item>
        <Menu.Item component="a" href="/Transalpina">
          {Dictionary.Transalpina}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResortsOptions;
