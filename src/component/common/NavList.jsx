import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components'

function NavList({ children, path }) {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const isCurrent = path === pathname;
    
    return (
        <StNavList>
            <StP $isCurrent={isCurrent} onClick={() => { navigate(path) }}>
                {children}
            </StP>
        </StNavList>
    )
}

export default NavList

const StNavList = styled.div`
    height: inherit;
    display: block;
`

const StP = styled.p`
    height: inherit;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: top;
    text-align: center;
    box-sizing: border-box;
    padding: 12px 6px;
    text-decoration: none;    
    font-weight: ${({ $isCurrent }) => $isCurrent ? "700" : ""};
    color: ${({ $isCurrent }) => $isCurrent ? "#35C5F0" : "#2F3438"};
    cursor: pointer;

    &:hover {
        color: #35C5F0; 
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: ${({ $isCurrent }) => $isCurrent ? "100%" : 0};
        height: 3px;
        background-color: #35C5F0;
        transition: transform 0.2s ease 0s;
        transform: scale(${({ $isCurrent }) => $isCurrent ? 1 : 0});
    }
`