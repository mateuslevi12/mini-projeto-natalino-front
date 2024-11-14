import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Alunos } from './pages/alunos/Alunos';
import { Biblioteca } from './pages/biblioteca/Biblioteca';

export function AppRoutes() {

    return (
        <>
            <Router>
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/alunos" element={<Alunos />} />
                    <Route path="/biblioteca" element={<Biblioteca />} />
                </Routes>
            </Router>
        </>
    )
}