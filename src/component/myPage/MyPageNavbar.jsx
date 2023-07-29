import React from "react";
import { styled } from "styled-components";
import { useParams } from 'react-router-dom';
import MyPageNavList from "./MyPageNavList";

function MyPageNavbar() {
  const { id } = useParams();

  const logInUserString = localStorage.getItem('logInUser');
  const logInUser = JSON.parse(logInUserString);
  const logInNickName = logInUser?.nickname;
  const correctId = (logInNickName === id);
  

  return (
    <>
      <StContainer style={{ height: "51px" }}>
        <StNavContainer>
          <StNav>
            <MyPageNavList path={`/userinfo/${id}`}>프로필</MyPageNavList>
            {correctId && 
            (<MyPageNavList path={`/userinfo/${id}/Edit`}>회원정보수정</MyPageNavList>)}
          </StNav>
        </StNavContainer>
      </StContainer>
    </>
  );
}

export default MyPageNavbar;

const StContainer = styled.div`
  border-bottom: 1px solid #eaedef;
`;

const StNavContainer = styled.div`
  max-width: 1256px;

  display: flex;
  align-items: center;
  justify-content: center;
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



// const clickNickName = useParams().id;
// const correctId = (logInNickName === clickNickName);

// console.log("네비게이션바", correctId)