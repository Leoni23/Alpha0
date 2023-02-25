import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReservaForm } from '../../../components/organisms/ReservaForm';


export const EditReserva = () => {
    const { id } = useParams();
    const [reserva, setReserva] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getReserva = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/events/evento-get/${id}`,
                    { headers: { 'authorization': token } }
                );
                const eventos = { ...response.data.data.eventos, id }
                console.log(response.data.data);
                setReserva(response.data.data.eventos)

                console.log(eventos);
            } catch (error) {
                console.log(error);
            }
        }
        getReserva();
    }, [])

    console.log(reserva)
    return (
        <>
            <div style={{ margin: "12px" }} >
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                        <h1 id="publicidad">Eventos</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR EVENTO
                            </h3>
                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar un evento de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(reserva).length > 0 ?
                        (<ReservaForm reserva={reserva} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos del evento...</p>)
                }
            </div>

        </>
    );
}