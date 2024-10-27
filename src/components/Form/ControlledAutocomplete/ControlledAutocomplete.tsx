import { Autocomplete, Box, TextField, Typography } from "@mui/material";

import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface IProps<T> extends Record<string, any> {
  label: string;
  name: string;
  control: Control<FieldValues, T>;
  rules: RegisterOptions;
  placeHolder?: string;
  options: T[];
}

const ControlledAutocomplete = <T,>({
  label,
  name,
  control,
  rules,
  placeHolder = label,
  options,
  ...props
}: IProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, name, onChange }, fieldState: { error } }) => (
        <Box mt={3}>
          <Typography variant="body1" component="label" htmlFor={name}>
            {label}
          </Typography>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeHolder}
                helperText={error?.message || ""}
                error={!!error}
              />
            )}
            id={name}
            data-testid="autocomplete-search"
            value={value}
            onChange={(event, selectedOptions) => {
              onChange(selectedOptions);
            }}
            {...props}
          />
        </Box>
      )}
    />
  );
};

export default ControlledAutocomplete;
