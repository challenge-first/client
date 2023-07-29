import React from "react";
import { styled } from "styled-components";
import userDefault from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div>
      <CardContainer
        onClick={() => {
          navigate(`/detail/${item.postId}`);
        }}
      >
        <ImageContainer image={item.postImage} />
        <ContentContainer>{item.content} </ContentContainer>
      </CardContainer>
      <UserContainer>
        <UserImage src={item.profileImage === "default" ? userDefault : item.profileImage} />
        <UserName
          onClick={() => {
            navigate(`/userinfo/${item.nickname}`);
          }}
        >
          {item.nickname}
        </UserName>
      </UserContainer>
    </div>
  );
};

const ImageContainer = styled.div`
  border-radius: 6px;
  position: absolute;
  width: 100%;
  height: 80%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.image});
  @media screen and (max-width: 768px) {
    height: 85%;
  }
`;

const ContentContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  padding: 5px 0 1px 0;
  position: absolute;
  top: 80%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;

  word-break: break-all;
  font-size: 13px;
  color: rgb(47, 52, 56);

  @media screen and (max-width: 768px) {
    top: 85%;
  }
`;

const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  padding-bottom: 110%;

  @media screen and (max-width: 768px) {
    padding-bottom: 170%;
  }

  &:hover ${ImageContainer} {
    background-size: 150%;
  }
  &:hover ${ContentContainer} {
    color: gray;
  }

  @media screen and (max-width: 768px) {
    &:hover ${ImageContainer} {
      background-size: cover;
    }
  }
`;

const UserName = styled.div`
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  color: rgb(47, 52, 56);
`;

const UserImage = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  margin-right: 5px;
`;

const UserContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 5px;
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }

  &:hover ${UserName} {
    color: gray;
  }
`;

export default Card;
