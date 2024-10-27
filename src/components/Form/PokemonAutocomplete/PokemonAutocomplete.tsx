import { FormEvent, useState } from "react";
import { debounce, Typography } from "@mui/material";

import ControlledAutocomplete from "../ControlledAutocomplete/ControlledAutocomplete";
import InfoDialog from "@/components/InfoDialog";
import { IPokemonFormValues, IPokemonOption } from "@/types/pokemon";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  control: Control<FieldValues, IPokemonFormValues>;
  rules: RegisterOptions;
  placeHolder?: string;
}

const PokemonAutocomplete = (props: IProps) => {
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPokemons = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/search?name=${query}`
      );
      const data = await response.json();

      setOptions(data);
    } catch (error) {
      console.log(error);
      setError(true);
      throw new Error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const debounceFetch = debounce((query: string) => {
    fetchPokemons(query);
  }, 500);

  const filterOptions = (options: { id: number; name: string }[]) => {
    return options;
  };

  const handleCloseErrorDialog = () => setError(false);

  return (
    <>
      <ControlledAutocomplete
        options={options}
        loading={loading}
        filterOptions={filterOptions}
        getOptionLabel={(option: IPokemonOption) =>
          option ? option?.name : ""
        }
        onInputChange={(event: FormEvent<HTMLInputElement>, query: string) => {
          debounceFetch(query);
        }}
        {...props}
      />
      <InfoDialog
        open={error}
        title="Error :("
        onClose={handleCloseErrorDialog}
      >
        <Typography>An error occurred. Pleas try later</Typography>
      </InfoDialog>
    </>
  );
};

export default PokemonAutocomplete;
