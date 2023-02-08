import styled from "styled-components";
import { Form } from "../../components/Form/Form";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
    align-items: center;
    background-image: url("images/image_2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: absolute;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
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
export const LinkStyled = styled(Link)`
    align-self: center;
    margin-bottom: 20px;
`;
export const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;
//stilizuojame error:
export const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;