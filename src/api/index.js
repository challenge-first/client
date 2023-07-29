import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 인터셉터 리스폰스 토큰 담기
instance.interceptors.response.use(
  (response) => {
    if (response.headers.accesstoken) {
      localStorage.setItem("accessToken", response.headers.accesstoken);
    }

    if (response.headers.authorization) {
      localStorage.setItem("refreshToken", response.headers.authorization);
    }

    return response;
  },
  // accessToken 만료시 refreshToke으로 재발급 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.data.message === "RefreshToken Redirect") {
        window.location.replace("/login");
      } else if (error.response.data.accessValidationError === true) {
        delete config.headers.accesstoken;
        try {
          const res = await axios(config);
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.headers.accesstoken);
            console.log("accesstoken갱신성공!!");
            return res;
          }
        } catch (error) {
          console.log("토큰리프레시에러", error);
        }
      }
    }
    return Promise.reject(error);
  }
);

// 인터셉터 리퀘스트 토큰 헤더에싣기
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers["accesstoken"] = accessToken;
    }
    if (refreshToken) {
      config.headers["authorization"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
