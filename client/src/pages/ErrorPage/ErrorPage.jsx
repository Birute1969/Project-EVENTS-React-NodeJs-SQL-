import { Link } from "react-router-dom";
import styled from 'styled-components';

const ErrorStyled = styled.div`
    align-items: center;
    background: rgb(131,58,180);
    background: radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(29,248,253,1) 38%, rgba(252,176,69,1) 100%);
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    
`;
const LinkStyled = styled(Link)`
    align-self: center ;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 800;
`;
const H1 = styled.h1`
    text-align: center;
    color: orangered;
    
`;

export const ErrorPage = () => {
    return (
        <ErrorStyled>
            <H1>Page not found</H1>
            <LinkStyled to="/">Go to Home page</LinkStyled>
        </ErrorStyled>

    )
}