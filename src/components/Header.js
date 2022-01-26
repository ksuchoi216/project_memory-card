import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWapper>
      <Title>Memory Game</Title>
    </HeaderWapper>
  );
};

const HeaderWapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryred};
`;

const Title = styled.h1`
  margin: 20px 4px;
  padding: 4px;
  color: white;
`;

export default Header;
