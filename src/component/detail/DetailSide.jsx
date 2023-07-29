import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ReactComponent as Heart } from '../../assets/heart.svg'
import { ReactComponent as Bookmark } from '../../assets/bookmark.svg'
import { ReactComponent as Comment } from '../../assets/comment.svg'
import { ReactComponent as Share } from '../../assets/share.svg'
import { likePostApi } from '../../api/posts'
import { useMutation, useQueryClient } from 'react-query'

function DetailSide({ data, commentRef }) {
    const [bookmark, setBookmark] = useState(false);
    const queryClient = useQueryClient();

    // 좋아요
    const LikeMutation = useMutation(likePostApi, {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["posts"]);
            console.log(response.data);
        }
    })

    const handleLikeButton = async () => {
        LikeMutation.mutate(data.postId);
    }

    // 북마크 (구현X)
    const handleBookmarkButton = () => {
        setBookmark(!bookmark)
    }

    // 댓글로 이동
    const handleCommentButton = () => {
        if (commentRef && commentRef.current) {
            commentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    // 공유 (링크 복사)
    const handleShareButton = () => {
        const currentURL = window.location.href;

        navigator.clipboard.writeText(currentURL).then(() => {
            alert('클립보드에 복사되었습니다.');
        }).catch((error) => {
            console.error('복사 실패: ', error);
        });
    };

    return (
        <>
            <SideWrapper>
                <SideContainer>
                    <SideButtonContainer>
                        <SideButton>
                            <SideButtonIcon title="좋아요" onClick={handleLikeButton}>
                                <StHeart $yours={data.like} />
                            </SideButtonIcon>
                            <SideButtonSpan>
                                {data.likeCount}
                            </SideButtonSpan>
                        </SideButton>
                        <SideButton>
                            <SideButtonIcon title="스크랩" onClick={handleBookmarkButton}>
                                <StBookmark $yours={bookmark} />
                            </SideButtonIcon>
                            <SideButtonSpan>
                                0
                            </SideButtonSpan>
                        </SideButton>
                        <StHr />
                        <SideButton>
                            <SideButtonIcon $gray={true} title="댓글" onClick={handleCommentButton}>
                                <Comment />
                            </SideButtonIcon>
                            <SideButtonSpan $gray={true}>
                                {data?.comments.length}
                            </SideButtonSpan>
                        </SideButton>
                        <SideButton>
                            <SideButtonIcon $gray={true} title="공유" onClick={handleShareButton}>
                                <Share />
                            </SideButtonIcon>
                            <SideButtonSpan $gray={true}>
                                0
                            </SideButtonSpan>
                        </SideButton>
                    </SideButtonContainer>
                </SideContainer>
            </SideWrapper>
        </>
    )
}

export default DetailSide

const SideWrapper = styled.div`
    position: absolute;
    top: 50px;
    right: 0px;
    width: calc(50% - 360px);
    max-width: 340px;
    height: 100%;
    padding: 0px 40px;
    box-sizing: border-box;

    @media (max-width: 960px) {
        display: none;
    }
`

const SideContainer = styled.div`
    position: sticky;
    top: 130px;
    transition: top 0.1s ease 0s;
`

const SideButtonContainer = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

const SideButton = styled.button`
    position: relative;
    display: block;
    width: 60px;
    margin-bottom: 38px;
    padding: 0;
    border: 0;
    background: none;
`

const SideButtonIcon = styled.span`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 60px;
    border: ${({ $gray }) => $gray ? "none" : "1px solid #C2C8CC"};
    background-color: ${({ $gray }) => $gray ? "#F7F9FA" : "#FFFFFF"};
    box-shadow: ${({ $gray }) => $gray ? "none" : "0px 2px 6px rgba(63, 71, 77, 0.15)"};
    border-radius: 100%;

    box-sizing: border-box;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        border-color: ${({ $gray }) => $gray ? "" : "#A4ADB3"};
        background-color: ${({ $gray }) => $gray ? "#EAEDEF" : ""};
    }
`

const SideButtonSpan = styled.span`
    position: absolute;
    left: 50%;
    bottom: -22px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    color: ${({ $gray }) => $gray ? "#828C94" : "#2F3438"};
    white-space: nowrap;
    transform: translateX(-50%);
`

const StHr = styled.hr`
    height: 1px;
    width: 54px;
    margin: 0px;
    margin-bottom: 16px;
    padding: 0px;
    border: none;
    background-color: #EAEDEF;
`

const StHeart = styled(Heart)`
    path{
        fill: ${({ $yours }) => $yours ? "#35C5F0" : ""};
        stroke: ${({ $yours }) => $yours ? "#35C5F0" : ""};
    }
`

const StBookmark = styled(Bookmark)`
    path{
        fill: ${({ $yours }) => $yours ? "#35C5F0" : ""};
        stroke: ${({ $yours }) => $yours ? "#35C5F0" : ""};
    }
`