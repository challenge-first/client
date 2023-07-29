import React from 'react'
import { styled, css } from 'styled-components'
import { ReactComponent as Logo } from '../../assets/logo.svg'

function EditorHeader({ imgUp, onClickSubmit }) {
    return (
        <StContainer style={{ height: "81px" }}>
            <StEditorHeader>
                <StHeaderContainer>
                    <StA aria-label='오늘의집' href="/">
                        <Logo />
                    </StA>
                    <StButton $width={"132px"} $imgUp={imgUp} onClick={onClickSubmit}>올리기</StButton>
                </StHeaderContainer>
            </StEditorHeader>
        </StContainer>
    )
}

export default EditorHeader

const StContainer = styled.div`
    position: sticky;
    top: 0;
    border-bottom: 1px solid #EAEDEF;
    background-color: white;
    z-index: 999;
`

const StEditorHeader = styled.div`
    max-width: 1256px;
    margin: 0 auto;
`

const StHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 30px;
`

const StA = styled.a`
    margin: 24px 0;
`

const StButton = styled.button`
    width: ${({ $width }) => $width};
    height: 44px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 4px;
    text-align: center;
    background-color: #35C5F0;
    color: #FFFFFF;
    padding: 0 16px;
    cursor: pointer;
        
    &:hover {
        background-color: #009FCE;
    }

    ${({ $imgUp }) =>
        !$imgUp &&
        css`
            background-color: #EAEDEF;
            color: #C2C8CC;
            pointer-events: none;
    `}

`