import React from "react";
import "../../assets/styles/SearchBar/SuggestionsList.css";

const SuggestionsList = ({ suggestions, onSuggestionClick, activeIndex }) => {
  return (
    <div className="position-relative">
      <ul className="list-group suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            className={`list-group-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => onSuggestionClick(suggestion)}
            tabIndex="0"
          >
            {suggestion.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
