import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Dots } from '../../assets/ellipsis.svg'
import { styled } from 'styled-components';
import { deletePostApi } from '../../api/posts';
import { useNavigate } from 'react-router-dom';

function DetailTop({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const loginUser = JSON.parse(localStorage.getItem("logInUser"));
    const isUser = (loginUser) && (data.nickname === loginUser.nickname);
    const dropdownRef = useRef(null);
    const [category, setCategory] = useState("");

    // 카테고리 영문을 한글로
    useEffect(() => {
        if(data.category === "house") {
            setCategory("집사진");
        } else if (data.category === "dailylife") {
            setCategory("취미일상")
        } else {
            setCategory(data.category)
        }
    }, [])

    // 드롭다운 열기
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 다른 영역 클릭 했을 때 카테고리 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 수정하기 버튼
    const handleEditButton = () => {
        navigate(`/editor/${data.postId}`);
    }

    // 삭제하기 버튼
    const handleDeleteButton = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                const res = await deletePostApi(data.postId);
                if (res.status <= 300) {
                    console.log("성공", res);
                    navigate(-1);
                };
            } catch (error) {
                console.log(error);
            };
        }
    }

    return (
        <MainTop>
            <StCategory>
                {category}
            </StCategory>
            {isUser && (
                <StEditButtonArea ref={dropdownRef}>
                    <StEditButton aria-label='수정하기,삭제하기 버튼 열기' onClick={toggleDropdown}>
                        <Dots />
                    </StEditButton>
                    <StDropdownMenu $isOpen={isOpen}>
                        <StDropdownItem $isOpen={isOpen} onClick={handleEditButton}>
                            수정하기
                        </StDropdownItem>
                        <StDropdownItem $isOpen={isOpen} onClick={handleDeleteButton} $color="#FF7777">
                            삭제하기
                        </StDropdownItem>
                    </StDropdownMenu>
                </StEditButtonArea>

            )}
        </MainTop>
    )
}

export default DetailTop

const MainTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 16px;
`

const StCategory = styled.div`
    color: #828C94;
    font-size: 16px;
    line-height: 32px;
`

const StEditButtonArea = styled.div`
    margin-left: auto;
`

const StEditButton = styled.button`
    position: relative;
    cursor: pointer;
    display: flex;    
    margin: 0;
    padding: 0;
    border: none;
    background: none;
`

const StDropdownMenu = styled.div`
    position: absolute;
    top: 32px;
    right: 0;
    width: 120px;
    z-index: 2;
    background-color: #FFFFFF;
    border: 1px solid #DADDE0;
    border-radius: 6px;
    opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
    visibility: ${({ $isOpen }) => $isOpen ? "visible" : "hidden"};
    pointer-events: ${({ $isOpen }) => $isOpen ? "" : "none"};
    transition: all 0.2s ease 0s;

    box-shadow: 0 4px 10px 0 rgba(63, 71, 77, 0.2);
`

const StDropdownItem = styled.div`
    color: ${({ $color }) => $color || "#2F3438"};
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;

    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover {
    background-color: #f0f0f0;
    }
`
