export interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Comic {
  id: string;
  title: string;
  onSaleDate: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export type FavoritesContextType = {
  favorites: Character[];
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  addFavorite: (character: Character) => void;
  removeFavorite: (id: string) => void;
  isInFavorites: (id: string) => boolean;
  resetFavorites: () => void;
};
