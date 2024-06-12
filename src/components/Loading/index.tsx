import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledWrapper } from "./style";

const Loading = () => {
  return (
    <StyledWrapper>
      <CircularProgress />
    </StyledWrapper>
  );
};

export default Loading;
