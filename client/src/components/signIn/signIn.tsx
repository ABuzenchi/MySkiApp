import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./signIn.module.css";
import SignUp from "../signUp/signUp";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { EnDictionary } from "../../dictionaries/en";
import { GoogleLogin } from "@react-oauth/google";

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
      dispatch(login({ username: data.username, avatar: data.profilePicture }));
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
              <label>{EnDictionary.Email}</label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                placeholder={EnDictionary.EnterEmail}
                required
              />
            </div>

            <div className={classes.formgroup}>
              <label>{EnDictionary.Password}</label>
              <input
                type="password"
                id="password"
                placeholder={EnDictionary.EnterEmail}
                onChange={handleChange}
                required
              />
              <small>{EnDictionary.PasswordCondition}</small>
            </div>

            <button type="submit" className={classes.signinbutton}>
              {EnDictionary.SignIn}
            </button>
            <div className={classes.separator}>
              <span>or continue with</span>
            </div>

            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const res = await fetch("http://localhost:3000/auth/google", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    token: credentialResponse.credential,
                  }),
                });

                const data = await res.json();
                localStorage.setItem("authToken", data.token);
                dispatch(
                  login({
                    username: data.username,
                    avatar: data.profilePicture,
                  })
                );
                alert("Login with Google successful!");
                close();
              }}
              onError={() => {
                alert("Google login failed");
              }}
            />

            <p className={classes.signintext}>
              {EnDictionary.NoAccount} <SignUp />
            </p>
          </form>
        </div>
      </Modal>

      <Button data-testid="sign-in-button" variant="default" onClick={open}>
        {EnDictionary.SignIn}
      </Button>
    </>
  );
};

export default SignIn;
