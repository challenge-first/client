import React from "react";
import LeftProfileBox from "./LeftProfileBox";
import { styled } from "styled-components";
import RightPostBox from "./RightPostBox";
import { useParams } from "react-router-dom";
import { getMyUserApi, getOtherUserApi } from "../../api/user";
import { useQuery } from "react-query";

function Profile() {
  //마이페이지인지, 다른 회원페이지인지 확인하는 부분
  const { id } = useParams();

  const logInUserString = localStorage.getItem("logInUser");
  const logInUser = JSON.parse(logInUserString);
  const logInNickName = logInUser?.nickname;
  const correctId = logInNickName === id;

  const { isLoading, isError, data } = useQuery(correctId ? "myUserDataApi" : "otherUserDataApi", () =>
    correctId ? getMyUserApi() : getOtherUserApi(id)
  );

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const userData = data.data.data;
  const userDataPostList = userData.postList;
  const userDataLikeList = userData?.likeList;

  return (
    <StProfileContainer>
      <LeftProfileBox $correctId={correctId} $userData={userData} />
      <div>
        <RightPostBox $pictureName="사진" $userData={userDataPostList} />
        {correctId && <RightPostBox $pictureName="좋아요" $userData={userDataLikeList} />}
      </div>
    </StProfileContainer>
  );
}

export default Profile;

const StProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
