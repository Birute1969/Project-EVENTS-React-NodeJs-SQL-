import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";

const LoginContainer = styled.div`
    align-items: center;
    background-image: url("images/event.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: absolute;
    background-color: lightgrey;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const LinkStyled = styled(Link)`
    align-self: center;
`;

const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;
//stilizuojame error:
const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
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
                throw new Error('Incorrect username or password');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            const { id, email, token } = data;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setUser({ id, email });
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
                    <h1>Events Registration</h1>
                    <Input 
                        placeholder="Email" required
                        type= "email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input 
                        placeholder="Password" required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                    <Button>Login</Button>
                    <h3>Don't have an account?</h3>
                    <LinkStyled to="/register">Register</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </div>
    );
}