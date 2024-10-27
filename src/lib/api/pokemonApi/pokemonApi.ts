import { IPokemonResponse } from "@/types/pokemon";

export const getPokemon = async (id: number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result: IPokemonResponse = await response.json();
    const filteredResult = {
      id: result.id,
      name: result.name,
      types: result.types.map((item) => item.type.name),
      baseExperience: result.base_experience,
      imageUrl: result.sprites.front_default,
    };
    return filteredResult;
  } catch (e) {
    console.error("Error fetching Pokemon data:", e);
    return null;
  }
};

export default getPokemon;
