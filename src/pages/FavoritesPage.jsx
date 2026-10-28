import { PageHeading } from "../components/common/UI.jsx";
import { EmptyState } from "../components/common/UI.jsx";
import { MenuGrid } from "../components/menu/Menu.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import useMenu from "../hooks/useMenu.js";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const { menu, loading, error } = useMenu();
  const favorites = menu.filter((item) => favoriteIds.includes(item.id));

  return <section className="page-width standard-page"><PageHeading eyebrow="SAVED FOR LATER" title={<>Your <em>favorites</em></>} description="The things you already know you'll love." />{loading ? <p className="loading-state">Loading favorites...</p> : error ? <p role="alert">{error}</p> : favorites.length ? <MenuGrid items={favorites} /> : <EmptyState title="No favorites yet" message="Save a menu item with the heart button and it will be waiting here." action="Explore the menu" />}</section>;
}