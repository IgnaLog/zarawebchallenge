import "./SearchBar.scss";
import { useRef } from "react";
import Search from "../../assets/Search.svg";

type Props = {
  countResults: number;
  onSearch: (term: string) => void;
};

const SearchBar = ({ countResults, onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
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
        {countResults} RESULTS
      </span>
    </div>
  );
};

export default SearchBar;
