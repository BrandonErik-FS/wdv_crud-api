import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Dashboard() {
    const [values, setValues] = useState({
        name: '',
        breed: '',
        weight: '',
        age: ''
    });
    const [error, setError] = useState(null);

    const API_BASE =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';

    const { id } = useParams();
    const navigate = useNavigate();
    
    const isFetchingPet = useRef(false)
    useEffect(() => {
        if (!isFetchingPet.current && id) {
            fetchPet();
        }

        return () => {
            isFetchingPet.current = true;
        };
    }, []);

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

    const fetchPet = async () => {
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
                    } else{
                        setValues(data);
                    }
                });
        } catch (error) {
            setError(error.message || 'Unexpected Error');
        }
    };

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
            setError(error.message || 'Unexpected Error');
        }
    };

    return (
        <>
            <h1>{id ? 'Edit Pet' : 'Add Pet'}</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor='name'>
                    Name:
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={values.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label htmlFor='breed'>
                    Breed:
                    <input
                        type='text'
                        name='breed'
                        id='breed'
                        value={values.breed}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label htmlFor='weight'>
                    Weight:
                    <input
                        type='number'
                        name='weight'
                        id='weight'
                        step={1}
                        min={0}
                        value={values.weight}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label htmlFor='age'>
                    Age:
                    <input
                        type='number'
                        name='age'
                        id='age'
                        step={1}
                        min={0}
                        value={values.age}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <input type='submit' value='Submit' />
            </form>
        </>
    );
}

export default Dashboard;
