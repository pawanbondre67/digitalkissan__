import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopCrops: React.FC = () => {
  const [topCrops, setTopCrops] = useState<string[]>(['']);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTopCrops = localStorage.getItem('topCrops');
    if (storedTopCrops) {
      setTopCrops(JSON.parse(storedTopCrops));
      
    }
  }, []);

  return (
    <div className="my-8 min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center p-8">
      <h1 className="ml-12 text-2xl font-extrabold text-green-800 mb-10">
        🌾 Top Crop Recommendations 🌾
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {topCrops.length > 0 ? (
          topCrops.map((crop, index) => (
            <li
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border-t-4 border-green-500 hover:border-green-700 transform hover:scale-105 transition duration-300"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {getCropIcon(crop)} {/* Render crop-specific icons */}
                </div>
                <h2 className="text-xl font-bold text-gray-700 capitalize">
                  {index + 1}. {crop}
                </h2>
                <p className="text-gray-600 mt-2">
                  {cropDescriptions[crop.toLowerCase() as keyof typeof cropDescriptions] ||
                    "This crop is highly recommended for your conditions."}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-xl text-gray-700">No crop recommendations available.</p>
        )}
      </ul>

      <button
        onClick={() => navigate('/cropvarietyfinder')}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
      >
        Go to Crop Variety Finder
      </button>

    </div>
  );
};

// Function to return crop-specific icons or emojis
const getCropIcon = (crop: string): string => {
  const icons: { [key: string]: string } = {
    rice: "🍚",
    गहू: "🌾",
    बाजरी: "🌽",
    सोयाबीन : "🫘",
    ragi: "🍌",
    sugarcane: "🎋",
    ज्वारी: "🌽",
    cotton :"🧶",
    bajra: "🌽",
    jute:"🌿",
    cabbage: "🥦"
  };
  return icons[crop.toLowerCase()] || "🌱";
};

// Crop descriptions for some crops
const cropDescriptions: { [key: string]: string } = {
  rice: "A staple food for over half the world's population.",
  गहू: "An essential crop used for bread and cereals.",
  ज्वारी: "Popularly known as corn, versatile and nutritious.",
  सोयाबीन : "A root vegetable loved worldwide.",
  ragi: "A highly nutritious grain rich in calcium and fiber.",
  बाजरी:"A nutritious, drought-resistant grain grown in India ",
  sugarcane: "The source of sugar and ethanol.",
  tomato: "A juicy, red fruit essential in cuisines.",
  cotton: "A soft, fluffy staple fiber in textiles.",
  jute: "A natural fiber used for sacking and textiles.",
  coffee: "A popular beverage crop loved globally.",
  tea: "A fragrant beverage crop enjoyed hot or cold.",
  coconut: "A versatile crop used for food and cosmetics.",
  rubber: "A valuable crop used in various industries.",
};

export default TopCrops;