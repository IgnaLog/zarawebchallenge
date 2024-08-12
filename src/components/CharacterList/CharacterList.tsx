import "./CharacterList.scss";
import { Character, FavoritesContextType } from "../../types";
import CharacterCard from "../CharacterCard/CharacterCard";
import SearchBar from "../SearchBar/SearchBar";
import { useFavorites } from "../../context/FavoritesContext";
import { useEffect, useState } from "react";

type Props = {
  characters: Character[];
  onSearchChange: (term: string) => void;
};

const CharacterList = ({ characters, onSearchChange }: Props) => {
  const { showFavorites } = useFavorites() as FavoritesContextType;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [showFavorites]);

  return (
    <>
      <div className={`container ${animate ? "show" : ""}`}>
        {showFavorites && <p>FAVORITES</p>}
        <SearchBar characters={characters} onSearchChange={onSearchChange} />
        <section aria-labelledby="character-list" role="list">
          {characters.map((character) => (
            <CharacterCard character={character} key={character.id} />
          ))}
        </section>
      </div>
    </>
  );
};

export default CharacterList;
