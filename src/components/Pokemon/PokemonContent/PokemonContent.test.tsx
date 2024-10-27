import { render, screen } from "@testing-library/react";
import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import PokemonContent from "./PokemonContent";
import { IPokemon } from "@/types/pokemon";
import AppProviders from "@/providers/AppProviders";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe("PokemonContent component", () => {
  const mockPokemonData: IPokemon = {
    id: 25,
    name: "pikachu",
    types: ["electric"],
    baseExperience: 112,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  };

  it("renders pokemon data correctly", () => {
    render(
      <AppProviders>
        <PokemonContent pokemonData={mockPokemonData} />
      </AppProviders>
    );
    expect(screen.getByText(/Name: pikachu/i)).toBeInTheDocument();
    mockPokemonData.types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
    expect(screen.getByText(/Base experience: 112/i)).toBeInTheDocument();
    expect(screen.getByText(/Id: 25/i)).toBeInTheDocument();

    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toBe(mockPokemonData.imageUrl);
  });
});
