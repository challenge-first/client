import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function RightPostBox({ $pictureName, $userData }) {
  const navigate = useNavigate();
  const pictureCount = $userData?.length === undefined ? 0 : $userData.length;
  let userDataArray = [];
  if ($userData !== undefined) {
    userDataArray = Object.values($userData);
  }

  const remainderItemOperation = 4 - (userDataArray.length % 4);

  const remainingItems =
    userDataArray.length === 0
      ? 4
      : (remainderItemOperation === 0
      ? 0
      : remainderItemOperation)

  return (
    <StRPBLayout>
      <StRPBTextContainer>
        <StRPBPictureNameBox>{$pictureName}</StRPBPictureNameBox>
        <StRPBPictureCountBox>{pictureCount}</StRPBPictureCountBox>
      </StRPBTextContainer>

      <StRPBPictureContainer>
        {userDataArray.map((item) => (
          <StRBPictureBox
            key={item.postId}
            $imgSrc={item.postImage}
            onClick={() => {
              navigate(`/detail/${item.postId}`);
            }}
            style={{ cursor: "pointer" }}
          />
        ))}

        {Array(remainingItems)
          .fill()
          .map((_, index) => (
            <StRBPictureBox key={index} />
          ))}
      </StRPBPictureContainer>
    </StRPBLayout>
  );
}

export default RightPostBox;

const StRPBLayout = styled.div`
  padding: 50px 35px 20px 35px;

  box-sizing: border-box;
`;
// 사진 1 부분

const StRPBTextContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 20px;
`;

const StRPBPictureNameBox = styled.div`
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 18px;
`;

const StRPBPictureCountBox = styled.div`
  margin-left: 0.4ch;

  font-weight: bold;
  font-size: 18px;
  line-height: 1;
  color: rgb(53, 197, 240);
`;

// 사진들 부분

const StRPBPictureContainer = styled.div`
  margin: 0 -10px -20px;
  display: flex;
  flex-wrap: wrap;
  width: 750px;
`;

const StRBPictureBox = styled.div`
  width: 160px;
  height: 160px;
  box-sizing: border-box;
  margin: 0 10px 20px;

  flex: 0 0 auto;

  outline: none;
  border: none;
  border-radius: 4px;

  background-color: #f5f5f5;
  background-image: ${({ $imgSrc }) => ($imgSrc ? "url(" + $imgSrc + ")" : "")};
  background-size: cover;
  background-position: center;
`;
