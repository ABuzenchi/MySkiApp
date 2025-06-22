import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import classes from "./succes.module.css";

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const token = localStorage.getItem("authToken");

    if (sessionId && token) {
      fetch("http://localhost:3000/stripe/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Confirmare plată:", data))
        .catch((err) => console.error("❌ Eroare la confirmare plată:", err));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>✅ Mulțumim pentru achiziție!</h1>
      <p className={classes.message}>Plata a fost procesată cu succes.</p>
      <p className={classes.redirectNote}>
        Vei fi redirecționat în {countdown} secunde...
      </p>

      <div className={classes.loaderWrapper}>
        <Loader variant="dots" color="green" />
      </div>
    </div>
  );
}

export default SuccessPage;
