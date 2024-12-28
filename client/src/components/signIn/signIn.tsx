import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import classes from "./signIn.module.css"
import SignUp from "../signUp/signUp"

// interface SignUpProps{
//   closeDrawer:()=>void;
// }

const SignIn=()=>{
    const [opened, { open, close }] = useDisclosure(false)

    // const handleOpenModal=()=>{
    //     closeDrawer();
    //     {open};
    // }
 return(
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
         <div className={classes.signupcontainer}>
          <form className={classes.signupform}>
            <div className={classes.formgroup}>
              <label>Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>

            <div className={classes.formgroup}>
              <label>Email*</label>
              <input
                type="email"
                id="email"
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
                required
              />
              <small>Must be at least 8 characters.</small>
            </div>

            <button type="submit" className={classes.signupbutton}>
              Sign Up
            </button>

            <div className={classes.separator}>
              <span>or continue with</span>
            </div>

            {/* <div class="social-buttons">
        <button type="button" class="social-button google">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" />
          Google
        </button>
        <button type="button" class="social-button apple">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
          Apple
        </button>
      </div> */}

            <p className={classes.signintext}>
              Don't have an account? <SignUp/>
            </p>
          </form>
        </div>
      </Modal>

      <Button variant="default" onClick={open}>
        Sign In
      </Button>
    </>
 )
}

export default SignIn;

