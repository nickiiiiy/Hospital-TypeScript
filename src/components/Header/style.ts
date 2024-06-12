import styled from "styled-components";

export const StyledBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #c5e9ff;
  box-shadow: 4px 4px 4px 4px #00000040;
`;

export const StyledImage = styled.img`
  padding: 15px 35px;
`;

export const StyledTitle = styled.h2`
  font-size: 36px;
  font-weight: 300;
  line-height: 42px;
  text-align: left;
`;

export const StyledButton = styled.button`
  position: absolute;
  font-size: 18px;
  font-weight: 300;
  line-height: 21px;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 4px;
  right: 0;
  margin-right: 40px;
  background: white;
  border: 1px solid #00000033;
  cursor: pointer;
`;
