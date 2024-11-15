import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Alunos } from './pages/alunos/Alunos';
import { Biblioteca } from './pages/biblioteca/Biblioteca';
import { Disciplina } from './pages/disciplina/Disciplina';

export function AppRoutes() {

    return (
        <>
            <Router>
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/alunos" element={<Alunos />} />
                    <Route path="/biblioteca" element={<Biblioteca />} />
                    <Route path="/disciplinas" element={<Disciplina />} />
                </Routes>
            </Router>
        </>
    )
}