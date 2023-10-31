import React from 'react'
import { Link } from 'react-router-dom'

const Inicio = () => {
    return (
        <>
                <div className='d-flex justify-content-center align-items-center p-1 m-1'>
                    <h1>Cine Full Pelis</h1>
                </div>
                <div className='d-flex justify-content-center align-items-center p-1 m-1'>
                    <Link to='/show-sala'>
                        <button className='btn btn-primary m-2'>Salas</button>
                    </Link>
                    <Link to='/show-pelicula'>
                        <button className='btn btn-primary m-2'>Peliculas</button>
                    </Link>
                </div>
            
        </>
    )
}

export default Inicio