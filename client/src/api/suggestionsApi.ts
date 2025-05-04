export const fetchPrediction = async (trackData: any) => {
    const response = await fetch("http://localhost:3000/suggestions/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackData),
    });
    if (!response.ok) throw new Error("Prediction fetch failed");
    return await response.json();
  };
  
  export const fetchSuggestions = async (trackData: any) => {
    const response = await fetch("http://localhost:3000/suggestions/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackData),
    });
    if (!response.ok) throw new Error("Suggestions fetch failed");
    return await response.json();
  };
  