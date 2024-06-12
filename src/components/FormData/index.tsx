import React from "react";
import { Link } from "react-router-dom";
import building from "../../image/Building.svg";
import {
  StyledWrapper,
  StyledForm,
  StyledTitle,
  StyledBlock,
  StyledButton,
  StyledText,
} from "./style";

type FormDataProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  buttonText: string;
  linkText: string;
  linkUrl: string;
  children: React.ReactNode;
};

const FormData = ({
  handleSubmit,
  title,
  buttonText,
  linkText,
  linkUrl,
  children,
}: FormDataProps) => {
  return (
    <StyledWrapper>
      <img src={building} alt="" />
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>{title}</StyledTitle>
        {children}
        <StyledBlock>
          <StyledButton type="submit">{buttonText}</StyledButton>
          <Link to={linkUrl}>
            <StyledText>{linkText}</StyledText>
          </Link>
        </StyledBlock>
      </StyledForm>
    </StyledWrapper>
  );
};

export default FormData;
