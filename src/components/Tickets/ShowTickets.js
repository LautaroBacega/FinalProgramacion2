import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal)

const ShowTickets = () => {
    const [tickets, setTickets] = useState([]);

    const ticketsCollection = collection(db, 'tickets');

    const getTickets = async () => {
        const data = await getDocs(ticketsCollection);
        const ticketData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Ordenar por número de venta
        ticketData.sort((a, b) => {
            return b.numeroVenta - a.numeroVenta;
        });

        setTickets(ticketData);
    };

    useEffect(() => {
        getTickets();
    }, []);

    // Eliminar Ticket
    // 4 - Funcion para eliminar un doc
    const deleteTicket = async (id) => {
        const ticketDoc = doc(db, "tickets", id)
        await deleteDoc(ticketDoc)
        getTickets()
    }

    // 5 - Funcion de confirmacion para Sweet Alert 2
    const confirmDelete = (id) => {
        mySwal.fire({
            title: '¿Desea eliminar la informacion de la venta?',
            text: "No podras revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result => {
            if (result.isConfirmed) {
            // llamo a la funcion para eliminar
            deleteTicket(id)
            Swal.fire(
                'Eliminado!',
                'La informacion de la venta ha sido eliminada',
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
                            <h1>Ventas - Tickets</h1>
                        </div>
                        <Link to='/show-pelicula' >
                            <button className='btn btn-primary m-2'>Volver</button>
                        </Link>

                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Nº de Venta</th>
                                    <th>Fecha Venta</th>
                                    {/* <th>Nº Funcion</th> */}
                                    <th>Titulo</th>
                                    <th>Dia</th>
                                    <th>Horario</th>
                                    <th>Sala</th>
                                    <th>Calificacion</th>
                                    <th>Precio</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.numeroVenta}</td>
                                        <td>{ticket.fechaVenta}</td>
                                        {/* <td>{ticket.numeroFuncion}</td> */}
                                        <td>{ticket.titulo}</td>
                                        <td>{ticket.dias}</td>
                                        <td>{ticket.horarios}</td>
                                        <td>Nº{ticket.sala}</td>
                                        <td>{ticket.calificacion}/10</td>
                                        <td>${ticket.precio}</td>
                                        <td>
                                            <button onClick={() => {confirmDelete(ticket.id)}} className='btn btn-danger m-1'><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowTickets;
