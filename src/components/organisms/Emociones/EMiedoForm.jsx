import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

export const EMiedoForm = ({ miedo }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');
    const [Tema, setTema] = useState(miedo?.Tema);
    const [descripcion, setDescripcion] = useState(miedo?.descripcion);
    const [video, setVideo] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [isTemaValid, setIsTemaValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Tema.length < 3) {
            setIsTemaValid(false);
            return;
        }else {
            setIsTemaValid(true);
        }
    
        if (descripcion.length < 3) {
            setIsDescriptionValid(false);
            return;
        } else {
            setIsDescriptionValid(true);
        } 
    
        setShowAlert(true);

        const data = new FormData();
        data.append("Tema", Tema);
        data.append("descripcion", descripcion);

        if (video != null) {
            data.append("video", video);
        }
        console.log(data)


        try {
            console.log(miedo)
            if (miedo?.id) {
                const response = await axios.post(
                    `https://alphaofinal.herokuapp.com/api/alpha/miedo/${1}/update`,
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
                        error && <p className='text-red-700 font-semibold text-xl'>Todssos los campos son obligatorios</p>
                    }
                   <fieldset>
                    <div className="container-fluid was-validated">
                            <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='Tema'  className="control-label form-label">Tema</label>
                                        <input
                                            className={`form-control ${Tema.length < 3 && 'is-invalid'}`}
                                            id='Tema'
                                            type="text"
                                            placeholder='Ingresa un tema'
                                            name='Tema'
                                            value={Tema}
                                            onChange={(e) => setTema(e.target.value)}
                                            minLength="3"
                                            required />
                                            
                                    </div>
                                </div>
                               
                                <div className="col-xs-12 col-sm-6">
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
                            </div>
                            <div>
                                {mensaje}
                            </div>
                        </div>
                    </fieldset>
                    <p className="text-center">
                        <button value={miedo?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn text-light btn-raised btn-sm"
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
