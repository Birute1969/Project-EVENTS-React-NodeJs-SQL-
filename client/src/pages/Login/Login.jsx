import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";


const LoginContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const FormStyled = styled.form`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        //e.preventDefault();
        setIsLoading(true);

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
        .then((res) => {
            if (res.status === 401) {            
            throw new Error('Incorrect user name or password');
            }
            if (!res.ok) {
                throw new Error('Something went wrong');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            onSuccess(data);
            setIsLoading(false);
            setError('');
            navigate('/');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }
    return (
        <div>
            <h1>Login Page</h1>
            <LoginContainer>
                <FormStyled onSubmit={handleLogin} disabled={isLoading} column>
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
                    {error && <div>{error}</div>}
                    <Button disabled={isLoading}>Login</Button>
                    <h3>Don't have an account?</h3>
                    <LinkStyled to="/register">Register</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </div>
    )
}