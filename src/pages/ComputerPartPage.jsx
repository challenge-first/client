import React from "react";
import { styled } from "styled-components";
import Card from "../component/common/Card";
import { useQuery } from "react-query";
import { getSubCategoryProductApi } from "../api/posts";

const ComputerPartPage = () => {
  const category = {
    mainCategory: "COMPUTER_PARTS",
    subCategory: "RAM",
  };
  const { isLoading, error, data } = useQuery("mainPageData", () =>
    getSubCategoryProductApi(category)
  );
  if (isLoading) return "Loading...";
  return (
    <MainPageContainer>
      <CardContainer>
        {data?.map((item) => {
          return <Card item={item} key={item.postId} />;
        })}
      </CardContainer>
    </MainPageContainer>
  );
};
const MainPageContainer = styled.div`
  max-width: 1256px;
  margin: 0 auto;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 50px 60px;
  display: grid;
  grid-gap: 26px 20px;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 50px 30px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 50px 10px;
  }
`;

export default ComputerPartPage;
