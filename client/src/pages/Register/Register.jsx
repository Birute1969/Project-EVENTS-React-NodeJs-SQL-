import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { RegisterContainer, 
    FormStyled, 
    LinkStyled, 
    ErrorStyled, 
    H2, 
    H4 } 
    from "./RegisterStyled";

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
            <RegisterContainer>
                <FormStyled onSubmit = {handleRegister} disabled={isLoading} column>
                    <H2>Please Register</H2>
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
                    <H4>Already have an account?</H4>
                    <LinkStyled to="/login">
                        Login with existing account
                    </LinkStyled>
                </FormStyled>
            </RegisterContainer>
        </div>
    )
}