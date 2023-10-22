import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import { UserContext } from './contexts/UserContext';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Pet from './pages/Pet';

import Footer from './components/Footer';
import Header from './components/Header';

function App() {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <Header
                linkTo='/'
                logoSrc='/logo.svg'
                logoAlt='A cat paw reaching for a heart.'
                logoWidth='100px'
                logoHeight='100px'
                loggedIn={currentUser.loggedIn}
            />
            <MainStyled>
                <Routes>
                    <Route path='/' exact element={<Dashboard />}></Route>
                    <Route path='/login' exact element={<Account />}></Route>
                    <Route path='/signup' exact element={<Account />}></Route>
                    <Route path='/pet' exact element={<Pet />}></Route>
                    <Route path='/pet/:id' exact element={<Pet />}></Route>
                </Routes>
            </MainStyled>
            <Footer />
        </>
    );
}

export default App;

const MainStyled = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background-color: #f49b42;
`;
