import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal)

const ShowSalas = () => {
    const [salas, setSalas] = useState([]);

    const salasCollection = collection(db, 'salas');

    const getSalas = async () => {
        const data = await getDocs(salasCollection);
        const salasData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        salasData.sort((a, b) => b.numSala - a.numSala); // Ordena en forma descendente por numSala
        setSalas(salasData);
    };

    useEffect(() => {
        getSalas();
    }, []);

    // Eliminar Sala
    // Funcion para eliminar un doc
    const deleteSala= async (id) => {
        const salasDoc = doc(db, "salas", id)
        await deleteDoc(salasDoc)
        getSalas()
    }

    // 5 - Funcion de confirmacion para Sweet Alert 2
    const confirmDelete = (id) => {
        mySwal.fire({
            title: '¿Desea eliminar la sala?',
            text: "No podras revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result => {
            if (result.isConfirmed) {
            // llamo a la funcion para eliminar
            deleteSala(id)
            Swal.fire(
                'Eliminado!',
                'La sala ha sido eliminada',
                'success'
            )
            }
        }))
    }

    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center d-grid gap-2">
                            <h1>Salas</h1>
                        </div>
                        <div className='d-flex justify-content-center d-grid gap-2'>
                            <Link to="/create-sala" className='btn btn-lg btn-primary m-2'>Añadir Sala</Link>
                            <Link to='/' className='btn btn-lg btn-primary m-2'>Volver</Link>
                        </div>
                        

                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Nº de Sala</th>
                                    <th>Capacidad</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>

                            <tbody>
                                {salas.map((sala) => (
                                    <tr key={sala.id}>
                                        <td>{sala.numSala}</td>
                                        <td>{sala.capacidadSala}</td>
                                        <td>
                                            <Link to={`/edit-sala/${sala.id}`} className='btn btn-light m-1'><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => {confirmDelete(sala.id)}} className='btn btn-danger m-1'><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowSalas