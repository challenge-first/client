import React, { useRef, useState } from "react";
import { styled, css } from "styled-components";
import { postCommentsApi } from "../../api/posts";
import { useMutation, useQueryClient } from "react-query";
import userDefaultImage from "../../assets/avatar.png";

function Comment({ data }) {
    const [content, setContent] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const loginUser = JSON.parse(localStorage.getItem("logInUser"));
    const queryClient = useQueryClient();
    const textareaRef = useRef(null);

    // 댓글 Textarea를 Focus했을 때
    const handleTextareaFocus = () => {
        setIsFocused(true);
    };

    // 댓글 Textarea를 Focus하지 않을 때
    const handleTextareaBlur = () => {
        setIsFocused(false);
    };

    // 댓글 내용 입력
    const handleChange = (event) => {
        handleResizeHeight();
        setContent(event.target.value);
    };

    // 댓글 입력창 높이 조절
    const handleResizeHeight = () => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    };

    // 정확히 textarea를 클릭하지 않아도 상자만 클릭하면 textarea에 focus
    const handleContentClick = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    // 댓글 입력
    const submitMutation = useMutation((id) => postCommentsApi(id, { comment: content }), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("posts");
            console.log(response.data);
        },
    });

    const handleSubmitButton = async () => {
        submitMutation.mutate(data.postId);
        setContent("");
    };

    return (
        <>
            <CommentH1>
                댓글
                <CommentSpan>{data?.comments.length}</CommentSpan>
            </CommentH1>
            <CommentInput>
                <CommentInputForm>
                    <CommentImage>
                        <CommentImageSrc src={(!loginUser) ? userDefaultImage : (loginUser?.userImage === "default" ? userDefaultImage : loginUser?.userImage)} />
                    </CommentImage>
                    <CommentContent $focused={isFocused} onClick={handleContentClick}>
                        <CommentContentInput
                            ref={textareaRef}
                            spellCheck="false"
                            placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다:)"
                            value={content}
                            onChange={handleChange}
                            onFocus={handleTextareaFocus}
                            onBlur={handleTextareaBlur}
                            rows="1"
                        />
                        <CommentButtonArea>
                            <CommentButton $isnull={!content} $disabled={!loginUser} onClick={handleSubmitButton}>
                                입력
                            </CommentButton>
                        </CommentButtonArea>
                    </CommentContent>
                </CommentInputForm>
            </CommentInput>
        </>
    );
}

export default Comment;

const CommentH1 = styled.h1`
  color: #2f3438;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;

  margin: 20px 0px;
`;

const CommentSpan = styled.span`
  color: #35c5f0;
  font-weight: 700;

  margin-left: 6px;
`;

const CommentInput = styled.div`
  margin-bottom: 40px;
  margin-top: 8px;
`;

const CommentInputForm = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CommentImage = styled.figure`
  display: inline-block;
  border-radius: 50%;
  width: 30px;
  margin-right: 12px;
  flex-shrink: 0;
  border: ${({ $Self }) => ($Self ? "" : "0.5px solid rgba(0, 0, 0, 0.08)")};
`;

const CommentImageSrc = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`;

const CommentContent = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: flex-start;
  line-height: 0;
  box-sizing: border-box;
  border: 1px solid ${({ $focused }) => ($focused ? "#35C5F0" : "#DADDE0")};
  border-radius: 4px;
  padding: 0 16px;
  cursor: text;

  &:hover {
    background-color: #eaedef;
  }
`;

const CommentContentInput = styled.textarea`
  display: inline-block;
  flex: 1 0 0;
  word-break: break-word;

  color: #2f3438;
  font-size: 16px;
  line-height: 24px;

  border: none;
  background: none;
  outline: none;
  overflow-y: auto;
  box-sizing: border-box;
  resize: none;

  height: auto;
  max-height: 72px;
  min-width: 100px;
  margin: 9px 0px;

  &::placeholder {
    color: #c2c8cc;
  }
`;

const CommentButtonArea = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 42px;
  padding: 9px 0px;
  margin-left: 8px;
`;

const CommentButton = styled.button`
  display: inline-block;
  border: none;
  background: none transparent;

  color: ${({ $isnull }) => ($isnull ? "#C2C8CC" : "#35C5F0")};
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  pointer-events: ${({ $isnull }) => ($isnull ? "none" : "auto")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};

  height: 24px;
  padding: 0px;
`;
