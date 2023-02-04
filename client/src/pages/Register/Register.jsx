import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";

const RegisterContainer = styled.div`
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
    align-self: center ;
`;

const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;

export const Register = () => {
    //paduodame State
    //nunaviguojame user su Navigate
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = () => {
        setIsLoading(true);
        //uzregistruojame user:
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({first_name, last_name, email, password})
        })
        .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }
            if (!res.ok) {
                throw new Error('Something went wrong');
            }
            return res.json();
        })
        .then((data) => {
            //kai prisiregistruoja, nunaviguojame i login:
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    };

    return (
        <div>
            <h1>Register Page</h1>
            <RegisterContainer>
                <FormStyled onSubmit = {handleRegister} disabled={isLoading} column>
                    <h2>Register</h2>
                    <Input 
                        placeholder="First Name" 
                        required 
                        onChange = { (e)=> setFirstName(e.target.value)} 
                        value={first_name}>
                    </Input>

                    <Input 
                        placeholder="Last Name" 
                        required 
                        onChange = { (e)=> setLastName(e.target.value)} 
                        value={last_name}>
                    </Input>

                    <Input 
                        placeholder="Email" 
                        required 
                        type= "email" 
                        onChange = { (e)=> setEmail(e.target.value)} 
                        value={email}>
                    </Input>
                    <Input 
                        placeholder="Password" 
                        required 
                        type="password" 
                        onChange= { (e)=> setPassword(e.target.value)} 
                        value={password}>
                    </Input>
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                    <Button>Register</Button>
                    <h3>Already have an account?</h3>
                    <LinkStyled to="/login">Login</LinkStyled>
                </FormStyled>
            </RegisterContainer>
        </div>
    )
}