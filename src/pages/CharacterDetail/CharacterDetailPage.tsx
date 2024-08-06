import "./CharacterDetailPage.scss";
import CharacterDetail from "../../components/CharacterDetail/CharacterDetail";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Character, Comic, FavoritesContextType } from "../../types";
import { useEffect, useState } from "react";
import { getComicsById } from "../../api";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useFavorites } from "../../context/FavoritesContext";

const CharacterDetailPage = () => {
  const location = useLocation();
  const character = location.state?.character as Character;
  const navigate = useNavigate();

  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { setShowFavorites } = useFavorites() as FavoritesContextType;

  const ensureHttps = (url: string) => {
    return url.replace(/^http:\/\//i, "https://");
  };

  useEffect(() => {
    setShowFavorites(false);
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await getComicsById(character.id);

        const results = res.data.data.results.map((comic: any) => {
          const onSaleDateObj = comic.dates.find(
            (date: any) => date.type === "onsaleDate"
          );
          const onSaleDate = onSaleDateObj ? onSaleDateObj.date : "Unknown";

          return {
            id: comic.id,
            title: comic.title,
            onSaleDate: onSaleDate,
            thumbnail: {
              path: ensureHttps(comic.thumbnail.path),
              extension: comic.thumbnail.extension,
            },
          };
        });

        results.sort(
          (a: Comic, b: Comic) =>
            new Date(b.onSaleDate).getTime() - new Date(a.onSaleDate).getTime()
        );

        setComics(results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (!character) {
    return <p>No character data available</p>;
  }

  const handleFavoritesClick = () => {
    setShowFavorites(true);
    navigate("/");
  };

  return (
    <main>
      <Header onFavoritesClick={handleFavoritesClick} />
      {loading && <ProgressBar />}
      <CharacterDetail character={character} comics={comics} />
    </main>
  );
};

export default CharacterDetailPage;
