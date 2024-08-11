import "./SearchBar.scss";
import { useRef } from "react";
import Search from "../../assets/Search.svg";
import { Character } from "../../types";

type Props = {
  characters: Character[];
  onSearchChange: (term: string) => void;
};

const SearchBar = ({ characters, onSearchChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div
      className="search-container"
      role="search"
      aria-labelledby="search-bar-label"
    >
      <div
        className="search-input-container"
        onClick={handleContainerClick}
        role="combobox"
        aria-expanded="false"
        aria-controls="search-input"
      >
        <input
          id="search-bar-id"
          name="search-bar"
          type="text"
          placeholder="SEARCH A CHARACTER..."
          className="search-input"
          ref={inputRef}
          onChange={handleInputChange}
          aria-label="Search characters"
        />
        <span className="search-icon" role="img" aria-label="Search icon">
          <img src={Search} alt="Search Icon" />
        </span>
      </div>
      <span className="results-count" aria-live="polite">
        {characters.length} RESULTS
      </span>
    </div>
  );
};

export default SearchBar;
