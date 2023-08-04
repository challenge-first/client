import instance from ".";

// 상품 전체조회
export const getProductsApi = async () => {
  const res = await instance.get("/products/main");
  return res.data.data;
};

// 메인, 서브카테고리 조회
export const getSubCategoryProductApi = async ({
  mainCategory,
  subCategory,
}) => {
  const res = await instance.get(
    `/products/main/maincategory/${mainCategory}/subcategory/${subCategory}`
  );

  return res.data.data;
};

// 경매 조회
export const getAuctionInfoApi = async () => {
  const res = await instance.get(`/auctions`);
  return res.data.data;
};

// 이벤트 조회
export const getEventApi = async () => {
  const res = await instance.get(`/events`);
  return res.data.data;
};

// 게시글 작성
export const postPostsApi = async (body) => {
  const res = await instance.post("/api/posts", body);
  return res;
};

// 게시글 상세조회
export const getDetailProductApi = async (productId) => {
  const res = await instance.get(`/products/${productId}`);
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
  const res = await instance.delete(
    `/api/posts/${postId}/comments/${commentId}`
  );
  return res;
};

// 댓글 좋아요
export const likeCommentApi = async (postId, commentId) => {
  const res = await instance.post(
    `/api/posts/${postId}/comments/${commentId}/like`
  );
  return res;
};
