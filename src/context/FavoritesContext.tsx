import { useContext, createContext, ReactNode, useState } from "react";
import { Character } from "../types";

const context = createContext({});

export const useFavorites = () => {
  return useContext(context);
};

type Props = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const addFavorite = (character: Character) => {
    setFavorites([...favorites, character]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((char) => char.id !== id));
  };

  const isInFavorites = (id: string) => {
    return favorites.some((char) => char.id === id);
  };

  const resetFavorites = () => {
    setFavorites([]);
    setShowFavorites(false);
  };

  return (
    <context.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isInFavorites,
        showFavorites,
        setShowFavorites,
        resetFavorites,
      }}
    >
      {children}
    </context.Provider>
  );
};
