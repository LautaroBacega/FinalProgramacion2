import { getDoc, updateDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import { db } from "../../firebaseConfig/firebase"

const EditSala = () => {

    const [numSala, setNumSala] = useState('')
    const [capacidadSala, setCapacidadSala] = useState('')
    
    const navigate = useNavigate();
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const sala = doc(db, 'salas', id)
        const data = {
            numSala: numSala, 
            capacidadSala: capacidadSala, 
        }
        await updateDoc(sala, data)
        navigate('/show-sala')
    }

    const getSalaById = async (id) => {
        const sala = await getDoc(doc(db, 'salas', id))
        if (sala.exists()) {
            // console.log(product.data());
            setNumSala(sala.data().numSala)
            setCapacidadSala(sala.data().capacidadSala)
        } else {
            console.log('El producto no existe');
        }
    }

    useEffect(() => {
        getSalaById(id)
    }, [])

    return (
        <>
        <div className='container p-5'>
                    <div className='row'>
                        <div className='col'>
                            <h1>Editar Pelicula</h1>

                            <form onSubmit={update}>

                                <div className='mb-3'>
                                    <label className='form-label'>Nº de Sala</label>
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

                                <button type='submit' className='btn btn-primary'>Guardar Cambios</button>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default EditSala