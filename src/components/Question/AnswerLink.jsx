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
    <div className=" ml-5 pt-3">
      <div onClick={toggleDescription}>
        {isFullDescription ? (
          <p>{description}</p>
        ) : (
          <p>{trimDescription(description, 50)}</p>
        )}
      </div>
    </div>
  );
};

export default ServiceLink;
