import React from 'react'
import { styled } from 'styled-components'
import Profile from "../component/myPage/Profile"

function MyPage() {
  return (
    <>
      <StMyPageContainer>
        <Profile />
      </StMyPageContainer>
    </>
  )
}

export default MyPage

const StMyPageContainer = styled.div`
    max-width: 1256px;
    margin: 0 auto;

    padding: 0px 60px;
`