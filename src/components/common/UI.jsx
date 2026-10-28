import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";

export function Button({ children, className = "", ...props }) {
  return <button className={`button ${className}`} {...props}>{children}</button>;
}

export function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-intro">{description}</p>}
    </div>
  );
}

export function EmptyState({ title, message, action, to = "/" }) {
  return (
    <div className="empty-state">
      <span className="empty-state-mark" aria-hidden="true">✳</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action && <Link className="button button-primary" to={to}>{action}</Link>}
    </div>
  );
}

export function Price({ value }) {
  return <span className="price">{formatPrice(value)}</span>;
}

export function ToastViewport({ message }) {
  return <div className="toast-viewport" aria-live="polite" aria-atomic="true">{message && <p className="toast-message">{message}</p>}</div>;
}