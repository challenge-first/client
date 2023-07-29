import React from "react";
import { styled } from "styled-components";
import NavList from "./NavList";

function Navbar() {
  return (
    <>
      <StContainer style={{ height: "51px" }}>
        <StNavContainer>
          <StNav>
            {/* 테스트 리스트*/}
            <NavList path={"/"}>전체</NavList>
            <NavList path={"/house"}>집사진</NavList>
            <NavList path={"/dailylife"}>취미일상</NavList>
          </StNav>
        </StNavContainer>
      </StContainer>
    </>
  );
}

export default Navbar;

const StContainer = styled.div`
  border-bottom: 1px solid #eaedef;
`;

const StNavContainer = styled.div`
  max-width: 1256px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 60px;
`;

const StNav = styled.nav`
  display: flex;
  align-items: stretch;
  height: 50px;
  font-weight: 500;
  > * {
    margin: 0 5px;
  }
`;
