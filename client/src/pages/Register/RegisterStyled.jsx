import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form } from "../../components/Form/Form";

export const RegisterContainer = styled.div`
    align-items: center;
    background-image: url("images/image_5.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: absolute;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;
export const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;
export const LinkStyled = styled(Link)`
    align-self: center ;
    margin-bottom: 20px;
`;
export const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;
export const H2 = styled.h2`
    text-align: center;
    color: #24a0ed ;
    margin-top: 20px;
`;
export const H4 = styled.h4`
    text-align: center;
    color: #24a0ed;
    margin-bottom: 0px;
`;