import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import Dashboard from './pages/Dashboard';
import Pet from './pages/Pet';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Header
                linkTo='/'
                logoSrc='/logo.svg'
                logoAlt='A cat paw reaching for a heart.'
                logoWidth='100px'
                logoHeight='100px'
            />
            <MainStyled>
                <Routes>
                    <Route path='/' exact element={<Dashboard />}></Route>
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
