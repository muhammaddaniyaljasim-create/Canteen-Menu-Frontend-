export async function getMenu() {
  const response = await fetch("/data/menu.json");
  if (!response.ok) throw new Error("Menu request failed");

  const menu = await response.json();
  if (!Array.isArray(menu)) throw new Error("Menu data must be a list");
  return menu;
}

export async function getMenuItem(itemId) {
  const menu = await getMenu();
  return menu.find((item) => item.id === itemId) ?? null;
}