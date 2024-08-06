import "./CharacterCard.scss";
import { Character, FavoritesContextType } from "../../types";
import Favorites from "../../assets/Favorites.svg";
import UnLike from "../../assets/UnLike.svg";
import Like from "../../assets/Like.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

type Props = {
  character: Character;
};

const CharacterCard = ({ character }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isInFavorites } =
    useFavorites() as FavoritesContextType;

  useEffect(() => {
    setFavorite(isInFavorites(character.id));
  }, [isInFavorites, character.id]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    favorite ? removeFavorite(character.id) : addFavorite(character);
    setFavorite(!favorite);
  };
  return (
    <div
      className="mvl-card"
      key={character.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
    >
      <Link
        to={`/character/${character.id}`}
        state={{ character }}
        className="card-link"
        aria-label={`View details of ${character.name}`}
      >
        <div className="card-thumb-frame">
          <figure className="img__wrapper">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </figure>
        </div>
        <div className="card-body">
          <div className="card-body-container">
            <p>{character.name}</p>
            <img
              src={favorite ? (isHovered ? Like : Favorites) : UnLike}
              alt={
                favorite
                  ? isHovered
                    ? "Like Icon"
                    : "Favorites Icon"
                  : "UnLike Icon"
              }
              onClick={handleIconClick}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CharacterCard;
