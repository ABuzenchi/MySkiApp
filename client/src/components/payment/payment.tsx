import { useState } from "react";
import classes from "./Payment.module.css";
import { Select } from "@mantine/core";

type PaymentProps = {
  domain: {
    name: string;
    paymentOptions?: {
      oneDay?: string;
      twentyPoints?: string;
      tenPoints?: string;
    };
  };
};

const Payment = ({ domain }: PaymentProps) => {
  const [product, setProduct] = useState("Abonament zilnic");

  const getPrice = () => {
    switch (product) {
      case "Abonament zilnic":
        return domain.paymentOptions?.oneDay || "0";
      case "Puncte (20 curse)":
        return domain.paymentOptions?.twentyPoints || "0";
      case "Puncte (10 curse)":
        return domain.paymentOptions?.tenPoints || "0";
      default:
        return "0";
    }
  };

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3000/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: `${product} - ${domain.name}`,
          price: parseFloat(getPrice()),
          currency: "ron",
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else alert("Nu s-a putut obține linkul de plată.");
    } catch (err) {
      console.error("Eroare la plată:", err);
      alert("A apărut o problemă. Încearcă din nou.");
    }
  };

  if (!domain) return <p>Se încarcă informațiile despre plată...</p>;

  return (
    <div className={classes.paymentContainer}>
      <h2 className={classes.title}>Abonamente & puncte – {domain.name}</h2>

      <label className={classes.label}>Tip produs:</label>

      <Select
        placeholder="Alege o opțiune"
        data={[
          { value: "Abonament zilnic", label: "Abonament zilnic" },
          { value: "Puncte (20 curse)", label: "20 puncte" },
          { value: "Puncte (10 curse)", label: "10 puncte" },
        ]}
        value={product}
        onChange={(value) => {
          if (value) setProduct(value);
        }}
      />

      <button className={classes.button} onClick={handlePay}>
        Plătește {getPrice()} RON
      </button>
    </div>
  );
};

export default Payment;
