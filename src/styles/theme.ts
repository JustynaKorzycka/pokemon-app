"use client";

import { createTheme } from "@mui/material";
import colors from "./colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    reset: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-ibm-vga)",
    h2: {
      fontWeight: 400,
    },
  },
  palette: {
    primary: colors.primary,
    grey: colors.grey,
    error: colors.error,
    text: colors.text,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          outline: "none",
        },
        "& Mui-focused": {
          boxShadow: `0px 0px 0px 4px ${colors.primary.light}`,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "reset" },
          style: {
            backgroundColor: colors.grey[400],
            color: colors.text.primary,
            "&:hover": {
              backgroundColor: colors.grey[300],
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          "&:focus-visible": {
            boxShadow: `0px 0px 0px 4px ${colors.primary.light}`,
          },
          padding: "10px 24px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root:focus-within": {
            boxShadow: "0px 0px 0px 4px #9747FF40",
          },
        },
      },
    },
  },
});

export default theme;
