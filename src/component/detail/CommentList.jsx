import React from 'react'
import { styled } from 'styled-components'
import { ReactComponent as Heart } from '../../assets/heart.svg'
import { ReactComponent as Left } from '../../assets/LeftBracket.svg'
import { ReactComponent as Right } from '../../assets/RightBracket.svg'
import { useMutation, useQueryClient } from 'react-query'
import { deleteCommentsApi, likeCommentApi } from '../../api/posts'
import userDefaultImage from "../../assets/avatar.png";
import { useNavigate } from 'react-router'

function CommentList({ data }) {
    const loginUser = JSON.parse(localStorage.getItem("logInUser"));
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 댓글 삭제
    const deleteMutation = useMutation((id) => deleteCommentsApi(data.postId, id), {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["posts"]);
            console.log(response.data);
        }
    })

    const handleDeleteComment = async (id) => {
        deleteMutation.mutate(id);
    }

    // 댓글 삭제
    const likeMutation = useMutation((id) => likeCommentApi(data.postId, id), {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["posts"]);
            console.log(response.data);
        }
    })

    const handleLikeComment = async (id) => {
        likeMutation.mutate(id);
    }

    // 댓글 작성 시간
    const displayedAt = (createdAt) => {
        const milliSeconds = new Date() - createdAt
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        return `${Math.floor(years)}년 전`
    }

    // 댓글 작성자 클릭
    const handleProfileButton = (nickname) => {
        navigate(`/userinfo/${nickname}`);
    }

    return (
        <>
            {
                data.comments.map((item) => {
                    const timestamp = new Date(item.createdAt).getTime();
                    return (
                        <CommentListItem key={item.id}>
                            <CommentItem>
                                <CommentItemLeft onClick={() => handleProfileButton(item.nickname)}>
                                    <CommentUserImage>
                                        <CommentUserImageSrc src={item.userImage === "default" ? userDefaultImage : item.userImage} />
                                    </CommentUserImage>
                                </CommentItemLeft>
                                <CommentItemRight>
                                    <CommentTop>
                                        <CommentUserName onClick={() => handleProfileButton(item.nickname)}>
                                            {item.nickname}
                                        </CommentUserName>
                                        {
                                            (loginUser && (loginUser.nickname === item.nickname)) && (
                                                <CommentNewSpan>
                                                    내 댓글
                                                </CommentNewSpan>
                                            )
                                        }
                                    </CommentTop>
                                    <CommentContent>
                                        {item.comment}
                                    </CommentContent>
                                    <CommentBottom>
                                        <CommentBottomText>
                                            {displayedAt(timestamp)}
                                        </CommentBottomText>
                                        <CommentBottomItem>
                                            <CommentBottomDot>・</CommentBottomDot>
                                            <CommentLikeButton onClick={() => handleLikeComment(item.id)}>
                                                <StHeart $yours={item.like} />
                                                <CommentSpan>{item.likeCount}</CommentSpan>
                                            </CommentLikeButton>
                                        </CommentBottomItem>
                                        {/* <CommentBottomItem>
                                            <CommentBottomDot>・</CommentBottomDot>
                                            <CommentButton>답글 달기</CommentButton>
                                        </CommentBottomItem> */}
                                        {
                                            (loginUser && (loginUser.nickname === item.nickname)) && (
                                                <CommentBottomItem>
                                                    <CommentBottomDot>・</CommentBottomDot>
                                                    <CommentButton onClick={() => handleDeleteComment(item.id)}>삭제</CommentButton>
                                                </CommentBottomItem>
                                            )
                                        }
                                    </CommentBottom>
                                </CommentItemRight>
                            </CommentItem>
                        </CommentListItem>
                    )
                })
            }
            {/* <CommentPageSection>
                <CommentLRButton>
                    <Left />
                </CommentLRButton>
                <CommentPageButton $isNow={true}>
                    1
                </CommentPageButton>
                <CommentPageButton>
                    2
                </CommentPageButton>
                <CommentPageButton>
                    3
                </CommentPageButton>
                <CommentLRButton style={{ marginRight: "0px" }}>
                    <Right />
                </CommentLRButton>
            </CommentPageSection> */}
        </>
    )
}

export default CommentList

const CommentListItem = styled.div`
    margin: 30px 0px;
`

const CommentItem = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 16px 0;
`

const CommentItemLeft = styled.div`
    cursor: pointer;
`

const CommentUserImage = styled.figure`
    display: inline-block;
    border-radius: 50%;
    width: 30px;
    margin-right: 12px;
`

const CommentUserImageSrc = styled.img`
    display: block;
    height: 100%;
    width: 100%;
`

const CommentItemRight = styled.div`
    flex: 1 1 0;   
`

const CommentTop = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: -0.3px;
`

const CommentUserName = styled.div`
    color: #212629;
    font-size: 16px;
    line-height: 20px;

    margin-right: 5px;
    cursor: pointer;
`

const CommentNewSpan = styled.div`
    display: inline-block;
   
    color: #FFFFFF;
    font-size: 10px;
    line-height: 16px;
    font-weight: 700;

    background-color: #35C5F0;
    height: 16px;
    border-radius: 4px;
    padding: 1px 4px;
    margin-right: 5px;
`

const CommentContent = styled.div`
    color: #2F3438;
    font-size: 16px;
    line-height: 24px;

    margin: 8px 0px;
    align-items: center;
    word-break: break-word;
    white-space: pre-line;
`

const CommentBottom = styled.div`
    display: flex;
    align-items: center;

    color: #828C94;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;

    letter-spacing: -0.3px;
`

const CommentBottomText = styled.div`
    color: #828C94;
`

const CommentBottomDot = styled.div`
    color: #828C94;
    margin: 0px 4px;
`

const CommentBottomItem = styled.div`
    display: flex;
`

const CommentLikeButton = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 0px;

    cursor: pointer;
    touch-action: manipulation;

    &:hover {
        text-decoration: underline;
    }
`
const StHeart = styled(Heart)`
    width: 16px;
    height: 16px;
    path {
        stroke: ${({ $yours }) => $yours ? "#35C5F0" : "#828C94"};
        fill: ${({ $yours }) => $yours ? "#35C5F0" : "transparent"};
    }
`

const CommentSpan = styled.span`
    color: #35C5F0;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    letter-spacing: -0.3px;

    margin-left: 3px;
    &:empty::before{
        color: #828C94;
        content: "좋아요";
    }
`

const CommentButton = styled.div`
    background-color: transparent;
    border: none;
    padding: 0px;

    cursor: pointer;
    touch-action: manipulation;

    &:hover {
        text-decoration: underline;
    }
`

const CommentPageSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
`

const CommentLRButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    background-color: "none";
    
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    padding: 0px;
    border: 1px solid #DADDE0;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #F7F9FA;
    }
`

const CommentPageButton = styled.button`
    display: inline-block;
    border: none;
    background: ${({ $isNow }) => $isNow ? "#35C5F0" : "none"};
    
    color: ${({ $isNow }) => $isNow ? "#FFFFFF" : "#2F3438"};
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    vertical-align: middle;
    
    width: 32px;
    height: 32px;
    margin-right: 10px;
    padding: 0px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${({ $isNow }) => $isNow ? "#009FCE" : "#F7F9FA"};
    }
`