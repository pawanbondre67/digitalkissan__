import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CropVarieties = () => {
  const [crops, setCrops] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [results, setResults] = useState<Record<string, CropInfo[]> | null>(null);

  interface CropInfo {
    variety: string;
    average_price: number;
  }

  useEffect(() => {
    const storedCrops = localStorage.getItem('topCrops');
    const storedCity = localStorage.getItem('city');
    if (storedCrops) {
      setCrops(JSON.parse(storedCrops));
    }
    if (storedCity) {
      setCity(JSON.parse(storedCity));
    }
  }, []);

  const handleCropChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(event.target.value);
  };

  const findCropVarieties = async () => {
    // Implement the logic to find crop varieties based on the selected crop
    try {
        const response = await axios.post('http://localhost:5000/predict_variety', {
          city,
          selectedCrop,
        });
        console.log(response.data);
        setResults(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        console.error(err);
      }
  };

  return (
   
        <div className="max-w-lg mx-auto p-6">
          <select
            value={selectedCrop}
            onChange={handleCropChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-lg"
          >
            <option value="" disabled>
              Select a crop
            </option>
            {crops.map((crop, index) => (
              <option key={index} value={crop}>
                {crop}
              </option>
            ))}
          </select>
      
          <button
            onClick={findCropVarieties}
            className="w-full bg-green-500 text-white p-2 rounded-lg text-lg hover:bg-green-600"
          >
            Find Crop Varieties
          </button>
      
          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
      
          {/* Results */}
          {results && (
            <div className="mt-6 bg-gray-50 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Results:</h2>
              {Object.entries(results).map(([crop, varieties], index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-md font-medium text-gray-700">{crop}</h3>
                  <ul className="list-disc list-inside">
                    {varieties.map((variety: CropInfo, idx: number) => (
                      <li key={idx}>
                        {variety.variety} - ₹{variety.average_price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      );
};

export default CropVarieties;