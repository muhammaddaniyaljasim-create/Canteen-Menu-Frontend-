import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import formatPrice from "../../utils/formatPrice.js";

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (items.length === 0) return;
    clearCart();
    setSubmitted(true);
    showToast("Pickup request noted. See you soon!");
  }

  if (submitted) return <div className="confirmation-state"><span aria-hidden="true">✓</span><p className="eyebrow">PICKUP REQUEST</p><h2>Thanks for stopping by!</h2><p>Your sample pickup request has been noted in this browser.</p><button className="button button-primary" type="button" onClick={() => navigate("/")}>Back to the menu</button></div>;

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <p className="eyebrow">PICKUP DETAILS</p><h2>Almost time to eat.</h2>
      <p className="form-note">This demo stores no order on a server and takes no payment.</p>
      <label>Your name<input name="name" autoComplete="name" required /></label>
      <label>Student email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Pickup note <span className="optional-label">Optional</span><textarea name="note" rows="3" placeholder="Anything we should know?" /></label>
      <div className="summary-row"><span>Order total</span><strong>{formatPrice(total)}</strong></div>
      <button className="button button-primary" type="submit">Request pickup <span aria-hidden="true">→</span></button>
    </form>
  );
}