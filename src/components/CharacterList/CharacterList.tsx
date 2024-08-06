import "./CharacterList.scss";
import { Character } from "../../types";
import CharacterCard from "../CharacterCard/CharacterCard";
import SearchBar from "../SearchBar/SearchBar";

type Props = {
  characters: Character[];
  countResults: number;
  onSearch: (term: string) => void;
};

const CharacterList = ({ characters, countResults, onSearch }: Props) => {
  return (
    <>
      <div className="container">
        <SearchBar countResults={countResults} onSearch={onSearch} />
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
