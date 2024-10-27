import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import PokemonContent from "./PokemonContent/PokemonContent";
import { IPokemon, IPokemonOption } from "@/types/pokemon";
import { getPokemon } from "@/lib/api/pokemonApi/pokemonApi";

const Pokemon = ({
  pokemon,
}: {
  pokemon: IPokemonOption | null | undefined;
}) => {
  const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async (id: number) => {
      const fetchedData = await getPokemon(id);
      setPokemonData(fetchedData);
    };
    if (pokemon === null || pokemon === undefined) setPokemonData(null);
    else if (pokemon.id) fetchPokemon(pokemon.id);
  }, [pokemon]);

  if (!pokemonData)
    return (
      <Typography color="textSecondary" textAlign="center">
        Your pokemon
      </Typography>
    );
  return <PokemonContent pokemonData={pokemonData} />;
};

export default Pokemon;
