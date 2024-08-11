import "./CharacterDetailPage.scss";
import CharacterDetail from "../../components/CharacterDetail/CharacterDetail";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Character, Comic, FavoritesContextType } from "../../types";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useFavorites } from "../../context/FavoritesContext";
import useComics from "../../hooks/useComis";

const CharacterDetailPage = () => {
  const location = useLocation();
  const character = location.state?.character as Character;
  const navigate = useNavigate();
  const [comics, setComics] = useState<Comic[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const { setShowFavorites } = useFavorites() as FavoritesContextType;
  const { data, isLoading, isError, totalResults } = useComics(
    offset,
    character.id
  );

  useEffect(() => {
    if (isError) {
      console.log("An error occurred while fetching characters.");
      return;
    }

    if (data && !isLoading) {
      setComics((prevComics) => [
        ...prevComics,
        ...data.slice(0, 20 - prevComics.length),
      ]);

      const totalData = comics.length + data.length;
      if (totalData < 20 && totalData < totalResults) {
        setOffset((prevOffset) => prevOffset + 5);
      }
    }
  }, [isLoading, offset]);

  if (!character) {
    return <p>No character data available</p>;
  }

  const handleFavoritesClick = () => {
    setShowFavorites(true);
    navigate("/");
  };

  const handleLogoClick = () => {
    setShowFavorites(false);
    navigate("/");
  };

  return (
    <main>
      <Header
        onFavoritesClick={handleFavoritesClick}
        onLogoClick={handleLogoClick}
      />
      {isLoading && <ProgressBar />}
      <CharacterDetail character={character} comics={comics} />
    </main>
  );
};

export default CharacterDetailPage;
