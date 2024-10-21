import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaFreeCodeCamp, FaMoneyBillAlt, FaThumbsUp } from "react-icons/fa";
// import PropTypes from 'prop-types';

const ChildCard = ({ agent, navigate, logo }) => {
  const [likes, setLikes] = useState(0);

  // This should be inside the component
  useEffect(() => {
    // Effect logic here
    console.log("Effect ran when component mounted or likes changed");
  }, [likes]); // Add the necessary dependencies

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes(likes + 1); // Example logic for incrementing likes
  };
  //   console.log("Agent Data:", agentData);
  //   <ChildCard agent={agentData} navigate={navigateFunction} logo={logoImage} />

  return (
    <div
      className="agent-card"
      key={agent.id}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/detail?${agent.id}`)}
    >
      <img src={agent?.logo} alt={""} className="agent-image" />
      <div className="agent-info">
        <h3 className="name">{agent.name}</h3>

        <p>{agent.tagline}</p>
        {/* <div className="tags">
                      <span className="tag free">{agent?.pricing_model}</span>
                      <span className="tag paid">{agent?.category}</span>
                    </div> */}
        <div>
          <span className="tag free">
            <FaFreeCodeCamp /> {agent?.pricing_model}
          </span>
          <span className="turn">
            <FaMoneyBillAlt /> {agent?.category}
          </span>

          {/* Like button with like count */}
          <span
            className="hello"
            onClick={handleLike}
            style={{ cursor: "pointer", marginLeft: "7px", marginLeft: "17px" }}
          >
            <FaThumbsUp /> {likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
