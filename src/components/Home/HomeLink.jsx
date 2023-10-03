/** @format */

import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const ServiceLink = ({ description }) => {
  const [isFullDescription, setIsFullDescription] = useState(false);

  function trimDescription(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const toggleDescription = () => {
    setIsFullDescription(!isFullDescription);
  };
  return (
    <div className="mt-5">
      <div onClick={toggleDescription}>
        {isFullDescription ? (
          <p>{description}</p>
        ) : (
          <h2>{trimDescription(description, 50)}</h2>
        )}
      </div>
    </div>
  );
};

export default ServiceLink;
