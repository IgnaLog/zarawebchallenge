import "./Header.scss";
import MarvelLogo from "../../assets/MarvelLogo.svg";
import Favorites from "../../assets/Favorites.svg";
import { useFavorites } from "../../context/FavoritesContext";
import { FavoritesContextType } from "../../types";

type Props = {
  onFavoritesClick: () => void;
  onLogoClick: () => void;
};

const Header = ({ onFavoritesClick, onLogoClick }: Props) => {
  const { favorites } = useFavorites() as FavoritesContextType;

  const handleLogoClick = () => {
    onLogoClick();
  };

  return (
    <header>
      <div
        className="logo-container"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}
        aria-label="Go to home"
      >
        <img src={MarvelLogo} className="logo-img" alt="Marvel Logo" />
      </div>
      <div
        className="fav-container"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onFavoritesClick()}
        aria-label="View favorites"
      >
        <div className="favorites-icon" onClick={onFavoritesClick}>
          <img src={Favorites} className="favorites-img" alt="Favorites Icon" />
          <span className="favorites-count" aria-live="polite">
            {favorites.length}
          </span>
        </div>
      </div>
    </header>
  );
};
export default Header;
