import { styled } from "@mui/system";
import { Typography } from "@mui/material";

interface IProps {
  type: string;
}

const StyledTypo = styled(Typography)(({ theme }) => ({
  display: "inline",
  backgroundColor: theme.palette.primary.light,
  padding: "4px 8px",
  borderRadius: "16px",
}));
const PokemonType = ({ type }: IProps) => {
  return <StyledTypo>{type}</StyledTypo>;
};

export default PokemonType;
