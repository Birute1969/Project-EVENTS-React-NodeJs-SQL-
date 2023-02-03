import e from "cors";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";


const LoginContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

const LinkStyled = styled(Link)`
    align-self: center;
`;

export const Login = ({onSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        } )
       
    }
    return (
        <div>
            <h1>Login Page</h1>
            <LoginContainer>
                <FormStyled onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <Input 
                        placeholder="Email" required 
                        type= "email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}>
                    </Input>

                    <Input 
                        placeholder="Password" required 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}>
                    </Input>
                    
                    <Button>Login</Button>
                    <LinkStyled to="/register">Register</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </div>
    )
}