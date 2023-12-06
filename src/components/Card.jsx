// Card.js
import React from "react";
import "./card.css";

/**
 * Generate a card component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the card.
 * @param {string} props.image - The image source of the card.
 * @param {Array} props.stats - An array of stats for the card.
 * @param {function} props.handlereSubmit - The submit handler function.
 * @returns {JSX.Element} The rendered card component.
 */
// eslint-disable-next-line react/prop-types
const Card = ({ name, image, stats, handlereSubmit }) => {
  return (
    <div className="card">
      <div>
        <h3 style={{ textAlign: "center" }}>{name}</h3>
        <img src={image} alt={name} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {stats ? (
          <ul>
            {/* eslint-disable-next-line react/prop-types */}
            {stats.map((unit, index) => (
              <li key={index}>
                {unit.stat.name}: {unit.base_stat}
              </li>
            ))}
          </ul>
        ) : (
          <button onClick={() => handlereSubmit(name)}>resubmit</button>
        )}
      </div>
    </div>
  );
};

export default Card;
