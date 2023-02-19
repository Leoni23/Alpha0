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
 


    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    `https://alphaofinal.herokuapp.com/api/alpha/publicidad/${publi.id}/update`,
                    data,
                    { headers: { 'authorization': token } }
                    
                );
                console.log(response.data);
                  setMensaje(response.data.messages)
            } else {
                const response = await axios.post(
                    `https://alphaofinal.herokuapp.com/api/alpha/publicidad/create`,
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

    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información para publicidad</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='titulo' className="control-label">titulo *</label>
                                        <input
                                            className="form-control"
                                            id='titulo'
                                            type="text"
                                            placeholder='titulo'
                                            name='titulo'
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}

                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='imagen' className="control-label">Imagen *</label>
                                        <input
                                            id='imagen'
                                            type="file"
                                            name="avatar"
                                            placeholder='imagen'
                                            className='form-control'
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => setImage(e.target.files[0])}

                                             />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='descripcion' className="control-label">Descripcion *</label>
                                        <textarea
                                            id='descripcion'
                                            type="text"
                                            className="form-control"
                                            placeholder='descripcion'
                                            name='descripcion'
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='evento' className="control-label">Evento</label>
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
                                    </div>
                                </div>
                            </div>
                            <div>
                                {mensaje}
                            </div>
                        </div>
                    </fieldset>

                    <p className="text-center">
                        <button value={publi?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm" >
                            <i className="zmdi zmdi-floppy"></i> GUARDAR

                        </button>
                    </p>
                </form>
            </div>

        </>

    )
}
