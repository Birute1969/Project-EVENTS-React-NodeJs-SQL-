import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { LoginContainer, 
    H2, 
    H4, 
    LinkStyled, 
    FormStyled, 
    ErrorStyled} 
    from "./LoginStyled";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";

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
            <LoginContainer>
                <FormStyled onSubmit={handleLogin} disabled={isLoading} column>
                    <H2>Welcome Back!
                        <br></br>
                        Please login to continue!
                    </H2>
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
                    <H4>Don't have an account?</H4>
                    <LinkStyled to="/register">Please Register</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </div>
    );
}