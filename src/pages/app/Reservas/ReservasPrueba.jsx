import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import axios from 'axios';

export const ReservasPrueba = () => {
    const navigate = useNavigate();
    const [reserva, setReserva] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [showAlert, setShowAlert] = useState(false);


    const getReserva = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://alphaomegafinal.herokuapp.com/api/alpha/events/eventlist',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.eventos)
            setReserva(response.data.data.eventos)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteReserva = async (id) => {
        try {
            console.warn(id);
            const confirmation = confirm("¿Esta seguro que desea eliminar el evento?")
            
            if (confirmation) {
                await axios.get(
                    `https://alphaomegafinal.herokuapp.com/api/alpha/events/eventodestroy/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getReserva();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getReserva(); }, [])

    return (
        <>
            <section class="py-2" style={{ background: " #E2E2E2" }}>
                <div class="gx-lg-4 py-3 container" >
                    <h1 id="publicidad">Eventos</h1>
                    <p>Bienvenido a la sección de eventos de la Escuela de Biodanza.
                        Aquí encontrarás toda la información sobre los próximos eventos organizados por nuestra escuela,estamos dedicados
                        a brindar a nuestros participantes una experiencia única y enriquecedora. </p>
                    <Link class="btn btn-sm text-light bi bi-plus" style={{ background: "#427296", margin: "10px" }} to="/CreateReserva">Crear Nuevo Evento</Link>

                    {loading ? (
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <p>Cargando....</p>
                        </div>
                    ) : (

                        <div class=" row align-items-start">
                            <div class="row gx-4 gx-lg-5 ">
                                {
                                    reserva.map((reserva) => (
                                        <div key={reserva.id} class="col-md-4 mb-5">
                                            <div class="card h-100">
                                                <div class="card-body">
                                                    <h3 class="text-center text-uppercase " style={{ color: "#CA8725" }} > <b> {reserva.titulo}</b> </h3>
                                                    <br />
                                                    <p class="card-text"><b>Descripción del evento: </b>{reserva.descripcion}</p>
                                                    <p class="card-text" ><b>Telefono de contacto:</b>  {reserva.contacto}</p>
                                                    <p class="card-text"><b>Número de cupos disponibles:</b>  {reserva.cupos} </p>
                                                    <p class="card-text"><b>Fecha del evento:</b>
                                                        <span id="fecha">{reserva.evento.split(" ")[0]}</span>
                                                        <br />
                                                        <br />
                                                        <b>Hora del evento: </b>
                                                        <span id="hora">{reserva.evento.split(" ")[1]}</span>
                                                    </p>
                                                    <img class="carousel-inner" src={reserva.imagen} alt="" />
                                                </div>
                                                <div class="card-footer">
                                                    <butoon id="botonModificarRese" class="btn btn-sm text-light  m-1 bi bi-pencil-square"
                                                        style={{ background: "#f7b25d" }}
                                                        onClick={() => navigate(`/EditReserva/${reserva.id}`)}> Modificar
                                                    </butoon>
                                                    <button type='button' className='btn btn-sm text-light m-1 bi bi-sort-up-alt'
                                                        style={{ background: "#505A6A" }}
                                                        onClick={() => navigate(`/ShowReserva/${reserva.id}`)}>Más Información
                                                    </button>
                                                    <button type='button' className='btn btn-sm btn-danger m-1 bi bi-trash-fill'
                                                        onClick={() => { deleteReserva(reserva.id) }}> Eliminar
                                                        
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )} </div>
            </section>
        </>)
};