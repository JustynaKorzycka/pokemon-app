"use client";

import { styled } from "@mui/system";
import { Card } from "@mui/material";
import { ReactNode } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[50]}`,
  padding: "32px",
}));

const CustomCard = ({ children }: { children: ReactNode }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default CustomCard;
