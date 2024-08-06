import "./HomePage.scss";
import { useEffect, useState } from "react";
import { getCharacters } from "../../api";
import { Character, FavoritesContextType } from "../../types";
import Header from "../../components/Header/Header";
import CharacterList from "../../components/CharacterList/CharacterList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useFavorites } from "../../context/FavoritesContext";

function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [countResults, setCountResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { favorites, showFavorites, setShowFavorites } =
    useFavorites() as FavoritesContextType;

  const ensureHttps = (url: string) => {
    return url.replace(/^http:\/\//i, "https://");
  };

  const fetchCharacters = async (nameStartsWith?: string) => {
    setLoading(true);
    try {
      const res = await getCharacters(nameStartsWith);
      const results = res.data.data.results.map((character: any) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: {
          path: ensureHttps(character.thumbnail.path),
          extension: character.thumbnail.extension,
        },
      }));
      setCountResults(res.data.data.count);
      setCharacters(results);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showFavorites) {
      fetchCharacters(searchTerm);
    }
  }, [showFavorites, searchTerm]);

  const handleFavoritesClick = () => {
    setShowFavorites(true);
  };

  const resetCharacters = () => {
    if (showFavorites) {
      setCharacters([]);
      setCountResults(0);
    }
    setShowFavorites(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main>
      <Header
        onFavoritesClick={handleFavoritesClick}
        resetCharacters={resetCharacters}
      />
      {loading && <ProgressBar />}
      <CharacterList
        characters={showFavorites ? favorites : characters}
        countResults={showFavorites ? favorites.length : countResults}
        onSearch={handleSearch}
        aria-label={showFavorites ? "Favorite characters" : "Character list"}
      />
    </main>
  );
}

export default HomePage;
