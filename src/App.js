import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowTickets from './components/Tickets/ShowTickets';
import Inicio from './components/Inicio';
import CreatePelicula from './components/Peliculas/CreatePelicula';
import EditPelicula from './components/Peliculas/EditPelicula';
import ShowSalas from './components/Salas/ShowSalas';
import ShowPeliculas from './components/Peliculas/ShowPeliculas';
import CreateSala from './components/Salas/CreateSala';
import EditSala from './components/Salas/EditSala';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/show-ticket' element={<ShowTickets/>}/>
          <Route path='/show-sala' element={<ShowSalas/>}/>
          <Route path='/show-pelicula' element={<ShowPeliculas/>}/>
          <Route path='/create-pelicula' element={<CreatePelicula/>}/>
          <Route path='/create-sala' element={<CreateSala/>}/>
          <Route path='/edit-pelicula/:id' element={<EditPelicula/>}/>
          <Route path='/edit-sala/:id' element={<EditSala/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
