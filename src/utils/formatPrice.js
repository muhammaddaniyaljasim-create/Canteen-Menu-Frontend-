export default function formatPrice(price) {
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}