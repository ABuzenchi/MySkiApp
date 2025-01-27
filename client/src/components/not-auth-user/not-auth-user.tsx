import { Alert } from "@mantine/core";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Dictionary } from "../../dictionaries/en";
import classes from "./not-auth-user.module.css";

const NotAuthUser = () => {
  const icon = <IoIosInformationCircleOutline className={classes.icon}/>;
  return (
    <Alert
      variant="light"
      color="blue"
      title="Info"
      icon={icon}
      classNames={{
        root: classes.wrapper,
       
      }}
    >
      {Dictionary.AuthRequired}
    </Alert>
  );
};
export default NotAuthUser;
