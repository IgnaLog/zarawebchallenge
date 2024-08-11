import "./CharacterDetail.scss";
import UnFavorites from "../../assets/UnFavorites.svg";
import Favorites from "../../assets/Favorites.svg";
import { Character, Comic, FavoritesContextType } from "../../types";
import { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";

type Props = {
  character: Character;
  comics: Comic[];
};

const CharacterDetail = ({ character, comics }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const { addFavorite, removeFavorite, isInFavorites } =
    useFavorites() as FavoritesContextType;

  useEffect(() => {
    setFavorite(isInFavorites(character.id));
  }, [isInFavorites, character.id]);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    favorite ? removeFavorite(character.id) : addFavorite(character);
    setFavorite(!favorite);
  };

  return (
    <>
      <div className="character-resume" aria-labelledby="character-title">
        <div className="character-resume-content">
          <figure className="character-photo-wrapper">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              aria-describedby="character-description"
            />
          </figure>
          <div className="character-info">
            <div className="character-title">
              <p>{character.name}</p>
              <img
                src={favorite ? Favorites : UnFavorites}
                alt={favorite ? "Favorites Icon" : "UnFavorites Icon"}
                onClick={handleIconClick}
                aria-label={
                  favorite ? "Remove from favorites" : "Add to favorites"
                }
              />
            </div>
            <p className="character-description">{character.description}</p>
          </div>
        </div>
      </div>
      <div className="character-comics">
        <div className="comics-content">
          <p className="comics-title">COMICS</p>
          <div className="chooseBrand">
            {comics.map((comic) => (
              <div className="brand" key={comic.id}>
                <div className="brandImage">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                </div>
                <div className="brandName">
                  <p className="comic-title">{comic.title}</p>
                  <p className="comic-year">
                    {new Date(comic.onSaleDate).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterDetail;
