import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'

const CreateSala = () => {

    const [numSala, setNumSala] = useState('')
    const [capacidadSala, setCapacidadSala] = useState('')

    const navigate = useNavigate();

    const salasCollection = collection(db, 'salas');

    const store = async (e) => {
      e.preventDefault()
      await addDoc(
          salasCollection, 
          {
            numSala: numSala, 
            capacidadSala: capacidadSala, 
          }
      )
      navigate('/show-sala')
  }

  return (
    <>
      <div className='container p-5'>
        <div className='row'>
          <div className='col'>
            <h1>Añadir Funcion</h1>

                    <form onSubmit={store}>
                        <div className='mb-3'>
                            <label className='form-label'>Nº Sala</label>
                            <input
                                value={numSala}
                                onChange={ (e) => setNumSala(e.target.value)}
                                type='number'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Capacidad</label>
                            <input
                                value={capacidadSala}
                                onChange={ (e) => setCapacidadSala(e.target.value)}
                                type='number'
                                className='form-control'
                            />
                        </div>

                        <button type='submit' className='btn btn-primary'>Guardar</button>
                        
                    </form>
                </div>
            </div>
      </div>
    </>
  )
}

export default CreateSala