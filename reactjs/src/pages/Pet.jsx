import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Dashboard() {
    const [values, setValues] = useState({
        name: '',
        breed: '',
        weight: '',
        age: ''
    });

    const API_BASE =
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchPet = useCallback(async () => {
        try {
            await fetch(`${API_BASE}/api/v1/pets/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === 'Pet Not Found') {
                        setValues({
                            name: '',
                            breed: '',
                            weight: '',
                            age: ''
                        });
                        window.history.replaceState({}, document.title);
                        navigate('/pet', { replace: true });
                    } else {
                        setValues(data);
                    }
                });
        } catch (error) {
            console.error(error.message || 'Unexpected Error');
        }
    }, [id, API_BASE, navigate]);

    const savePet = async () => {
        try {
            await fetch(
                `${
                    id
                        ? `${API_BASE}/api/v1/pets/${id}`
                        : `${API_BASE}/api/v1/pets`
                }`,
                {
                    method: `${id ? 'PATCH' : 'POST'}`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }
            );
            window.history.replaceState({}, document.title);
            navigate('/', { replace: true });
        } catch (error) {
            console.error(error.message || 'Unexpected Error');
        }
    };

    const isFetchingPet = useRef(false);
    useEffect(() => {
        if (!isFetchingPet.current && id) {
            fetchPet();
        }

        return () => {
            isFetchingPet.current = true;
        };
    }, [fetchPet, id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        savePet();
    };

    const handleInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <>
            <H1Styled>{id ? 'Edit Pet' : 'Add Pet'}</H1Styled>
            <FormStyled onSubmit={(event) => handleSubmit(event)}>
                <LabelStyled htmlFor='name'>
                    Name:
                    <InputStyled
                        type='text'
                        name='name'
                        id='name'
                        value={values.name}
                        onChange={handleInputChange}
                        placeholder='Example: Ace'
                        required
                    />
                </LabelStyled>
                <LabelStyled htmlFor='breed'>
                    Breed:
                    <InputStyled
                        type='text'
                        name='breed'
                        id='breed'
                        value={values.breed}
                        onChange={handleInputChange}
                        placeholder='Example: Belgian Malinois'
                        required
                    />
                </LabelStyled>
                <LabelStyled htmlFor='weight'>
                    Weight:
                    <InputStyled
                        type='number'
                        name='weight'
                        id='weight'
                        step={1}
                        min={0}
                        value={values.weight}
                        onChange={handleInputChange}
                        placeholder='Example: 25 (lbs)'
                        required
                    />
                </LabelStyled>
                <LabelStyled htmlFor='age'>
                    Age:
                    <InputStyled
                        type='number'
                        name='age'
                        id='age'
                        step={1}
                        min={0}
                        value={values.age}
                        onChange={handleInputChange}
                        placeholder='Example: 4'
                        required
                    />
                </LabelStyled>
                <ButtonStyled type='submit'>Save</ButtonStyled>
            </FormStyled>
        </>
    );
}

export default Dashboard;

const H1Styled = styled.h1`
    margin: 0;
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
