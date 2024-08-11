import "./HomePage.scss";
import { useEffect, useRef, useState } from "react";
import { Character, FavoritesContextType } from "../../types";
import { useFavorites } from "../../context/FavoritesContext";
import CharacterList from "../../components/CharacterList/CharacterList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import useCharacters from "../../hooks/useCharacters";
import Header from "../../components/Header/Header";

function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<number | null>(null);
  const { favorites, showFavorites, setShowFavorites } =
    useFavorites() as FavoritesContextType;
  const { data, isLoading, isError, totalResults } = useCharacters(
    offset,
    searchTerm
  );

  useEffect(() => {
    if (isError) {
      console.log("An error occurred while fetching characters.");
      return;
    }

    if (data && !isLoading) {
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...data.slice(0, 50 - prevCharacters.length),
      ]);

      const totalData = characters.length + data.length;
      if (totalData < 50 && totalData < totalResults) {
        setOffset((prevOffset) => prevOffset + 5);
      }
    }
  }, [isLoading, offset]);

  const handleSearchChange = (term: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      setSearchTerm(term);
      setCharacters([]);
      setOffset(0);
    }, 300); // Adjust the time it will search for each change in SearchBar
  };

  const handleFavoritesClick = () => {
    setShowFavorites(true);
  };

  const handleLogoClick = () => {
    setShowFavorites(false);
  };

  return (
    <main>
      <Header
        onFavoritesClick={handleFavoritesClick}
        onLogoClick={handleLogoClick}
      />
      {isLoading && <ProgressBar />}
      <CharacterList
        characters={showFavorites ? favorites : characters}
        onSearchChange={handleSearchChange}
        aria-label={showFavorites ? "Favorite characters" : "Character list"}
      />
    </main>
  );
}

export default HomePage;
