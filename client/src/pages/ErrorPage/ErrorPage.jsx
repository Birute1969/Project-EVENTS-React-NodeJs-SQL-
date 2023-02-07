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

export const ErrorPage = () => {
    return (
        <ErrorStyled>
            <h1>Page not found</h1>
            <Link to="/">Go to Home page</Link>
        </ErrorStyled>

    )
}