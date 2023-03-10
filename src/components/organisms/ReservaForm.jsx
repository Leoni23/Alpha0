import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ReservaForm = ({ reserva }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    const [titulo, setTitulo] = useState(reserva?.titulo);
    const [descripcion, setDescripcion] = useState(reserva?.descripcion);
    const [evento, setEvento] = useState(reserva?.evento);
    const [cupos, setCupos] = useState(reserva?.cupos);
    const [contacto, setContacto] = useState(reserva?.contacto);
    const [image, setImage] = useState(null);

    /*validaciones*/
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPhoneValidStarting, setIsPhoneValidStarting] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isCuposValid, setIsCuposValid] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contacto.length !== 10) {
            setIsPhoneValid(false);
            return;
        }

        if (!contacto.startsWith("09")) {
            setIsPhoneValidStarting(false);
            return;
        }

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

        if (isNaN(cupos) || cupos < 5 || cupos > 300) {
            setIsCuposValid(false);
            return;
        } else {
            setIsCuposValid(true);
        }

        const currentDate = new Date();
        const selectedDate = new Date(evento);
        if (selectedDate < currentDate) {
            setIsDateValid(false);
            return;
        }

        setIsTitleValid(true);
        setIsPhoneValidStarting(true);
        setIsPhoneValid(true);
        setIsDateValid(true);

        setShowAlert(true);
        const data = new FormData();
        data.append("titulo", titulo);
        data.append("evento", evento);
        data.append("descripcion", descripcion);
        data.append("cupos", cupos);
        data.append("imagen", image);
        data.append("contacto", contacto);
        console.log(data)

        try {
            console.log(reserva)
            if (reserva?.id) {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/events/eventupdate/${reserva.id}`,
                    data,
                    { headers: { 'authorization': token } },
                    console.log(data)
                );
                console.log(response.data);
                setMensaje(response.data.messages)
            } else {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/events/event-create`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data);
                setMensaje(response.data.messages)
            }
        } catch (error) { console.log(error); }
    }

    function VerAlert() { window.history.back(); }

    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Tosdos los campos son obligatorios</p>
                    }
                    <fieldset>
                       
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='titulo' className="control-label">T??tulo: </label>
                                        <input
                                            className="form-control"
                                            id='titulo'
                                            type="text"
                                            placeholder='Ingresa un t??tulo'
                                            name='titulo'
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            required />
                                        {!isTitleValid && (
                                            <div style={{ color: "red" }}>
                                                El t??tulo debe tener como m??nimo 4 caracteres.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='imagen' className="control-label">Im??gen:</label>
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
                                        <label htmlFor='descripcion' className="control-label">Descripci??n</label>
                                        <textarea
                                            id='descripcion'
                                            type="attention_schedule"
                                            className="form-control"
                                            placeholder='Ingresa una nueva descripci??n'
                                            name='descripcion'
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        />
                                        {!isDescriptionValid && (
                                            <div style={{ color: "red" }}>
                                                La descripci??n debe tener al menos 4 letras.
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
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='cupos' className="control-label">Cupos</label>
                                        <input
                                            className="form-control"
                                            id='cupos'
                                            type="number"
                                            name='cupos'
                                            value={cupos}
                                            placeholder='Ingresa el n??mero de cupos'
                                            onChange={(e) => setCupos(e.target.value)}
                                            required
                                        />
                                        {!isCuposValid && (
                                            <div style={{ color: "red" }}>
                                                El n??mero de cupos debe ser un n??mero entre 5 y 300.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='contacto' className="control-label">Tel??fono Celular</label>
                                        <input
                                            className="form-control"
                                            id='contacto'
                                            type="number"
                                            name='contacto'
                                            value={contacto}
                                            placeholder='Ingresa n??mero de tel??fono'
                                            onChange={(e) => setContacto(e.target.value)}
                                            required
                                        />
                                        {!isPhoneValid && (
                                            <div style={{ color: "red" }}>
                                                El n??mero de tel??fono debe tener 10 d??gitos.
                                            </div>
                                        )}
                                        {!isPhoneValidStarting && (
                                            <div style={{ color: "red" }}>
                                                El n??mero de tel??fono debe comenzar con 09.
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
                    <br />
                    {<p className="text-center">
                        <button value={reserva?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn text-light btn-raised btn-sm"
                            style={{ background: "#427296", margin: "10px" }}
                            onMouseEnter={(e) => e.target.style.background = "#2d5b89"}
                            onMouseLeave={(e) => e.target.style.background = "#427296"}>
                            <i className="zmdi zmdi-floppy"></i> Guardar informaci??n
                        </button>
                        {showAlert && (
                            <div className="alert-container1">
                                <div className="alert1">
                                    <h5 style={{ color: " #2D4912" }}>
                                        <i class="bi bi-check-circle-fill" style={{ color: " #2D4912", marginRight: "8px" }}></i>
                                        El evento se guard?? correctamente
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
