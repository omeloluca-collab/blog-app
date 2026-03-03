/** @jest-environment node */

import { getArtigos } from "../lib/artigos";

describe("Dados de artigos", () => {
  it("carrega artigos do JSON e gera slug", async () => {
    const artigos = await getArtigos();

    expect(Array.isArray(artigos)).toBe(true);
    expect(artigos.length).toBeGreaterThan(0);

    expect(artigos[0]).toHaveProperty("title");
    expect(artigos[0]).toHaveProperty("slug");
  });
});