import React from "react";
import { useParams } from "react-router-dom";

const OneCard = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Country ID: {id}</h1>
        {/* You can now fetch and show full country data using this ID */}
      </div>
    </div>
  );
};

export default OneCard;
