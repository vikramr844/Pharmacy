import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/SearchBar/SearchBar.css";
import "../../assets/styles/SearchBar/SuggestionsList.css";
import SuggestionsList from "./SuggestionsList";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const uniqueCategories = [
    "All",
    ...new Set([/* categories here */]),
  ];

  const fetchMedicines = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchQuery = useCallback(
    debounce(async (value) => {
      const trimmedValue = value.trim().toLowerCase();
      const medicines = await fetchMedicines();
      if (trimmedValue) {
        const filteredSuggestions = medicines.filter((medicine) => {
          const firstWord = medicine.title.split(" ")[0].toLowerCase();
          const matchesQuery =
            firstWord.startsWith(trimmedValue) ||
            medicine.title.toLowerCase().includes(trimmedValue);
          const matchesCategory = category === "All" || medicine.category === category;
          return matchesQuery && matchesCategory;
        });

        // Sort suggestions by how closely they match the user's input
        const sortedSuggestions = filteredSuggestions.sort((a, b) => {
          const aMatchIndex = a.title.toLowerCase().indexOf(trimmedValue);
          const bMatchIndex = b.title.toLowerCase().indexOf(trimmedValue);
          return aMatchIndex - bMatchIndex;
        });

        setSuggestions(sortedSuggestions.slice(0, 6));
        setNoResults(sortedSuggestions.length === 0);
      } else {
        setSuggestions([]);
        setNoResults(false);
      }
    }, 300),
    [category]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearchQuery(value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    handleSearchQuery(query);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/products/${suggestion.id}`, { state: { medicine: suggestion } });
    setQuery(suggestion.title);
    setSuggestions([]);
  };

  const handleSearch = () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;

    navigate("/results", { state: { query, category } });
  };

  const handleClear = () => {
    setQuery("");
    setCategory("All");
    setSuggestions([]);
    setNoResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && suggestions.length > 0) {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex !== -1) {
      handleSuggestionClick(suggestions[activeIndex]);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <section id="searchBar" className="py-4">
      <div className="text-center">
        <h3>Search for Medicines & Health Products</h3>
        <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown}>
          <div className="category d-flex justify-content-center position-relative">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="form-select category-select"
            >
              {uniqueCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              id="searchInput"
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="form-control search-input"
              placeholder="Search for medicines, supplements, etc."
            />
            <button
              type="button"
              className="btn btn-primary search-button"
              onClick={handleSearch}
              disabled={!query.trim()}
            >
              Search
            </button>
          </div>
          {isFocused && suggestions.length > 0 && (
            <SuggestionsList
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              activeIndex={activeIndex}
            />
          )}
        </form>
        {noResults && <p>No results found for: {query}</p>}
      </div>
    </section>
  );
};

export default SearchBar;
