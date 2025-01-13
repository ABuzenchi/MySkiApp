import { Button, Menu } from "@mantine/core";
import { FaMap } from "react-icons/fa";
const ResortsOptions=()=> {
  return (
    <Menu width={200} shadow="md" trigger="hover" openDelay={100} closeDelay={400}>
    <Menu.Target>
    <Button variant="default" size="lg" component="a" href="/Resorts">
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