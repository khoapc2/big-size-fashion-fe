import Stack from "@mui/material/Stack";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export default function LoadingBox() {
  return (
    <Stack
      width="100%"
      height="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        sx={{
          alignItems: "center",
        }}
        disableShrink
      />
    </Stack>
  );
}
