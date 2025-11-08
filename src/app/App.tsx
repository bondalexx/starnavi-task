import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HeroesPage from "../features/heroes/pages/HeroesPage";
import HeroDetailsPage from "../features/heroes/pages/HeroDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <HeroesPage /> },
  { path: "/hero/:id", element: <HeroDetailsPage /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
