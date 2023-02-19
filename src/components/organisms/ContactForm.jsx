import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

export const ContactForm = ({contact}) => { 

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    const [nombre, setNombre] = useState(contact?.nombre);
    const [apellido, setApellido] = useState(contact?.apellido);
    const [correo, setCorreo] = useState(contact?.correo);
    const [puesto, setPuesto] = useState(contact?.puesto);
    const [contactanos, setContactanos] = useState(contact?.contactanos);


    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    `https://alphaofinal.herokuapp.com/api/alpha/contactos/${contact.id}/update`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data);
                  setMensaje(response.data.messages)
            } else {
                const response = await axios.post(
                    `https://alphaofinal.herokuapp.com/api/alpha/contactos/create`,
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

    
/* 	const getContact = async () => {
		try {
			const response = await axios.get(
				'https://alphaofinal.herokuapp.com/api/alpha/contactos',
				{ headers: { 'accept': 'application/json', 'authorization': token } }
			);
			console.log(response.data.data)
			setContact(response.data.data.contactanos)

		} catch (error) {
			console.log(error);
		}
	} */


	/* useEffect(() => {
		getContact();
	}, []) */


    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="form-group label-floating">
                                        <label htmlFor='nombre' className="control-label">Nombre *</label>
                                        <input
                                            className="form-control"
                                            id='nombre'
                                            type="text"
                                            placeholder='Ingresa el Tema'
                                            name='nombre'
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                    <label htmlFor='apellido' className="control-label">apellido *</label>
                                        <input
                                            className="form-control"
                                            id='apellido'
                                            type="text"
                                            placeholder='Ingresa el Tema'
                                            name='apellido'
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                    <label htmlFor='correo' className="control-label">correo *</label>
                                        <input
                                            className="form-control"
                                            id='correo'
                                            type="text"
                                            placeholder='Ingresa el Tema'
                                            name='correo'
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                    <label htmlFor='puesto' className="control-label">puesto *</label>
                                        <input
                                            className="form-control"
                                            id='puesto'
                                            type="text"
                                            placeholder='Ingresa el Tema'
                                            name='puesto'
                                            value={puesto}
                                            onChange={(e) => setPuesto(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                    <label htmlFor='contactanos' className="control-label">telefono *</label>
                                        <input
                                            className="form-control"
                                            id='contactanos'
                                            type="text"
                                            placeholder='Ingresa el Tema'
                                            name='contactanos'
                                            value={contactanos}
                                            onChange={(e) => setContactanos(e.target.value)}
                                            required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <p className="text-center">
                        <button value={contact?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm" >
                            <i className="zmdi zmdi-floppy"></i> GUARDAR

                        </button>
                    </p>
                </form>
            </div>

        </>

    )
}
