export interface IPokemon {
  id: number;
  name: string;
  types: string[];
  baseExperience: number;
  imageUrl: string;
}

export interface IPokemonOption {
  id?: number;
  name?: string;
}

export interface IPokemonFormValues {
  name?: string;
  age?: string;
  pokemon?: IPokemonOption | null | undefined;
}

interface IPokemonType {
  slot: number;
  type: {
    name: string;
  };
}

interface IPokemonSprite {
  front_default: string;
}

export interface IPokemonResponse {
  id: number;
  name: string;
  types: IPokemonType[];
  base_experience: number;
  sprites: IPokemonSprite;
}
