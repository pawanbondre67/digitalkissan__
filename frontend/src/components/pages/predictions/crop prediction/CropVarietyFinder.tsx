import { useEffect,useState } from 'react';
import axios from 'axios';

const CropVarietyFinder = () => {
  const [city, setCity] = useState('');
  const [crops, setCrops] = useState(['']);
  interface CropInfo {
    variety: string;
    average_price: string;
  }

  const [results, setResults] = useState<Record<string, CropInfo[]> | null>(null);
  const [error, setError] = useState('');

  const handleCropChange = (index: number, value: string) => {
    const newCrops = [...crops];
    newCrops[index] = value;
    setCrops(newCrops);
  };

  const addCropField = () => setCrops([...crops, '']);

  const removeCropField = (index: number) => {
    const newCrops = crops.filter((_, i) => i !== index);
    setCrops(newCrops);
  };

  const fetchResults = async () => {
    try {
      const response = await axios.post('https://digitalkissan-cy8p.onrender.com/predict_variety', {
        city,
        crops,
      });
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error(err);
    }
  };

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

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Crop Variety Finder
        </h1>

        {/* City Input */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Crops Input */}
        {crops.map((crop, index) => (
          <div key={index} className="mb-4 flex items-center">
            <input
              type="text"
              value={crop}
              onChange={(e) => handleCropChange(index, e.target.value)}
              placeholder={`Enter crop ${index + 1}`}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => removeCropField(index)}
              className="ml-2 px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCropField}
          className="w-full mb-4 px-3 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
        >
          Add Crop
        </button>

        {/* Submit Button */}
        <button
          type="button"
          onClick={fetchResults}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Find Crop Varieties
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mt-6 bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Results:
            </h2>
            <ul className="space-y-2">
            {Object.entries(results).reverse().map(([crop, varieties], index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-md font-medium text-gray-700">Crop:  {crop}</h3>
                  <ul className="list-disc list-inside">
                    {varieties.map((variety: CropInfo, idx: number) => (
                      <li key={idx}  className="p-2  mb-2 border flex flex-col border-gray-300 rounded-lg bg-white">
                        <strong>Variety:</strong>{variety.variety} 
                         <strong>Average Price:</strong>₹{variety.average_price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropVarietyFinder;
