import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

export const PublicidadForm = ({ publi }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');
    const [titulo, setTitulo] = useState(publi?.titulo);
    const [descripcion, setDescripcion] = useState(publi?.descripcion);
    const [evento, setEvento] = useState(publi?.evento);
    const [image, setImage] = useState(null);

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [isDateValid, setIsDateValid] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (evento < new Date()) {
            setIsDateValid(false);
            return;
        }

        if (titulo.length < 4) {
            setIsTitleValid(false);
            return;
        }

        if (descripcion.length < 4) {
            setIsDescriptionValid(false);
            return;
        } else {
            setIsDescriptionValid(true);
        }


        const currentDate = new Date();
        const selectedDate = new Date(evento);
        if (selectedDate < currentDate) {
            setIsDateValid(false);
            return;
        }
        setIsTitleValid(true);
        setIsDateValid(true);
        setShowAlert(true);

        const data = new FormData();
        data.append("titulo", titulo);
        data.append("evento", evento);
        data.append("descripcion", descripcion);
        data.append("imagen", image);

        console.log(data)


        try {
            console.log(publi)
            if (publi?.id) {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/publicidad/${publi.id}/update`,
                    data,
                    { headers: { 'authorization': token } }

                );
                console.log(response.data);
                setMensaje(response.data.messages)
            } else {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/publicidad/create`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data);
                setMensaje(response.data.messages)
            }

            /* navigate('/'); */

        } catch (error) {
            console.log(error);
        }
    }
    function VerAlert() { window.history.back(); }
    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='titulo' className="control-label">Título:</label>
                                        <input
                                            className="form-control"
                                            id='titulo'
                                            type="text"
                                            placeholder='Ingresa un título'
                                            name='titulo'
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            required />
                                        {!isTitleValid && (
                                            <div style={{ color: "red" }}>
                                                El título debe tener como mínimo 4 caracteres.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='imagen' className="control-label">Imágen:</label>
                                        <input
                                            id='imagen'
                                            type="file"
                                            name="avatar"
                                            placeholder='imagen'
                                            className='form-control'
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 my-3">
                                    <div className="form-group label-floating">
                                        <label htmlFor='descripcion' className="control-label">Descripción</label>
                                        <textarea
                                            id='descripcion'
                                            type="attention_schedule"
                                            className="form-control"
                                            placeholder='Ingresa una nueva descripción'
                                            name='descripcion'
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        />
                                        {!isDescriptionValid && (
                                            <div style={{ color: "red" }}>
                                                La descripción debe tener al menos 4 letras.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 my-3" >
                                    <div className="form-group label-floating">
                                        <label htmlFor='evento' className="control-label">Fecha y Hora</label>
                                        <input
                                            className="form-control"
                                            id='evento'
                                            type="datetime-local"
                                            name='evento'
                                            value={evento}
                                            placeholder='evento'
                                            onChange={(e) => setEvento(e.target.value)}
                                            required
                                        />
                                        {!isDateValid && (
                                            <div style={{ color: "red" }}>
                                                La fecha y hora no puede ser anterior a la fecha y hora actual.
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div>
                                {mensaje}
                            </div>
                        </div>
                    </fieldset>

                    {<p className="text-center">
                        <button value={publi?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn text-light btn-raised btn-sm"
                            style={{ background: "#427296", margin: "10px" }}
                            onMouseEnter={(e) => e.target.style.background = "#2d5b89"}
                            onMouseLeave={(e) => e.target.style.background = "#427296"}>
                            <i className="zmdi zmdi-floppy"></i> Guardar información
                        </button>
                        {showAlert && (
                            <div className="alert-container1">
                                <div className="alert1">
                                    <h5 style={{ color: " #2D4912" }}>
                                        <i class="bi bi-check-circle-fill" style={{ color: " #2D4912", marginRight: "8px" }}></i>
                                        La publicidad se guardó correctamente
                                    </h5>
                                    <h2 onClick={VerAlert}
                                        className="btn btn-raised btn-sm"
                                        onMouseEnter={(e) => e.target.style.background = "#CDCDCD"}
                                        onMouseLeave={(e) => e.target.style.background = "#E6E6E6"}
                                        style={{ color: " #2D4912", margin: "15px", border: "1px solid gray" }}>Aceptar</h2>
                                </div>
                            </div>
                        )}
                    </p>}
                </form>
            </div>

        </>

    )
}
