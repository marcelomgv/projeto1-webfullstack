import { Route, Routes } from "react-router-dom"
import Home from "./components/home";
import Personagens from "./components/personagens";
//import Descrição from "./components/descricao";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/personagens' element={<Personagens />} />
            
        </Routes>
    )
}

export default AppRoutes;