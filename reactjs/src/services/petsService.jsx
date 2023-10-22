import axios from 'axios';

const API_BASE =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const PETS_ENDPOINT = '/api/v1/pets/';

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        };
    } else {
        return;
    }
};

const fetchPets = () => {
    try {
        return axios.get(`${API_BASE}${PETS_ENDPOINT}`, {
            headers: authHeader()
        });
    } catch (error) {
        console.error(error.message || 'Unexpected Error');
    }
};

const fetchPet = (id) => {
    try {
        return axios.get(`${API_BASE}${PETS_ENDPOINT}${id}`, {
            headers: authHeader()
        });
    } catch (error) {
        console.error(error.message || 'Unexpected Error');
    }
};

const createPet = (petValues) => {
    try {
        return axios.post(
            `${API_BASE}${PETS_ENDPOINT}`,
            JSON.stringify(petValues),
            {
                headers: authHeader()
            }
        );
    } catch (error) {
        console.error(error.message || 'Unexpected Error');
    }
};

const updatePet = (id, petValues) => {
    try {
        return axios.patch(
            `${API_BASE}${PETS_ENDPOINT}${id}`,
            JSON.stringify(petValues),
            {
                headers: authHeader()
            }
        );
    } catch (error) {
        console.error(error.message || 'Unexpected Error');
    }
};

const deletePet = (id) => {
    try {
        return axios.delete(`${API_BASE}${PETS_ENDPOINT}${id}`, {
            headers: authHeader()
        });
    } catch (error) {
        console.error(error.message || 'Unexpected Error');
    }
};

const petsService = {
    fetchPets,
    fetchPet,
    createPet,
    updatePet,
    deletePet
};

export default petsService;
