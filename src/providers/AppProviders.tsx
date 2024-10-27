import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";

const AppProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProviders;
