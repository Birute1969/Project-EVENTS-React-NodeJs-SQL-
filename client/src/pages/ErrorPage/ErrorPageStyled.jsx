import styled from 'styled-components';
import { Link } from "react-router-dom";

export const ErrorStyled = styled.div`
    align-items: center;
    background: rgb(131,58,180);
    background: radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(29,248,253,1) 38%, rgba(252,176,69,1) 100%);
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    
`;
export const LinkStyled = styled(Link)`
    align-self: center ;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 800;
`;
export const H1 = styled.h1`
    text-align: center;
    color: orangered;
`;
export const H2 = styled.h2`
    text-align: center;
    color: orangered;
`;
export const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`;