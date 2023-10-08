import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Pet from './pages/Pet';

function App() {
    return (
        <>
            <header></header>
            <main>
                <Routes>
                    <Route path='/' exact element={<Dashboard />}></Route>
                    <Route path='/pet' exact element={<Pet />}></Route>
                    <Route path='/pet/:id' exact element={<Pet />}></Route>
                </Routes>
            </main>
            <footer>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </footer>
        </>
    );
}

export default App;
