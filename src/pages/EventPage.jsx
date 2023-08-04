import { useEffect } from "react";
import { styled } from "styled-components";
import Card from "../component/common/Card";
import { useQuery } from "react-query";
import { getEventApi } from "../api/posts";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const { isLoading, error, data } = useQuery("eventPageData", getEventApi);
  const navigate = useNavigate();
  const logInUser = localStorage?.getItem("logInUser");

  useEffect(() => {
    if (logInUser === null) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/login");
    }
  }, [data]);

  if (isLoading) return "Loading...";
  return (
    <MainPageContainer>
      <CardContainer>
        {data.name}
        {/* {data &&
          data.map((item) => {
            return <Card item={item} key={item.postId} />;
          })} */}
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

export default EventPage;
