import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PetCard from '../components/PetCard';
import AddPetButton from '../components/AddPetButton';
import PetsService from '../services/petsService';
import { UserContext } from '../contexts/UserContext';

function Dashboard() {
    const { currentUser } = useContext(UserContext);
    const [pets, setPets] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const editPet = (id) => {
        navigate(`/pet/${id}`);
    };

    const deletePet = (id) => {
        try {
            PetsService.deletePet(id);
            PetsService.fetchPets().then((response) => {
                setPets(response.data);
            });
        } catch (error) {
            console.error(error.message || 'Unexpected Error');
        }
    };

    const isFetchingPets = useRef(false);
    useEffect(() => {
        setErrorMessage(null);

        if (currentUser === false) {
            setErrorMessage('Sign Up or Log In to View Inventory');
            return;
        }

        if (!isFetchingPets.current) {
            PetsService.fetchPets()
                .then((response) => {
                    setPets(response.data);
                })
                .catch((error) => {
                    setErrorMessage(error.response.data || 'Unexpected Error');
                });
        }

        return () => {
            isFetchingPets.current = true;
        };
    }, [currentUser]);

    return (
        <>
            {!errorMessage ? (
                <SectionStyled>
                    <H1Styled>Pets</H1Styled>
                    <AddPetButton link='/pet' text='Add Pet' />
                </SectionStyled>
            ) : (
                <H1Styled>Pets</H1Styled>
            )}
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
            ) : pets && pets.length === 0 ? (
                <H2Styled>No Pets Found</H2Styled>
            ) : (
                <H2Styled>{errorMessage}</H2Styled>
            )}
        </>
    );
}

export default Dashboard;

const H1Styled = styled.h1`
    margin: 0;
`;

const H2Styled = styled.h2`
    margin: 0;
    text-align: center;
`;

const SectionStyled = styled.section`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
