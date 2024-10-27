import { getPokemon } from "./pokemonApi";

describe("getPokemonData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns filtered Pokemon data when fetch is successful", async () => {
    const mockPokemonData = {
      id: 25,
      name: "pikachu",
      types: [{ type: { name: "electric" } }],
      base_experience: 112,
      sprites: { front_default: "https://example.com/pikachu.png" },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemonData),
      } as Response)
    );
    const result = await getPokemon(25);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/25"
    );
    expect(result).toEqual({
      id: 25,
      name: "pikachu",
      types: ["electric"],
      baseExperience: 112,
      imageUrl: "https://example.com/pikachu.png",
    });
  });

  it("throws an error if fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const result = await getPokemon(999);

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching Pokemon data:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });

  it("returns null and logs error when fetch throws an error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const result = await getPokemon(999);

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching Pokemon data:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
