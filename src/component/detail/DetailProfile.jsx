import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import userDefaultImage from "../../assets/avatar.png";
import { useNavigate } from 'react-router';

function DetailProfile({ data }) {
    const [time, setTime] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        const timestamp = new Date(data.createdAt).getTime();
        setTime(timestamp)
    }, [])

    // 게시물 작성 시간
    const displayedAt = (createdAt) => {
        const milliSeconds = new Date() - createdAt;
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

    // 작성자 프로필 클릭
    const handleProfileButton = () => {
        navigate(`/userinfo/${data.nickname}`)
    }

    return (
        <>
            <ProfileSection>
                <ProfileButton onClick={handleProfileButton}>
                    <ProfileImage>
                        <ProfileImageSrc src={data.profileImage === "default" ? userDefaultImage : data.profileImage} />
                    </ProfileImage>
                    <ProfileUser>
                        <ProfileUsername>
                            {data.nickname}
                        </ProfileUsername>
                        <PostCreatedAt>
                            {displayedAt(time)}
                        </PostCreatedAt>
                    </ProfileUser>
                </ProfileButton>
            </ProfileSection>
            <ProfilePosts>
                {/* 작성자의 게시물 영역 */}
            </ProfilePosts>
        </>
    )
}

export default DetailProfile

const ProfileSection = styled.div`
    padding: 0px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const ProfileButton = styled.button`
    display: flex;
    align-items: center;
    padding: 0px;
    border: 0px;
    font-size: 0px;
    text-align: left;
    background: none;
    cursor: pointer;
`

const ProfileImage = styled.figure`
    display: inline-block;
    border-radius: 50%;
    width: 50px;
    margin-right: 12px;
    flex-shrink: 0;
    margin: 0px;
`

const ProfileImageSrc = styled.img`
    display: block;
    height: 100%;
    width: 100%;
`

const ProfileUser = styled.div`
    margin-left: 12px;
`

const ProfileUsername = styled.span`
    display: flex;
    align-items: center;

    color: #2F3438;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
`

const PostCreatedAt = styled.span`
    display: block;

    color: #828C94;
    font-size: 16px;
    line-height: 20px;

    letter-spacing: -0.3px;
    margin-top: 6px;
`

const ProfilePosts = styled.div`
    padding: 0px;
    margin-bottom: 40px;
`