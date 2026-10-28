import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import CartDrawer from "../cart/Cart.jsx";

export default function Layout() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">A little campus comfort, made fresh every day <span aria-hidden="true">✳</span></div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Campus Bites home"><span className="brand-mark" aria-hidden="true">CB</span><span className="brand-name">Campus <em>Bites</em></span></Link>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink><a href="/#menu">Menu</a><a href="/#categories">Categories</a><a href="/#about">About</a>
          </nav>
          <div className="header-actions">
            <NavLink className="favorites-link" to="/favorites" aria-label="Favorites">Saved</NavLink>
            <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg><span className="cart-label">Cart</span><span className="cart-count" aria-live="polite">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true">CB</span><span className="brand-name">Campus <em>Bites</em></span></Link>
          <p>Fresh, tasty, and affordable meals for every student.</p>
          <nav aria-label="Footer navigation"><Link to="/">Home</Link><a href="/#menu">Menu</a><Link to="/favorites">Favorites</Link></nav>
          <small>© {new Date().getFullYear()} Campus Bites. All rights reserved.</small>
        </div>
      </footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}