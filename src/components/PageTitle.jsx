import React from "react";

const SuggestionsList = ({ suggestions, activeSuggestion, onSuggestionClick }) => {
  return (
    suggestions.length > 0 && (
      <ul className="list-group position-absolute w-100 mt-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            className={`list-group-item ${activeSuggestion === index ? "active" : ""}`}
            onClick={() => onSuggestionClick(suggestion)} 
          >
            {suggestion.name} - <em>{suggestion.category}</em>
          </li>
        ))}
      </ul>
    )
  );
};

export default SuggestionsList;
