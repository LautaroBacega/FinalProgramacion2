import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'

const CreatePelicula = () => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const [capacidadSala, setCapacidadSala] = useState('')
    const [dias, setDias] = useState('')
    const [horarios, setHorarios] = useState('')
    const [sala, setSala] = useState('')
    const [numeroSala, setNumeroSala] = useState('')
    const [calificacion, setCalificacion] = useState('')
    const [precio, setPrecio] = useState('')
    
    const navigate = useNavigate();

    const productsCollection = collection(db, "products")

    const store = async (e) => {
        e.preventDefault();
        try {
            console.log("Valores actuales de capacidadSala y numeroSala:", capacidadSala, numeroSala);
            await addDoc(productsCollection, {
                titulo: titulo,
                descripcion: descripcion,
                capacidad: capacidadSala,
                dias: dias,
                horarios: horarios,
                sala: numeroSala, 
                calificacion: calificacion,
                precio: precio,
            });
            navigate(`/show-pelicula`);
        } catch (error) {
            console.error('Error al agregar documento: ', error);
        }
    };

    // Vincular con coleccion "salas"
    const [salas, setSalas] = useState([]);

    const salasCollection = collection(db, 'salas');

    const getSalas = async () => {
        try {
            const data = await getDocs(salasCollection);
            const salasData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSalas(salasData);
            console.log("Datos de salas recuperados:", salasData);
        } catch (error) {
            console.error("Error al recuperar datos de salas:", error);
        }
    };

    useEffect(() => {
        getSalas();
    }, []);


    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col'>
                    <h1>Añadir Funcion</h1>

                    <form onSubmit={store}>

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

                        {/* DIAS */}
                        <div className='mb-3'>
                            <label className='form-label'>Dias</label>
                            <select
                                value={dias}
                                onChange={(e) => setDias(e.target.value)}
                                type='number'
                                className='form-select'
                                required
                            >
                                <option>Lunes</option>
                                <option>Martes</option>
                                <option>Miercoles</option>
                                <option>Jueves</option>
                                <option>Viernes</option>
                                <option>Sabado</option>
                                <option>Domingo</option>
                            </select>
                        </div>

                        {/* HORARIOS */}
                        <div className='mb-3'>
                            <label className='form-label'>Horario (beta)</label>
                            <select
                                value={horarios}
                                onChange={(e) => setHorarios(e.target.value)}
                                type='number'
                                className='form-select'
                                required
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                            </select>
                        </div>

                        {/* SALAS */}
                        <div className='mb-3'>
                            <label className='form-label'>Sala</label>
                            <select
                                value={numeroSala}
                                onChange={(e) => {
                                    console.log("Valor seleccionado:", e.target.value);
                                    setNumeroSala(e.target.value);
                                    const selectedSala = salas.find((sala) => sala.numSala === e.target.value);
                                    if (selectedSala) {
                                        setCapacidadSala(selectedSala.capacidadSala);
                                    }
                                }}
                                className='form-select'
                                required
                            >
                                {salas.map((sala) => (
                                    <option key={sala.id} value={sala.numSala}>
                                        Sala {sala.numSala} - Capacidad: {sala.capacidadSala}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* CALIFICACION */}
                        <div className='mb-3'>
                            <label className='form-label'>Calificacion</label>
                            <select
                                value={calificacion}
                                onChange={(e) => setCalificacion(e.target.value)}
                                type='number'
                                className='form-select'
                                required
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
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

                        <button type='submit' className='btn btn-primary'>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePelicula