import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

export const ContactForm = ({ contact }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    const [nombre, setNombre] = useState(contact?.nombre || "");
    const [apellido, setApellido] = useState(contact?.apellido || "");
    const [correo, setCorreo] = useState(contact?.correo || "");
    const [puesto, setPuesto] = useState(contact?.puesto || "");
    const [contactanos, setContactanos] = useState(contact?.contactanos || "");
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPhoneValidStarting, setIsPhoneValidStarting] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
       
        e.preventDefault();

        if (contactanos.length !== 10) {
            setIsPhoneValid(false);
            return;
        }

        if (!contactanos.startsWith("09")) {
            setIsPhoneValidStarting(false);
            return;
        }
        setShowAlert(true);
        const data = new FormData();
        data.append("nombre", nombre);
        data.append("apellido", apellido);
        data.append("correo", correo);
        data.append("puesto", puesto);
        data.append("contactanos", contactanos);

        console.log(data)



        try {
            console.log(contact)
            if (contact?.id) {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/contactos/${contact.id}/update`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data);
                setMensaje(response.data.messages)
            } else {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/contactos/create`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data);
                setMensaje(response.data.messages)
            }

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
                        <div className="container-fluid was-validated">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="form-group label-floating">
                                            <label htmlFor='nombre' className="control-label form-label">Nombres:</label>
                                            <input
                                                className={`form-control ${nombre.length < 3 && 'is-invalid'}`}
                                                id='nombre'
                                                type="text"
                                                placeholder='Ingresa nombres'
                                                name='nombre'
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                minLength="3"
                                                maxLength="30"
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='apellido' className="control-label form-label">Apellidos: </label>
                                        <input
                                            className={`form-control ${apellido.length < 3 && 'is-invalid'}`}
                                            id='apellido'
                                            type="text"
                                            placeholder='Ingresa apellidos'
                                            name='apellido'
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            minLength="3"
                                            maxLength="30"
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 my-3">
                                    <div className="form-group label-floating">
                                        <label htmlFor='correo' className="control-label form-label">Correo Electrónico: </label>
                                        <input
                                            className="form-control"
                                            id='correo'
                                            type="email" // Cambiamos el tipo de input a 'email'
                                            placeholder='Ingresa correo electrónico'
                                            name='correo'
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Agregamos la expresión regular para validar el formato
                                        />
                                        <div className="invalid-feedback">Ingresa un correo electrónico válido.</div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 my-3">
                                    <div className="form-group label-floating">
                                        <label htmlFor='puesto' className="control-label form-label">Cargo de trabajo:</label>
                                        <input
                                            className={`form-control ${puesto.length < 5 && 'is-invalid'}`}
                                            id='puesto'
                                            type="text"
                                            placeholder='Ingresa cargo de trabajo'
                                            name='puesto'
                                            value={puesto}
                                            onChange={(e) => setPuesto(e.target.value)}
                                            minLength="3"
                                            maxLength="30"
                                            required />
                                    </div>
                                </div>
                                <div className="form-group label-floating">
                                    <label htmlFor='first_name' className="control-label">Teléfono Celular :</label>
                                    <input
                                        className="form-control"
                                        id='contactanos'
                                        type="number"
                                        name='personal_phone'
                                        placeholder='Ingrese su teléfono celular'
                                        value={contactanos}
                                        onChange={(e) => setContactanos(e.target.value)}
                                        required
                                    />
                                     {!isPhoneValid && (
                                            <div style={{ color: "red" }}>
                                                El número de teléfono debe tener 10 dígitos.
                                            </div>
                                        )}
                                        {!isPhoneValidStarting && (
                                            <div style={{ color: "red" }}>
                                                El número de teléfono debe comenzar con 09.
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {<p className="text-center">
                        <button value={contact?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn text-light btn-raised btn-sm"
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
                                        El contacto se guardó correctamente
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
