import instance from ".";

// 게시글 전체조회
export const getPostsApi = async () => {
  const res = await instance.get("/api/posts");
  return res;
};

// 집사진 게시글 조회
export const getDailyLifePostsApi = async () => {
  const res = await instance.get("/api/posts?category=dailylife");
  return res;
};

// 취미일상 게시글 조회
export const getHousePostsApi = async () => {
  const res = await instance.get("/api/posts?category=house");
  return res;
};

// 게시글 작성
export const postPostsApi = async (body) => {
  const res = await instance.post("/api/posts", body);
  return res;
};

// 게시글 상세조회
export const getDetailPostApi = async (postId) => {
  const res = await instance.get(`/api/posts/${postId}`);
  return res;
};

// 게시글 삭제
export const deletePostApi = async (postId) => {
  const res = await instance.delete(`/api/posts/${postId}`);
  return res;
};

// 게시글 수정
export const updatePostApi = async (postId, body) => {
  const res = await instance.put(`/api/posts/${postId}`, body);
  return res;
};

// 게시글 좋아요
export const likePostApi = async (postId) => {
  const res = await instance.patch(`/api/posts/${postId}/like`);
  return res;
};

// 댓글 작성
export const postCommentsApi = async (postId, body) => {
  const res = await instance.post(`/api/posts/${postId}/comments`, body);
  return res;
};

// 댓글 삭제
export const deleteCommentsApi = async (postId, commentId) => {
  const res = await instance.delete(`/api/posts/${postId}/comments/${commentId}`);
  return res;
};

// 댓글 좋아요
export const likeCommentApi = async (postId, commentId) => {
  const res = await instance.post(`/api/posts/${postId}/comments/${commentId}/like`);
  return res;
};
