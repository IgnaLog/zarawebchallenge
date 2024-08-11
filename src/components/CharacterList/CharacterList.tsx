import "./CharacterList.scss";
import { Character } from "../../types";
import CharacterCard from "../CharacterCard/CharacterCard";
import SearchBar from "../SearchBar/SearchBar";

type Props = {
  characters: Character[];
  onSearchChange: (term: string) => void;
};

const CharacterList = ({ characters, onSearchChange }: Props) => {
  return (
    <>
      <div className="container">
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
