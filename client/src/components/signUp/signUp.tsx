import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import classes from "./signUp.module.css";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData); 
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
       dispatch(login({ username: data.username })); // Actualizează Redux
            console.log("Login successful, token:", data.token);
      alert(`Signup successful! Token: ${data.token}`);
      close();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create your account"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        classNames={{
          root: classes.signUpRoot,
          header: classes.signUpHeader,
        }}
      >
        <div className={classes.signupcontainer}>
          <form className={classes.signupform} onSubmit={handleSubmit}>
            <div className={classes.formgroup}>
              <label>Name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.formgroup}>
              <label>Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.formgroup}>
              <label>Password*</label>
              <input
                type="password"
                id="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <small>Must be at least 8 characters.</small>
            </div>

            {error && <p className={classes.error}>{error}</p>}

            <button type="submit" className={classes.signupbutton}>
              Sign Up
            </button>

            <div className={classes.separator}>
              <span>or continue with</span>
            </div>

            <p className={classes.signintext}>
              Already have an account? <a href="#">Sign in</a>
            </p>
          </form>
        </div>
      </Modal>

      <Button variant="default" onClick={open}>
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;