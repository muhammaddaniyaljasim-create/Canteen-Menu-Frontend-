import { afterEach, describe, expect, it, vi } from "vitest";
import { getMenu, getMenuItem } from "../src/services/menuService.js";

afterEach(() => vi.unstubAllGlobals());

describe("menuService", () => {
  it("loads the static menu list", async () => {
    const menu = [{ id: "tea", name: "Tea", price: 80 }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => menu }));

    await expect(getMenu()).resolves.toEqual(menu);
    expect(fetch).toHaveBeenCalledWith("/data/menu.json");
  });

  it("returns null when an item id is unknown", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => [] }));
    await expect(getMenuItem("missing-item")).resolves.toBeNull();
  });

  it("reports an unsuccessful menu request", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(getMenu()).rejects.toThrow("Menu request failed");
  });
});