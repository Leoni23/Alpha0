import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const IraForm = ({ ira }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    const [image, setImage] = useState(null);
    const [tema, setTema] = useState(ira?.tema || "");
    const [descripcion, setDescripcion] = useState(ira?.descripcion || "");
    const [genero, setGenero] = useState(ira?.genero || "");
    const [duracion, setDuracion] = useState(ira?.duracion || "");
    const [audio, setAudio] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(true);


        const data = new FormData();
        data.append("tema", tema);
        data.append("genero", genero);
        data.append("descripcion", descripcion);
        data.append("duracion", duracion);
        data.append("audio", audio);
        console.log(data)
        console.log(image)
        if (image != null) {
            data.append("imagen", image);
        }

        try {
            console.log(ira)
            if (ira?.id) {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/musicOne/${ira.id}/update`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data);
                setMensaje(response.data.messages)
            } else {
                const response = await axios.post(
                    `https://alphaofin.herokuapp.com/api/alpha/musicOne/create`,
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
                                    <div className="form-group label-floating">
                                        <label htmlFor='tema' className="control-label form-label">Tema</label>
                                        <input
                                            id='tema'
                                            className={`form-control ${tema.length < 3 && 'is-invalid'}`}
                                            type="text"
                                            placeholder='Ingresa un tema'
                                            name='tema'
                                            value={tema}
                                            onChange={(e) => setTema(e.target.value)}
                                            minLength="3"
                                            maxLength="30"
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='imagen' className="control-label">Imágen</label>
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
                                        <label htmlFor='descripcion' className="control-label form-label">Descripción</label>
                                        <textarea
                                            id='descripcion'
                                            type="attention_schedule"
                                            className={`form-control ${descripcion.length < 3 && 'is-invalid'}`}
                                            placeholder='Ingresa una nueva descripción'
                                            name='descripcion'
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            minLength="3"
                                            required
                                        />
                                        {descripcion.length < 3 && (
                                            <div class="invalid-feedback">
                                                Aumenta la longuitud a 3 caracteres como mínimo
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 my-3">
                                    <div className="form-group label-floating">
                                        <label htmlFor='genero' className="control-label form-label">Género de música</label>
                                        <input
                                            className={`form-control ${genero.length < 3 && 'is-invalid'}`}
                                            id='genero'
                                            type="text"
                                            name='genero'
                                            value={genero}
                                            placeholder='Ingresa un género de música'
                                            onChange={(e) => setGenero(e.target.value)}
                                            minLength="3"
                                            maxLength="30"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='duracion' className="control-label form-label">Duración de reprodución (segundos)</label>
                                        <input
                                            className="form-control"
                                            id='duracion'
                                            type="number"
                                            name='duracion'
                                            value={duracion}
                                            placeholder='Ingresa la duración del audio'
                                            onChange={(e) => setDuracion(e.target.value)}
                                            required
                                            min="10"
                                            max="3600"
                                        />

                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='audio' className="control-label">Audio</label>
                                        <input
                                            className="form-control"
                                            id='audio'
                                            type="file"
                                            name='audio'
                                            accept=".mp3"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file.size > 2 * 1024 * 1024) {
                                                    alert("El archivo debe ser menor a 2MB");
                                                    e.target.value = null; // borra el archivo seleccionado
                                                } else {
                                                    setAudio(file);
                                                }
                                            }}
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
                        <button value={ira?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn text-light btn-raised btn-sm"
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
                                        Se guardó correctamente
                                    </h5>
                                    <h2 onClick={VerAlert}
                                        className="btn btn-raised btn-sm"
                                        onMouseEnter={(e) => e.target.style.background = "#CDCDCD"}
                                        onMouseLeave={(e) => e.target.style.background = "#E6E6E6"}
                                        style={{ color: " #2D4912", margin: "15px", border: "1px solid gray" }}>Aceptar</h2>
                                </div>
                            </div>
                        )}
                    </p>
                </form>
            </div>
        </>
    )
}
