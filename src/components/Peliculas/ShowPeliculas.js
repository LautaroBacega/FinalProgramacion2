import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, updateDoc, onSnapshot, addDoc, setDoc  } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

const ShowPeliculas = () => {
    // 1 - Configuramos los hooks
    // useState devuelve un valor con estado (products) y una funcion para actualizarlo (setProducts) 
    const [products, setProducts] = useState( [] )
    const [numerosData, setNumerosData] = useState(null);
    const [currentNumeroVenta, setCurrentNumeroVenta] = useState(1);
    const [salas, setSalas] = useState([]);
    const [cantidadCompra, setCantidadCompra] = useState(1);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const salaSeleccionada = searchParams.get('salaSeleccionada');


    // 2 - Referenciamos a la DB firestore
    const productsCollection = collection(db, "products")
    const ticketsCollection = collection(db, "tickets")
    const salasCollection = collection(db, 'salas');
    const numerosCollection = collection(db, 'numeros');


    // 3 - Funcion para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        // console.log(data.docs);
        setProducts(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
        // console.log(products);
    }

    const getSalas = async () => {
        const data = await getDocs(salasCollection);
        const salasData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setSalas(salasData);
    };

    const getCapacidadForSala = (salaNumero) => {
        const selectedSala = salas.find((sala) => sala.numSala === salaNumero);
        if (selectedSala) {
            return selectedSala.capacidad;
        }
        return 'N/A';
    };


    // 4 - Funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }


    // 5 - Funcion de confirmacion para Sweet Alert 2
    const confirmDelete = (id) => {
        mySwal.fire({
            title: '¿Desea eliminar esta pelicula de la cartelera?',
            text: "No podras revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result => {
            if (result.isConfirmed) {
            // llamo a la funcion para eliminar
            deleteProduct(id)
            Swal.fire(
                'Eliminado!',
                'La pelicula ha sido eliminada de la cartelera',
                'success'
            )
            }
        }))
    }


    // 6 - Usamos UseEffect
    useEffect(() => {
        const unsubscribe = onSnapshot(productsCollection, (querySnapshot) => {
            const productsData = [];
            querySnapshot.forEach((doc) => {
                productsData.push({ ...doc.data(), id: doc.id });
            });
            setProducts(productsData);
        });
    
        const numerosDocRef = doc(db, 'numeros', 'numeros_data');
        const unsubscribeNumeros = onSnapshot(numerosDocRef, (doc) => {
            if (doc.exists()) {
                setNumerosData(doc.data());
                setCurrentNumeroVenta(doc.data().numeroVenta);
            } else {
                const initialNumerosData = {
                    numeroVenta: 1,
                };
                setNumerosData(initialNumerosData);
                setDoc(numerosDocRef, initialNumerosData);
            }
        });
    
        return () => {
            unsubscribe();
            unsubscribeNumeros();
        };
    }, []);

    useEffect(() => {
        getSalas();
    }, []);


    // 7 - Función para generar el ticket
    const generateTicket = async (product) => {
        if (!numerosData) {
            return;
        }
    
        if (product.capacidad <= 0) {
            mySwal.fire({
                title: 'Advertencia',
                text: 'Las entradas estan agotadas. No se puede realizar la compra.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }
    
        const ticketData = {
            numeroVenta: currentNumeroVenta,
            fechaVenta: new Date().toLocaleString(),
            titulo: product.titulo,
            dias: product.dias,
            horarios: product.horarios,
            sala: product.sala,
            calificacion: product.calificacion,
            precio: product.precio,
        };
    
        try {
            const docRef = await addDoc(ticketsCollection, ticketData);
    
            const newNumerosData = {
                numeroVenta: currentNumeroVenta + 1,
            };
    
            await setDoc(doc(db, 'numeros', 'numeros_data'), newNumerosData);
            mySwal.fire({
                title: 'Ticket',
                html: `
                    <div className="d-flex justify-content-start">
                        <p>Numero de Venta: ${ticketData.numeroVenta}</p>
                        <p>Fecha de Venta: ${ticketData.fechaVenta}</p>
                        <p>Título: ${ticketData.titulo}</p>
                        <p>Día: ${ticketData.dias}</p>
                        <p>Horario: ${ticketData.horarios} HS</p>
                        <p>Sala Nº: ${ticketData.sala}</p>
                        <p>Calificacion: ${ticketData.calificacion}/10</p>
                        <p>Precio: $${ticketData.precio}</p>
                    </div>
                    <div>la entrada es válida únicamente para
                    la fecha y hora indicadas</div>
                `,
                confirmButtonText: 'OK',
            });
            updateAvailability(product.id, product.capacidad);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    // 8 - Función para actualizar la disponibilidad
    const updateAvailability = async (id, currentAvailability) => {
        const productDoc = doc(db, 'products', id);
        const newAvailability = parseInt(currentAvailability, 10) - 1;
        await updateDoc(productDoc, { capacidad: newAvailability });
    };


    // Vista del componente
    return (
        <>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col'>
                        <div className="d-flex justify-content-center d-grid gap-2">
                            <h1>Peliculas</h1>
                        </div>
                        <div className='d-flex justify-content-center d-grid gap-2'>
                            <Link to="/create-pelicula" className='btn btn-lg btn-primary m-2'>Añadir Funcion</Link>
                            <Link to="/show-ticket" className='btn btn-lg btn-primary m-2'>Ver Tickets</Link>
                            <Link to='/' className='btn btn-lg btn-primary m-2'>Volver</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Descripcion</th>
                                    <th>Dias</th>
                                    <th>Horarios</th>
                                    <th>Sala</th>
                                    <th>Disponibilidad</th>
                                    <th>Calificacion</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {products.map( (product) => (
                                    console.log("product:",product),
                                    <tr key={product.id}>
                                        <td>{product.titulo}</td>
                                        <td>{product.descripcion}</td>
                                        <td>{product.dias}</td>
                                        <td>{product.horarios} HS</td>
                                        <td>{product.sala}</td>
                                        <td>{product.capacidad}</td>
                                        <td>{product.calificacion}/10</td>
                                        <td>${product.precio}</td>
                                        <td>
                                            <Link to={`/edit-pelicula/${product.id}`} className='btn btn-light m-1'><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => {confirmDelete(product.id)}} className='btn btn-danger m-1'><i className="fa-solid fa-trash"></i></button>
                                            <button onClick={() => {generateTicket(product)}} className='btn btn-primary m-1'><i className="fa-solid fa-cart-shopping"></i></button>
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

export default ShowPeliculas