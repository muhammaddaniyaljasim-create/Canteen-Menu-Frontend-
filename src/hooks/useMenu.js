import { useEffect, useState } from "react";
import { getMenu } from "../services/menuService.js";

export default function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getMenu()
      .then((items) => {
        if (active) setMenu(items);
      })
      .catch(() => {
        if (active) setError("We couldn't load the menu. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return { menu, loading, error };
}