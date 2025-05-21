import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SuccessPage() {
  const [searchParams] = useSearchParams();

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

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>✅ Mulțumim pentru achiziție!</h1>
      <p>Plata a fost procesată cu succes.</p>
    </div>
  );
}

export default SuccessPage;
