import React, { useState } from "react";

const Card = ({ datas }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2   gap-6 bg-[#7E7BC5] min-h-screen">
      {datas.map((country, index) => (
        <div
          key={index}
          onClick={() => setSelectedCountry(country)}
          className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
        >
          {/* Flag Image on Top */}
          <img
            src={country.flags?.png}
            alt={country.name.common}
            className="w-full h-40 object-cover"
          />

          {/* Country Info */}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-[#4B4B4B] mb-2">
              {country.name.common}
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Languages:</strong>{" "}
                {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for selected country */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              onClick={() => setSelectedCountry(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedCountry.name.common}
            </h2>
            <img
              src={selectedCountry.flags?.png}
              alt="Flag"
              className="mb-4 w-32 h-20 object-cover"
            />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Official Name:</strong> {selectedCountry.name?.official}</p>
              <p><strong>Region:</strong> {selectedCountry.region}</p>
              <p><strong>Subregion:</strong> {selectedCountry.subregion}</p>
              <p><strong>Capital:</strong> {selectedCountry.capital?.join(", ")}</p>
              <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
              <p><strong>Area:</strong> {selectedCountry.area} km²</p>
              <p><strong>Languages:</strong> {selectedCountry.languages ? Object.values(selectedCountry.languages).join(", ") : "N/A"}</p>
              <p><strong>Timezones:</strong> {selectedCountry.timezones?.join(", ")}</p>
              <p><strong>Currency:</strong> {selectedCountry.currencies ? Object.values(selectedCountry.currencies).map(c => c.name).join(", ") : "N/A"}</p>
              <p><strong>Independent:</strong> {selectedCountry.independent ? "Yes" : "No"}</p>
              <p><strong>UN Member:</strong> {selectedCountry.unMember ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
