import { Box, TextField, Typography } from "@mui/material";

import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";

interface ControlledInputProps<T> {
  label: string;
  name: string;
  control: Control<FieldValues, T>;
  rules: RegisterOptions;
  placeHolder?: string;
  type?: string;
}

const ControlledInput = <T,>({
  label,
  name,
  control,
  rules,
  placeHolder = label,
  type = "text",
}: ControlledInputProps<T>) => {
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
          <TextField
            fullWidth
            value={value}
            placeholder={placeHolder}
            onChange={onChange}
            error={!!error}
            helperText={error?.message || ""}
            type={type}
            id={name}
          />
        </Box>
      )}
    />
  );
};

export default ControlledInput;
