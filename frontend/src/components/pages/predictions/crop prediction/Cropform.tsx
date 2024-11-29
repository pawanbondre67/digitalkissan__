
import  { useState } from "react";
import {useNavigate } from 'react-router-dom';

const Cropform = () => {
  const [city, setCity] = useState("");
  const [topCrops, setTopCrops] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handlePredict = async () => {
    setError(''); // Clear previous errors
    setTopCrops([]); // Clear previous results
    setIsLoading(true); // Set loading to true

    if (!city) {
      setIsLoading(false); // Reset loading
      setError("City is required!");
      return;
    }

    try {
      localStorage.removeItem('topCrops');
      const response = await fetch("https://digitalkissan-cy8p.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred.");
      } else {
        const data = await response.json();
        setTopCrops(data.top_crops);
        const topCrops = data.top_crops.map((crop: string) => crop.trim());
        localStorage.setItem('topCrops', JSON.stringify(topCrops));
        localStorage.setItem('city', JSON.stringify(city));
      }
    } catch {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false); // Reset loading
    }
                navigate('/crop-prediction/top-crops');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Crop Prediction
        </h1>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter City Name
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., CityA"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <button
          onClick={handlePredict}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Predicting..." : "Predict Crops"}
        </button>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {topCrops.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top 3 Recommended Crops:
            </h2>
            <ul className="list-disc list-inside">
              {topCrops.map((crop, index) => (
                <li key={index} className="text-gray-700">
                  {crop}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cropform;

