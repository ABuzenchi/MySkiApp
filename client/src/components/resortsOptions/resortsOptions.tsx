import { Button, Menu } from "@mantine/core";
import { FaMap } from "react-icons/fa";
const ResortsOptions=()=> {
  return (
    <Menu width={200} shadow="md">
    <Menu.Target>
    <Button variant="default" size="lg">
        <FaMap />
        Resorts
      </Button>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Item component="a" href="/Sinaia">
        Sinaia
      </Menu.Item>
      <Menu.Item
        component="a"
        href="https://mantine.dev"
        target="_blank"
      >
        External link
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
  )
}

export default ResortsOptions;