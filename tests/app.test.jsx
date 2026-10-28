import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App.jsx";
import { CartProvider } from "../src/context/CartContext.jsx";
import { FavoritesProvider } from "../src/context/FavoritesContext.jsx";
import { ToastProvider } from "../src/context/ToastContext.jsx";
import { MemoryRouter } from "react-router-dom";
import { getMenu } from "../src/services/menuService.js";

vi.mock("../src/services/menuService.js", () => ({ getMenu: vi.fn() }));

const sampleMenu = [
  { id: "zinger", name: "Zinger Burger", description: "Crispy chicken burger", price: 450, category: "Fast Food", image: "/burger.jpg", popular: true },
  { id: "biryani", name: "Chicken Biryani", description: "Spiced rice and chicken", price: 300, category: "Meals", image: "/biryani.jpg" }
];

function renderApp() {
  return render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><ToastProvider><CartProvider><FavoritesProvider><App /></FavoritesProvider></CartProvider></ToastProvider></MemoryRouter>);
}

beforeEach(() => {
  window.localStorage.clear();
  getMenu.mockResolvedValue(sampleMenu);
});

describe("Campus Bites app", () => {
  it("filters and searches menu items", async () => {
    const { container } = renderApp();
    await screen.findByText("Showing 2 items");
    const menuGrid = container.querySelector(".menu-grid");
    fireEvent.click(screen.getByRole("button", { name: "Meals" }));
    expect(within(menuGrid).getByRole("heading", { name: "Chicken Biryani" })).toBeInTheDocument();
    expect(within(menuGrid).queryByRole("heading", { name: "Zinger Burger" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    fireEvent.change(screen.getByRole("searchbox", { name: "Search menu" }), { target: { value: "no dish" } });
    expect(screen.getByText("No bites found")).toBeInTheDocument();
  });

  it("updates cart quantities, totals, and item removal", async () => {
    renderApp();
    await screen.findByText("Showing 2 items");
    fireEvent.click(screen.getByRole("button", { name: "Add Zinger Burger to cart" }));
    fireEvent.click(screen.getByRole("button", { name: "Open cart, 1 item" }));
    const drawer = screen.getByRole("dialog", { name: "Your cart" });
    expect(drawer.querySelector(".summary-total .price")).toHaveTextContent("Rs. 450");
    fireEvent.click(within(drawer).getByRole("button", { name: "Increase Zinger Burger quantity" }));
    expect(drawer.querySelector(".summary-total .price")).toHaveTextContent("Rs. 900");
    fireEvent.click(within(drawer).getByRole("button", { name: "Remove Zinger Burger from cart" }));
    await waitFor(() => expect(within(drawer).getByText("Your cart is taking a break")).toBeInTheDocument());
  });
});