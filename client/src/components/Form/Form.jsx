import styled from 'styled-components';

const FormStyled = styled.form`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const FieldsetStyled = styled.fieldset`
    border: 0;
    border-radius: 10px;
    box-shadow: 0 15px 15px rgb(0 42 177 / 37%);
    display: flex;
    flex-direction: ${({ column }) => column ? 'column' : 'row'};
    gap: 5px;
    padding: 0;
`;

export const Form = ({ children, disabled, onSubmit, column, ...props }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <FormStyled onSubmit={handleSubmit} {...props}>
            <FieldsetStyled disabled={disabled} column={column}>
                {children}
            </FieldsetStyled>
        </FormStyled>
    )
}