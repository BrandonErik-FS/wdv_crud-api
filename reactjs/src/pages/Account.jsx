import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AuthService from '../services/authService';
import { UserContext } from '../contexts/UserContext';

function Account() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const currentPath = location.pathname.replace(/\//g, '');

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser !== false) {
            navigate('/');
            return;
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');

        if (!AuthService.validateEmail(email)) {
            setError('Invalid Email - Please Enter a Valid Email Address.');
            return;
        }

        if (!AuthService.validatePassword(password)) {
            setError(
                'Invalid Password - Please Enter a Valid Password Containing: 1 Letter, 1 Number & 1 Special Character & a Minimum Length of 8 Characters.'
            );
            return;
        }

        try {
            currentPath === 'login'
                ? await AuthService.login(email, password).then((response) => {
                      setCurrentUser(response);
                      navigate('/');
                  })
                : await AuthService.signup(email, password).then((response) => {
                      setCurrentUser(response);
                      navigate('/');
                  });
        } catch (error) {
            console.error(error || 'Unexpected Error');

            if (error.code === 'ERR_NETWORK') {
                setError(`${error.message}. Please Try Again.`);
                return;
            }

            if (
                error.code === 'ERR_BAD_REQUEST' &&
                error.response.data === 'Unauthorized'
            ) {
                setError(
                    'Incorrect Email or Password. Double-check Your Credentials & Try Again.'
                );
                return;
            }
        }
    };

    return (
        <>
            <H1Styled>
                {currentPath === 'login' ? 'Log In' : 'Sign Up'}
            </H1Styled>
            {error ? <ParagraphStyled>{error}</ParagraphStyled> : null}
            <FormStyled onSubmit={handleSubmit}>
                <LabelStyled htmlFor='email'>
                    Email:
                    <InputStyled
                        type='text'
                        placeholder='Email'
                        name='email'
                        id='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </LabelStyled>
                <LabelStyled htmlFor='password'>
                    Password:
                    <InputStyled
                        type='password'
                        placeholder='Password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </LabelStyled>
                <ButtonStyled type='submit'>
                    {currentPath === 'login' ? 'Log In' : 'Sign up'}
                </ButtonStyled>
            </FormStyled>
        </>
    );
}

export default Account;

const H1Styled = styled.h1`
    margin: 0;
`;

const ParagraphStyled = styled.p`
    width: 100%;
    max-width: 1000px;
    box-sizing: border-box;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    background-color: #af1827;
    padding: 1rem;
    margin: 0;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
`;

const FormStyled = styled.form`
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #ffc357;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const LabelStyled = styled.label`
    font-weight: bold;
`;

const InputStyled = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin: 1rem 0 0 0;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    outline: none;
    font-size: 1rem;
    &:hover,
    &:focus-visible {
        border: 2px solid #af1827;
    }
`;

const ButtonStyled = styled.button`
    padding: 1rem;
    background-color: #af1827;
    color: #ffffff;
    display: block;
    border-radius: 0.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover,
    &:focus-visible {
        background-color: #ffffff;
        color: #af1827;
    }
    @media (min-width: 768px) {
        grid-column: span 2;
    }
`;
