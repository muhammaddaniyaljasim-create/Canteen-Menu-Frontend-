import { PageHeading } from "../components/common/UI.jsx";
import { CartContents } from "../components/cart/Cart.jsx";

export default function CartPage() {
  return <section className="page-width standard-page"><PageHeading eyebrow="YOUR ORDER" title={<>Your <em>cart</em></>} description="Review your campus favorites before pickup." /><CartContents /></section>;
}