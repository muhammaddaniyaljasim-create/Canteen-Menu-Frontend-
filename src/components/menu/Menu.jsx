import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { Price } from "../common/UI.jsx";

export const categories = ["All", "Fast Food", "Meals", "Snacks", "Drinks"];

export function CategoryFilters({ selected, onSelect }) {
  return (
    <div className="filter-list" role="group" aria-label="Filter by category">
      {categories.map((category) => (
        <button key={category} className={`filter-button ${selected === category ? "is-active" : ""}`} type="button" aria-pressed={selected === category} onClick={() => onSelect(category)}>{category}</button>
      ))}
    </div>
  );
}

export function MenuGrid({ items }) {
  const { addItem } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  if (items.length === 0) {
    return <div className="empty-results"><span aria-hidden="true">⌕</span><h2>No bites found</h2><p>Try another food name or choose a different category.</p></div>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => {
        const isFavorite = favoriteIds.includes(item.id);
        return (
          <article className="menu-card" key={item.id}>
            <Link className="menu-card-image" to={`/menu/${item.id}`} aria-label={`View ${item.name}`}>
              <img src={item.image} alt={item.name} loading="lazy" />
              <span className="category-tag">{item.category}</span>
            </Link>
            <div className="menu-card-body">
              <div className="menu-card-title"><h2><Link to={`/menu/${item.id}`}>{item.name}</Link></h2><button className={`favorite-button ${isFavorite ? "is-favorite" : ""}`} type="button" aria-label={`${isFavorite ? "Remove" : "Save"} ${item.name} ${isFavorite ? "from" : "to"} favorites`} onClick={() => { toggleFavorite(item.id); showToast(isFavorite ? "Removed from favorites" : "Saved to favorites"); }}>♡</button></div>
              <p className="menu-card-description">{item.description}</p>
              <div className="menu-card-bottom"><Price value={item.price} /><button className="add-button" type="button" aria-label={`Add ${item.name} to cart`} onClick={() => { addItem(item); showToast(`${item.name} added to cart`); }}>+</button></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}