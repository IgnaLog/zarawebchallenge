// import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/Home/HomePage";
import "./styles/GlobalStyles.scss";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterDetailPage from "./pages/CharacterDetail/CharacterDetailPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <FavoritesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </BrowserRouter>
  </FavoritesProvider>
  // </React.StrictMode>
);
