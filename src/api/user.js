import instance from ".";

export const getMyUserApi = async () => {
    const res = await instance.get("/api/users/mypage");
    return res;
  };

export const getOtherUserApi = async (nickname) => {
  const res = await instance.get(`/api/users/${nickname}`);
  return res;
};
