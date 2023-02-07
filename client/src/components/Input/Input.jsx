import styled from 'styled-components';

const InputStyled = styled.input`
    background: rgb(221,241,240);
    background: linear-gradient(0deg, rgba(221,241,240,0.9864320728291317) 47%, rgba(70,252,189,1) 100%);
    border: 2px solid grey;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px 20px;

    &:disabled {
        opacity: 0.5;
    }
`;
//grazina visus props:
export const Input = ({ ...props }) => {
    return <InputStyled {...props} />
}