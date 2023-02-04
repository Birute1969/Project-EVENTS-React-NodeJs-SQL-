import { Link } from "react-router-dom";
import styled from 'styled-components';

const ErrorStyled = styled.div`
    align-items: center;
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