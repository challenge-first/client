import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import logo from "../../assets/logo.png";
import userDefaultImage from "../../assets/avatar.png";
import chevronDownIcon from "../../assets/downIcon.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logInuser = JSON.parse(localStorage.getItem("logInUser"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userImageRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userImageRef.current && !userImageRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <HeaderLayout>
      <HeaderContainer>
        <LogoImage
          src={logo}
          onClick={() => {
            navigate("/");
          }}
        />
        <ButtonContainer>
          {logInuser === null ? (
            <>
              <AccountBtn
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </AccountBtn>
              <AccountBtn
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </AccountBtn>
            </>
          ) : (
            <UserImageWrapper onClick={toggleModal} ref={userImageRef}>
              <UserImage src={logInuser.userImage === "default" ? userDefaultImage : logInuser.userImage} />
              {isModalOpen && (
                <Modal>
                  <ModalContent>
                    <ModalItem onClick={() => navigate(`/userinfo/${logInuser.nickname}`)}>마이페이지</ModalItem>
                    <ModalItem onClick={handleLogout}>로그아웃</ModalItem>
                  </ModalContent>
                </Modal>
              )}
            </UserImageWrapper>
          )}
          <PostBtnContainer
            onClick={() => {
              if (logInuser === null) {
                navigate("/login");
              } else {
                navigate("/editor/new");
              }
            }}
          >
            글쓰기
            <DownIconImage src={chevronDownIcon} />
          </PostBtnContainer>
        </ButtonContainer>
      </HeaderContainer>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #ffff;
  border-bottom: 1px solid #eaedef;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1256px;
  height: 81px;
  padding: 0 60px 0 60px;
  margin: 0 auto;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 74px;
  height: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AccountBtn = styled.div`
  color: #2f3438;
  font-size: 14px;
  line-height: 18px;
  border-left: 1px solid #eaedef;
  padding: 0 10px 0 10px;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border: 2px solid #ffff;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    border: 2px solid #35c5f0;
  }
`;
const PostBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #35c5f0;
  width: 94.64px;
  height: 40px;
  padding: 0 16px 0 16px;
  margin-left: 13px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #1778ba;
  }
`;

const DownIconImage = styled.img`
  margin-left: 6px;
  width: 19px;
  height: 19px;
`;

const UserImageWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Modal = styled.div`
  position: absolute;
  left: -50px;
  top: 45px;
  width: 150px;
  background-color: #fff;
  border: 1px solid rgb(218, 221, 224);
  border-radius: 6px;
  box-shadow: rgba(63, 71, 77, 0.2) 0px 4px 10px 0px;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const ModalItem = styled.div`
  color: rgb(47, 52, 56);
  line-height: 21px;
  padding: 10px 14px 11px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;
export default Header;
