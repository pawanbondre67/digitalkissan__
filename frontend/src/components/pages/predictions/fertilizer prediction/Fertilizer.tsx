import React, { useState } from "react";
import axios from "axios";

const Fertilizer : React.FC = () => {
  const [city, setCity] = useState("");
  interface Result {
    city: string;
    fertilizer: string[];
  }
  
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const fetchFertilizer = async () => {
    try {
      setError("");
      setResult(null);

      const response = await axios.post("http://127.0.0.1:5000/predict-fertilizer", {
        city,
      }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Fertilizer Predictor</h1>

        <label htmlFor="city" className="block text-sm font-medium text-gray-600 mb-2">
          Enter your city:
        </label>
        <input
          type="text"
          id="city"
          className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g., New York"
        />

        <button
          className="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={fetchFertilizer}
        >
          Predict Fertilizer
        </button>

        {error && (
          <p className="mt-4 text-red-500 font-medium">{error}</p>
        )}

        {result && (
          <div className="mt-6 bg-green-50 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Results for {result.city}:</h2>
            <p className="text-gray-600">
              Recommended Fertilizer(s):{" "}
            <ul className="font-semibold">
              {result.fertilizer.map((fertilizer, index) => (
                <li key={index}>{fertilizer}</li>
            ))}
            </ul>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fertilizer;
