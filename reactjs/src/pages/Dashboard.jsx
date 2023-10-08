import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import formatDate from '../utils/formatDate';

function Dashboard() {
    const [pets, setPets] = useState(null);
    const [error, setError] = useState(null);

    const API_BASE =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();

    const isFetchingPets = useRef(false)
    useEffect(() => {
        if (!isFetchingPets.current) {
            fetchPets();
        }

        return () => {
            isFetchingPets.current = true;
        };
    }, []);

    const fetchPets = async () => {
        try {
            await fetch(`${API_BASE}/api/v1/pets`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setPets(data);
                });
        } catch (error) {
            setError(error.message || 'Unexpected Error');
        }
    };

    const editPet = (id) => {
        navigate(`/pet/${id}`)
    };

    const deletePet = async (id) => {
        try {
            await fetch(`${API_BASE}/api/v1/pets/${id}`, {
                method: 'DELETE'
            });
            fetchPets();
        } catch (error) {
            setError(error.message || 'Unexpected Error');
        }
    };

    return (
        <>
            <h1>Pets</h1>
            {pets && pets.length > 0 ? (
                pets.map((pet) => (
                    <article key={pet._id}>
                        <Link to={`/pet/${pet._id}`}>
                            <h2>{pet.name}</h2>
                        </Link>
                        <p>
                            Breed: <span>{pet.breed}</span>
                        </p>
                        <p>
                            Weight: <span>{pet.weight}</span>
                        </p>
                        <p>
                            Age: <span>{pet.age}</span>
                        </p>
                        <p>
                            Date Added:{' '}
                            <span>{formatDate(pet.created_at)}</span>
                        </p>
                        <button onClick={() => editPet(pet._id)}>Edit</button>
                        <button onClick={() => deletePet(pet._id)}>
                            Delete
                        </button>
                    </article>
                ))
            ) : (
                <>
                    <h2>No Pets</h2>
                </>
            )}
            <Link to='/pet'>Add New</Link>
        </>
    );
}

export default Dashboard;
