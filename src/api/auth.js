import instance from ".";

// 회원가입
export const postSignupApi = async (body) => {
  const res = await instance.post("/api/auth/signup", body);
  return res;
};

// 이메일 중복
export const postEmailDuplicate = async (body) => {
  const res = await instance.post("/api/auth/signup/email", body);
  return res;
};

// 닉네임 중복
export const postNicknameDuplicate = async (body) => {
  const res = await instance.post("/api/auth/signup/email", body);
  return res;
};

// 로그인
export const postLoginApi = async (body) => {
  const res = await instance.post("/api/auth/login", body);
  return res;
};

//회원정보 업데이트
export const putUserUpdate = async(body) => {
  const formData = new FormData();
  if(body.image===null){
    formData.append("introduce", body.introduce);
    formData.append("nickname", body.nickname);
  } else{
    formData.append("introduce", body.introduce);
    formData.append("nickname", body.nickname);
    formData.append("image", body.image);
  }

  const res = await instance.put("/api/auth/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}