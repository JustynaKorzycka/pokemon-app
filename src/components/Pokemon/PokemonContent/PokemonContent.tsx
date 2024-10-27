import Image from "next/image";
import { Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

import PokemonType from "../PokemonType";
import { DescriptionContainer, ImageContainer } from "../styles";
import { IPokemon } from "@/types/pokemon";

const PokemonContent = ({ pokemonData }: { pokemonData: IPokemon }) => {
  return (
    <Grid container spacing={3} alignContent="center" width="100%">
      <ImageContainer size={6}>
        <Image
          alt={pokemonData.name}
          src={pokemonData.imageUrl}
          width={200}
          height={200}
        />
      </ImageContainer>
      <DescriptionContainer size={6} alignSelf="center">
        <Typography>{`Name: ${pokemonData.name}`}</Typography>
        <Box display="flex" alignItems="center">
          <Typography display="inline-block">Type:</Typography>
          <Box display="flex" columnGap={1}>
            {pokemonData.types.map((type) => (
              <PokemonType type={type} key={type} />
            ))}
          </Box>
        </Box>
        <Typography>{`Base experience: ${pokemonData.baseExperience}`}</Typography>
        <Typography>{`Id: ${pokemonData.id}`}</Typography>
      </DescriptionContainer>
    </Grid>
  );
};

export default PokemonContent;
