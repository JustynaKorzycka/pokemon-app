import { Stack, Button, Dialog, Typography } from "@mui/material";
import React from "react";

interface IProps {
  open: boolean;
  title?: string;
  buttonText?: string;
  onClose: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
}

const InfoDialog = ({
  open,
  title = "Success",
  buttonText = "OK",
  onClose,
  onSubmit,
  children,
}: IProps) => {
  const handleSubmit = () => {
    if (onSubmit) onSubmit();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack
        textAlign="center"
        p={4}
        rowGap={4}
        alignItems="center"
        sx={{ minWidth: "340px" }}
      >
        <Typography variant="h2" color="#000">
          {title}
        </Typography>
        {children}
        <Button onClick={handleSubmit} variant="contained">
          {buttonText}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default InfoDialog;
