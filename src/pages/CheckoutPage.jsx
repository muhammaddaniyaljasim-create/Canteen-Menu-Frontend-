import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CheckoutForm from "../components/checkout/CheckoutForm.jsx";
import { EmptyState, PageHeading } from "../components/common/UI.jsx";

export default function CheckoutPage() {
  const { items } = useCart();
  if (items.length === 0) return <section className="page-width standard-page"><EmptyState title="Your cart is empty" message="Choose a campus favorite before requesting a pickup." action="Browse the menu" /></section>;
  return <section className="page-width standard-page"><Link className="back-link" to="/cart">← Back to cart</Link><PageHeading eyebrow="JUST A FEW DETAILS" title={<>Ready for <em>pickup?</em></>} /><CheckoutForm /></section>;
}