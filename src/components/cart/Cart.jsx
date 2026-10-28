import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { Price, EmptyState } from "../common/UI.jsx";

export function CartContents() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) return <EmptyState title="Your cart is taking a break" message="Add something delicious from the menu and it will show up here." action="Browse the menu" />;

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt="" />
            <div className="cart-item-info"><h2>{item.name}</h2><Price value={item.price} /><div className="quantity-controls" aria-label={`Quantity for ${item.name}`}><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div></div>
            <button className="remove-button" type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`}>Remove</button>
          </article>
        ))}
      </div>
      <aside className="order-summary"><p className="eyebrow">YOUR ORDER</p><h2>Order summary</h2><div className="summary-row"><span>Items ({items.reduce((count, item) => count + item.quantity, 0)})</span><Price value={total} /></div><div className="summary-row summary-total"><strong>Total</strong><Price value={total} /></div><Link className="button button-primary checkout-link" to="/checkout">Continue to pickup details <span aria-hidden="true">→</span></Link></aside>
    </div>
  );
}

export default function CartDrawer({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="cart-header"><div><p className="eyebrow">YOUR ORDER</p><h2 id="drawer-title">Your cart</h2></div><button className="icon-button" type="button" aria-label="Close cart" onClick={onClose}>×</button></div>
        <CartContents />
      </aside>
    </div>
  );
}