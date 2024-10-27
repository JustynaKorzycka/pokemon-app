"use client";
import { useState } from "react";
import { Button, Stack } from "@mui/material";

import ControlledInput from "./ControlledInput/ControlledInput";
import PokemonAutocomplete from "./PokemonAutocomplete/PokemonAutocomplete";
import InfoDialog from "../InfoDialog";
import Pokemon from "../Pokemon/Pokemon";
import ErrorMessage from "@/utils/form/errorMessages";
import { IPokemonFormValues } from "@/types/pokemon";
import { defaultValues } from "./helpers";
import { StyledPokemonStack } from "./styles";
import { useForm } from "react-hook-form";

const Form = () => {
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    watch,
    reset,
  } = useForm<IPokemonFormValues>({ defaultValues });

  const selectedPokemon = watch("pokemon");

  const handleCloseSuccessModal = () => setIsOpenSuccessDialog(false);

  const handleResetForm = () => reset();

  const onSubmit = () => {
    if (!isDirty) return;
    setIsOpenSuccessDialog(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" columnGap={3}>
        <ControlledInput
          label="Trainer's name"
          name="name"
          control={control}
          rules={{
            required: ErrorMessage.requiredName,
            minLength: { value: 2, message: ErrorMessage.minName },
            maxLength: { value: 20, message: ErrorMessage.maxName },
          }}
        />
        <ControlledInput
          label="Trainer's age"
          name="age"
          control={control}
          type="number"
          rules={{
            required: ErrorMessage.requiredAge,
            min: { value: 16, message: ErrorMessage.minAge },
            max: { value: 99, message: ErrorMessage.maxAge },
          }}
        />
      </Stack>
      <PokemonAutocomplete
        label="Pokemon name"
        name={"pokemon"}
        placeHolder="Choose"
        control={control}
        rules={{
          required: ErrorMessage.requiredPokemon,
        }}
      />
      <StyledPokemonStack
        padding={3}
        my={3}
        alignItems="center"
        justifyContent="center"
      >
        <Pokemon pokemon={selectedPokemon} />
      </StyledPokemonStack>
      <Stack direction="row" justifyContent="end" columnGap={3}>
        <Button variant="reset" size="medium" onClick={handleResetForm}>
          Reset
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
      <InfoDialog
        open={isOpenSuccessDialog}
        onClose={handleCloseSuccessModal}
        onSubmit={handleResetForm}
        buttonText="Reset from"
      />
    </form>
  );
};

export default Form;
