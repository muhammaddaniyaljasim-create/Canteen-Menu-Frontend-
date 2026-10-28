import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { Button, EmptyState, Price } from "../components/common/UI.jsx";
import useMenu from "../hooks/useMenu.js";

export default function ItemDetailsPage() {
  const { itemId } = useParams();
  const { menu, loading } = useMenu();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const item = menu.find((menuItem) => menuItem.id === itemId);

  if (loading) return <p className="loading-state page-width">Loading this campus favorite...</p>;
  if (!item) return <EmptyState title="That bite isn't on today's menu" message="Head back to the menu to find something delicious." action="Browse the menu" />;

  return <section className="details-page page-width"><Link className="back-link" to="/">← Back to menu</Link><article className="details-card"><img src={item.image} alt={item.name} /><div><p className="eyebrow">{item.category}</p><h1>{item.name}</h1><p>{item.description}</p><Price value={item.price} /><Button className="button-primary" type="button" onClick={() => { addItem(item); showToast(`${item.name} added to cart`); }}>Add to cart <span aria-hidden="true">+</span></Button></div></article></section>;
}