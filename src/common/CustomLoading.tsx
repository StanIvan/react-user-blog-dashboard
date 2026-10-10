import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface CustomLoadingProps {
  readonly message?: string;
}

const CustomLoading: React.FC<CustomLoadingProps> = ({
  message = "Loading...",
}) => (
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    minHeight="200px"
    mt={4}
  >
    <CircularProgress />
    <Typography mt={2} variant="body1">
      {message}
    </Typography>
  </Box>
);

export default CustomLoading;
