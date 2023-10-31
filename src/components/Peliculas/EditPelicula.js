import { getDoc, updateDoc, doc, collection } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"
import { db } from "../../firebaseConfig/firebase"

const EditPelicula = () => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const [dias, setDias] = useState('')
    const [horarios, setHorarios] = useState('')
    const [sala, setSala] = useState('')
    const [calificacion, setCalificacion] = useState('')
    const [precio, setPrecio] = useState('')
    const navigate = useNavigate();
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, 'products', id)
        const data = {
            titulo: titulo, 
            descripcion: descripcion, 
            capacidad: capacidad, 
            dias: dias, 
            sala: sala,
            calificacion: calificacion,
            precio: precio,
            horarios: horarios
        }
        await updateDoc(product, data)
        navigate('/show-pelicula')
    }

    const getProductById = async (id) => {
        const product = await getDoc(doc(db, 'products', id))
        if (product.exists()) {
            // console.log(product.data());
            setTitulo(product.data().titulo)
            setDescripcion(product.data().descripcion)
            setCapacidad(product.data().capacidad)
            setDias(product.data().dias)
            setSala(product.data().sala)
            setHorarios(product.data().horarios)
            setCalificacion(product.data().calificacion)
            setPrecio(product.data().precio)
        } else {
            console.log('El producto no existe');
        }
    }

    useEffect(() => {
        getProductById(id)
    }, [])


    return (
        <>
            <div className='container p-5'>
                <div className='row'>
                    <div className='col'>
                        <h1>Editar Pelicula</h1>

                        <form onSubmit={update}>

                            {/* TITULO */}
                            <div className='mb-3'>
                                <label className='form-label'>Titulo</label>
                                <input
                                    value={titulo}
                                    onChange={ (e) => setTitulo(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* DESCRIPCION */}
                            <div className='mb-3'>
                                <label className='form-label'>Descripcion</label>
                                <input
                                    value={descripcion}
                                    onChange={ (e) => setDescripcion(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* DISPONIBILIDAD - CAPACIDAD */}
                            <div className='mb-3'>
                                <label className='form-label'>Disponibilidad (capacidad)</label>
                                <input
                                    value={capacidad}
                                    onChange={ (e) => setCapacidad(e.target.value)}
                                    type='number'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* DIAS */}
                            <div className='mb-3'>
                                <label className='form-label'>Dias</label>
                                <input
                                    value={dias}
                                    onChange={ (e) => setDias(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* HORARIOS */}
                            <div className='mb-3'>
                                <label className='form-label'>Horarios</label>
                                <input
                                    value={horarios}
                                    onChange={ (e) => setHorarios(e.target.value)}
                                    type='number'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* SALAS */}
                            <div className='mb-3'>
                                <label className='form-label'>Salas</label>
                                <input
                                    value={sala}
                                    onChange={ (e) => setSala(e.target.value)}
                                    type='number'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* CALIFICACION */}
                            <div className='mb-3'>
                                <label className='form-label'>Calificacion</label>
                                <input
                                    value={calificacion}
                                    onChange={ (e) => setCalificacion(e.target.value)}
                                    type='number'
                                    className='form-control'
                                    required
                                />
                            </div>

                            {/* PRECIO */}
                            <div className='mb-3'>
                                <label className='form-label'>Precio</label>
                                <input
                                    value={precio}
                                    onChange={ (e) => setPrecio(e.target.value)}
                                    type='number'
                                    className='form-control'
                                    required
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

export default EditPelicula