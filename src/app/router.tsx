import { createBrowserRouter } from "react-router-dom";
import HeroesPage from "../features/heroes/pages/HeroesPage";
import HeroDetailsPage from "../features/heroes/pages/HeroDetailsPage";
export const router = createBrowserRouter([
  { path: "/", element: <HeroesPage /> },
  { path: "/hero/:id", element: <HeroDetailsPage /> },
]);
