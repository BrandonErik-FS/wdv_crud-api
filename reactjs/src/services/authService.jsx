import axios from 'axios';

const API_BASE =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const AUTH_ENDPOINT = '/api/v1/auth';

const signup = (email, password) => {
    return axios
        .post(`${API_BASE}${AUTH_ENDPOINT}/signup`, { email, password })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const login = (email, password) => {
    return axios
        .post(`${API_BASE}${AUTH_ENDPOINT}/login`, { email, password })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.reload(false);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
    validateEmail,
    validatePassword
};

export default authService;
