import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { getPokemon } from "../../lib/api/pokemonApi/pokemonApi";

import { IPokemon } from "@/types/pokemon";
import Pokemon from "./Pokemon";
import PokemonContent from "./PokemonContent/PokemonContent";
import AppProviders from "@/providers/AppProviders";

jest.mock("src/lib/api/pokemonApi/pokemonApi", () => ({
  getPokemon: jest.fn(),
}));
jest.mock("./PokemonContent/PokemonContent");

describe("Pokemon component", () => {
  const mockGetPokemon = getPokemon as jest.MockedFunction<typeof getPokemon>;
  const MockPokemonContent = PokemonContent as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPokemonDataRes: IPokemon = {
    id: 25,
    name: "pikachu",
    types: ["electric"],
    baseExperience: 112,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  };
  it("fetches and displays Pokemon data when pokemon ID is provided", async () => {
    mockGetPokemon.mockResolvedValueOnce(mockPokemonDataRes);
    MockPokemonContent.mockImplementation(({ pokemonData }) => (
      <div>{pokemonData.name}</div>
    ));

    render(
      <AppProviders>
        <Pokemon pokemon={{ id: 25, name: "pikachu" }} />
      </AppProviders>
    );
    await waitFor(() => expect(mockGetPokemon).toHaveBeenCalledWith(25));

    expect(await screen.findByText("pikachu")).toBeInTheDocument();
  });

  it("renders 'Your pokemon' text when pokemon is undefined", async () => {
    render(
      <AppProviders>
        <Pokemon pokemon={undefined} />
      </AppProviders>
    );
    expect(screen.getByText("Your pokemon")).toBeInTheDocument();
  });

  it("renders 'Your pokemon' text when pokemon is null", async () => {
    render(
      <AppProviders>
        <Pokemon pokemon={null} />
      </AppProviders>
    );
    expect(screen.getByText("Your pokemon")).toBeInTheDocument();
  });

  it("renders 'Your pokemon' text when getPokemon returns null", async () => {
    mockGetPokemon.mockResolvedValueOnce(null);

    render(
      <AppProviders>
        <Pokemon pokemon={{ id: 25, name: "pikachu" }} />
      </AppProviders>
    );
    await waitFor(() => expect(mockGetPokemon).toHaveBeenCalledWith(25));

    expect(screen.getByText("Your pokemon")).toBeInTheDocument();
  });
});
