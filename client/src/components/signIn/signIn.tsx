import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./signIn.module.css";
import SignUp from "../signUp/signUp";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const SignIn = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      console.log(data.token, data.username);
      dispatch(login({ username: data.username }));
      console.log("Login successful, token:", data.token);
      alert("Login successful!");
      close();
    } catch (error: any) {
      console.error("Error during login:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Welcome back"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        classNames={{
          root: classes.signInRoot,
          header: classes.signInHeader,
        }}
      >
        <div className={classes.signincontainer}>
          <form className={classes.signinform} onSubmit={handleSubmit}>
            <div className={classes.formgroup}>
              <label>Email*</label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={classes.formgroup}>
              <label>Password*</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
              <small>Must be at least 8 characters.</small>
            </div>

            <button type="submit" className={classes.signinbutton}>
              Sign In
            </button>

            <p className={classes.signintext}>
              Don't have an account? <SignUp />
            </p>
          </form>
        </div>
      </Modal>

      <Button variant="default" onClick={open}>
        Sign In
      </Button>
    </>
  );
};

export default SignIn;
