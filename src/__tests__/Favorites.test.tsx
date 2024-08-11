import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import CharacterCard from "../components/CharacterCard/CharacterCard";
import { Character } from "../types";
import { FavoritesProvider } from "../context/FavoritesContext";

describe("CharacterCard", () => {
  const character: Character = {
    id: "1",
    name: "Test Character",
    description: "Test Description",
    thumbnail: {
      path: "test-path",
      extension: "jpg",
    },
  };

  const TestComponent = () => {
    // const { favorites } = useFavorites();
    return (
      <>
        <Header onFavoritesClick={() => {}} onLogoClick={() => {}} />
        <CharacterCard character={character} />
      </>
    );
  };

  it("should increment favorites count in Header when adding a favorite", async () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </MemoryRouter>
    );

    const img = screen.getByAltText("UnLike Icon");
    fireEvent.click(img);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument(); // Check if favorites count is incremented
    });
  });

  it("should decrement favorites count in Header when removing a favorite", async () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </MemoryRouter>
    );

    const img = screen.getByAltText("Favorites Icon");
    fireEvent.click(img); // Add to favorites
    fireEvent.click(img); // Remove from favorites

    await waitFor(() => {
      expect(screen.getByText("0")).toBeInTheDocument(); // Check if favorites count is decremented
    });
  });
});
