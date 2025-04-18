import React from "react";

import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/test/${id}`);
  };

  const datas = props.datas;
  return (
    <div className="flex flex-wrap">
      {datas.map((country) => (
  <div key={country.cca3} className="w-1/4 p-4">
    <div className="bg-white shadow rounded p-4">
      <img src={country.flags.png} alt={country.name.common} className="w-full h-32 object-cover" />
      <h2 className="text-lg font-bold mt-2">{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {country.languages && Object.values(country.languages).join(', ')}</p>
    </div>
  </div>
))}

    </div>
  );
};

export default Card;
