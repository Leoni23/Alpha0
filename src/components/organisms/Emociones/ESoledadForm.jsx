import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

export const ESoledadForm = ({ soledad }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');
    const [Tema, setTema] = useState(soledad?.Tema);
    const [descripcion, setDescripcion] = useState(soledad?.descripcion);
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("Tema", Tema);
        data.append("descripcion", descripcion);

        if (video != null) {
            data.append("video", video);
        }
        console.log(data)


        try {
            console.log(soledad)
            if (soledad?.id) {
                const response = await axios.post(
                    `https://alphaofinal.herokuapp.com/api/alpha/soledad/${1}/update`,
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


    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Inforsssmación personal</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='Tema' className="control-label">Tema *</label>
                                        <input
                                            className="form-control"
                                            id='Tema'
                                            type="text"
                                            placeholder='Tema'
                                            name='Tema'
                                            value={Tema}
                                            onChange={(e) => setTema(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='video' className="control-label">video *</label>
                                        <input
                                            id='video'
                                            type="file"
                                            name="avatar"
                                            placeholder='video'
                                            className='form-control'
                                            accept=".mp4"
                                            onChange={(e) => setVideo(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='descripcion' className="control-label">Descripcion *</label>
                                        <input
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
                            </div>
                            <div>
                                {mensaje}
                            </div>
                        </div>
                    </fieldset>
                    <p className="text-center">
                        <button value={soledad?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm" >
                            <i className="zmdi zmdi-floppy"></i> GUARDAR
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}
