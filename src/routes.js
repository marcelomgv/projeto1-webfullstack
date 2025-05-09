import { Route, Routes } from "react-router-dom"
import Home from "./components/home";
import Personagens from "./components/personagens";
import Monstros from "./components/monstros";
import Descricao from "./components/descricao";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/monstros' element={<Monstros />} />
            <Route path='/personagens' element={<Personagens />} />
            <Route path='/descricao/:id' element={<Descricao />} />
        </Routes>
    )
}

export default AppRoutes;