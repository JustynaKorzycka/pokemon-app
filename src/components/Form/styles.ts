"use client";

import { Stack, styled } from "@mui/system";

export const StyledPokemonStack = styled(Stack)(({ theme }) => ({
  minHeight: "40vh",
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: "2px",
}));
