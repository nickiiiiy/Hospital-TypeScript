import React from "react";
import {
  StyledLabel,
  StyledInput,
  StyledBlock,
  StyledBlockError,
} from "./style";

type CustomInputProps = {
  error: { [key: string]: string };
  name: string;
  type: string;
  value: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required: boolean;
  refValue?: React.RefObject<HTMLInputElement>;
};

const CustomInput = ({
  error,
  name,
  type,
  value,
  handleChangeInput,
  placeholder,
  label,
  required,
  refValue,
}: CustomInputProps) => {
  return (
    <StyledBlock>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        name={name}
        type={type}
        ref={refValue}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeInput}
        required={required}
      />
      {error[name + "Error"] && (
        <StyledBlockError>{error[name + "Error"]}</StyledBlockError>
      )}
    </StyledBlock>
  );
};

export default CustomInput;
