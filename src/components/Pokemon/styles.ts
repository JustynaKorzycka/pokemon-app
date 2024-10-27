import { styled } from "@mui/system";
import { Grid } from "@mui/system";

export const ImageContainer = styled(Grid)({
  position: "relative",
  height: "200px",
});

export const DescriptionContainer = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
});
