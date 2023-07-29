import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { putUserUpdate } from "../../api/auth";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import avartar from "../../assets/avatar.png"
import { useParams } from 'react-router-dom';

function MyEdit() {
  const userDataString = localStorage?.getItem('logInUser');
  const userData = JSON.parse(userDataString);
  const [nicknameContent, setNicknameContent] = useState(userData?.nickname);
  const [oneLineContent, setOneLineContent] = useState(userData?.introduce);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(userData?.userImage === "default" ? avartar : userData?.userImage);
  const inputRef = useRef(null);
  const inputTextRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // nicknameContent가 null일 때 홈페이지로 리다이렉트
    if ((userDataString === null) || (nicknameContent!==id)) {
      navigate(`/userinfo/${id}`);
    }
  }, []);

  // 입력한 값이 없을 때 에러 메시지 표시 여부를 결정하는 함수
  const nicknameLength = nicknameContent?.trim().length;
  const isNicknameContentError = (nicknameLength === 0)||(nicknameLength < 2)||(nicknameLength > 15);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImgClick = () => {
    inputRef.current.click();
  };

  const handleDeleteImg = () => {
    setSelectedFile(null);
    if (profileImg !== avartar) {
      setProfileImg(avartar);
    }
  }

  //api 연결..
  const mutation = useMutation(putUserUpdate, {
    onSuccess: () => {
      localStorage.clear();
      navigate("/login");
    },
    onError: (error) => {
      console.error("요청 실패:", error);
    },
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    if (isNicknameContentError){
      // 스크롤 올라가기
      const inputWrapper = document.getElementById("nicknameInputWrapper");
      const { top } = inputWrapper.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top - 400,
        behavior: "smooth"
      });

      // focus
      // inputTextRef.current.focus();
    }else{
      let updatedData = null;
      if(selectedFile !== null){
        updatedData = {
          "introduce" : oneLineContent,
          "nickname" : nicknameContent,
          "image" : (profileImg === "default") ? "default" : selectedFile
        }
      } else{
        updatedData = {
          "introduce" : oneLineContent,
          "nickname" : nicknameContent,
          "image": null
        }
      }

      mutation.mutate(updatedData);
    }
  };

  return (
      <StMPELayout onSubmit={handleSubmit}>
        <StMPETitleBox>회원정보수정</StMPETitleBox>

        <StMPEInputContainer>
          <StMPEInputLabelBox id="nicknameInputWrapper">
            별명
            <StMPEInputLabelRequireBox>* 필수항목</StMPEInputLabelRequireBox>
          </StMPEInputLabelBox>

          <StMPEInputWrapper>
            <StMPEInputBox
              value={nicknameContent}
              onChange={(e) => setNicknameContent(e.target.value)}
              $hasError={isNicknameContentError} // 에러 메시지 표시 여부에 따라 스타일 변경
              ref={inputTextRef}
              maxLength={15}
              placeholder="2~15자로 적어주세요"
            />
            {isNicknameContentError && (
              <StMPEInputErrorBox>{ nicknameLength === 0 ? "필수 입력 항목입니다." : "2~15자로 입력해주세요"}</StMPEInputErrorBox>
            )}
          </StMPEInputWrapper>
        </StMPEInputContainer>

        <StMPEInputContainer>
          <StMPEInputLabelBox>
            프로필 이미지
          </StMPEInputLabelBox>

          <StMPEImgWrapper>
          <StMPEImgPositionBox>
            <StMPEImgInputBox
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputRef}
            />
            <StMPEImgLabelBox onClick={handleImgClick}>
              {selectedFile ? (
                <StMPEImgBox src={URL.createObjectURL(selectedFile)} alt="프로필 이미지" />
              ) : (
                <StMPEImgBox src={profileImg} alt="프로필 이미지" />
              )}
            </StMPEImgLabelBox>
            {(profileImg !== avartar)||(selectedFile !== null) ? <StMPEDeleteBtn type="button" onClick={handleDeleteImg}>삭제</StMPEDeleteBtn> : null}
            </StMPEImgPositionBox>
          </StMPEImgWrapper>
        </StMPEInputContainer>

        <StMPEInputContainer>
          <StMPEInputLabelBox>
            한줄 소개
          </StMPEInputLabelBox>

          <StMPEInputWrapper>
            <StMPEInputBox
              value={(oneLineContent==="null" ? "" : oneLineContent)}
              onChange={(e) => setOneLineContent(e.target.value)}
              maxlength  = '40'
            />
          </StMPEInputWrapper>
        </StMPEInputContainer>

        <StMPEBtn type="submit">회원정보 수정</StMPEBtn>
      </StMPELayout>
  );
}

export default MyEdit;

const StMPELayout = styled.form`
  margin: 50px auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 50px;
  color: #292929;
`;

//회원정보수정

const StMPETitleBox = styled.div`
  align-items: center;
  margin-bottom: 60px;
  font-size: 24px;
  font-weight: 700;
`;

//input container

const StMPEInputContainer = styled.div`
  font-size: 15px;
  display: flex;
`;

const StMPEInputLabelBox = styled.div`
  padding-top: 30px;
  width: 100px;
`;

const StMPEInputLabelRequireBox = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #757575;
`;

const StMPEInputWrapper = styled.div`
  max-width: 400px;
  -webkit-box-flex: 1;
  padding: 20px 0;
`;

const StMPEInputBox = styled.input`
  height: 40px;
  width: 400px;
  padding: 0 15px;
  line-height: 40px;

  border-radius: 6px;
  text-align: left;
  box-sizing: border-box;

  border: 1px solid ${({ $hasError }) => ($hasError ? "#f77" : "#dbdbdb")};
  background-color: #fff;

  font-size: inherit;
  color: inherit;

  &:focus {
    background-color: #f7f8fa;
    outline: ${({ $hasError }) => ($hasError ? "1px solid #f77" : "3px solid #c8ffff")};
  }
  &:hover {
    background-color: #f7f8fa;
  }
`

const StMPEInputErrorBox = styled.div`
  margin: 15px 0;
  color: #f77;
`;

//이미지

const StMPEImgWrapper = styled.div`
  width: 200px;
  height: 240px;
  margin: 0 0 10px;
  padding: 20px 0;
`;

const StMPEImgPositionBox = styled.div`
  position: relative;
  height: 100%;

  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  background-color: #d8d8d8;

  &:hover {
    opacity: 0.5;
    transition: opacity 0.1s;
  }
`;

const StMPEDeleteBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  padding: 4px 10px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 700;
  
  background-color: #35c5f0;
  color: #fff;

  cursor: pointer;
`

const StMPEImgInputBox = styled.input`
  display: none;
`;

const StMPEImgLabelBox = styled.label`
  width: inherit;
  height: inherit;
  font-size: 0;
  cursor: pointer;
`;

const StMPEImgBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

//버튼

const StMPEBtn = styled.button`
  margin: 50px 0 0 100px;
  width: 290px;

  padding: 11px 10px;
  font-size: 17px;
  font-weight: 700;
  line-height: 26px;

  background-color: #35c5f0;
  border: none;
  color: #fff;

  text-align: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #09addb;
  }
`