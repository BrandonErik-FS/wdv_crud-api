import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PetCard from '../components/PetCard';
import AddPetButton from '../components/AddPetButton';

function Dashboard() {
    const [pets, setPets] = useState(null);
    const [error, setError] = useState(null);

    const API_BASE =
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    const navigate = useNavigate();

    const fetchPets = useCallback(async () => {
        try {
            await fetch(`${API_BASE}/api/v1/pets`)
                .then((res) => res.json())
                .then((data) => {
                    setPets(data);
                });
        } catch (error) {
            setError(error.message || 'Unexpected Error');
        }
    }, [API_BASE]);

    const editPet = (id) => {
        navigate(`/pet/${id}`);
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

    const isFetchingPets = useRef(false);
    useEffect(() => {
        if (!isFetchingPets.current) {
            fetchPets();
        }

        return () => {
            isFetchingPets.current = true;
        };
    }, [fetchPets]);

    return (
        <>
            <H1Styled>Pets</H1Styled>
            {pets && pets.length > 0 ? (
                pets.map((pet) => (
                    <PetCard
                        key={pet._id}
                        id={pet._id}
                        name={pet.name}
                        breed={pet.breed}
                        weight={pet.weight}
                        age={pet.age}
                        created_at={pet.created_at}
                        editPet={() => editPet(pet._id)}
                        deletePet={() => deletePet(pet._id)}
                    />
                ))
            ) : (
                <>
                    <H2Styled>No Pets</H2Styled>
                </>
            )}
            <AddPetButton link='/pet' text='Add Pet' />
        </>
    );
}

export default Dashboard;

const H1Styled = styled.h1`
    margin: 0;
`;
const H2Styled = styled.h2``;
