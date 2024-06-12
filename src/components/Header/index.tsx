import React, { useContext } from "react";
import { HeaderContext } from "../../contexts/HeaderContext";
import logo from "../../image/logo.svg";
import { StyledBlock, StyledImage, StyledTitle, StyledButton } from "./style";

type HeaderContextType = {
  title: string;
};

type HeaderProps = {
  isShowButton: boolean;
  handleActionButton: () => void;
};

const Header = ({ isShowButton, handleActionButton }: HeaderProps) => {
  const { title } = useContext<HeaderContextType>(HeaderContext);

  return (
    <StyledBlock>
      <StyledImage src={logo} alt="" />
      <StyledTitle>{title}</StyledTitle>
      {isShowButton && (
        <StyledButton onClick={handleActionButton}>Выход</StyledButton>
      )}
    </StyledBlock>
  );
};

export default Header;
