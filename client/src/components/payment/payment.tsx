import { useState } from "react";

const Payment=()=>{
  console.log("✅ Componenta Payment este montată");

  const [domain, setDomain] = useState("Poiana Brașov");
  const [price, setPrice] = useState(20); // în EUR
  const [product, setProduct] = useState("Abonament zilnic");

  const handlePay = async () => {
    console.log("📤 Trimitem cererea de plată...");

    try {
      const token = localStorage.getItem("authToken"); // același ca la review

      const response = await fetch("http://localhost:3000/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // token-ul JWT
        },
        body: JSON.stringify({
          name: `${product} - ${domain}`,
          price: price,
        }),
      });

      if (!response.ok) throw new Error("Checkout request failed");

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Nu s-a putut obține linkul de plată.");
      }
    } catch (err) {
      console.error("Eroare la plată:", err);
      alert("A apărut o problemă. Încearcă din nou.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h2>Cumpără acces la domeniu</h2>

      <label>Domeniu schiabil:</label><br />
      <select value={domain} onChange={(e) => setDomain(e.target.value)}>
        <option>Poiana Brașov</option>
        <option>Sinaia</option>
        <option>Predeal</option>
      </select><br /><br />

      <label>Tip produs:</label><br />
      <select
        value={product}
        onChange={(e) => {
          const val = e.target.value;
          setProduct(val);
          setPrice(val === "Abonament zilnic" ? 20 : 10);
        }}
      >
        <option>Abonament zilnic</option>
        <option>Puncte (10 curse)</option>
      </select><br /><br />

      <button onClick={handlePay}>Plătește {price} €</button>
    </div>
  );
}

export default Payment;
