import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShowEmociones = () => {
    const navigate = useNavigate();
    const { id } = useParams(10);
    const { id1 } = useParams(10);
    const [miedo, setMiedo] = useState({});
    const [depre, setDepre] = useState({});
    const [ira, setIra] = useState({});
    const [ansi, setAnsi] = useState({});
    const [soledad, setSoledad] = useState({});

    const [reserva, setReserva] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getMiedo = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/miedo/${1}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user1 = { ...response.data.data.iras, id };
                console.log(response.data.data);
                setMiedo(user1);
            } catch (error) {
                console.log(error);
            }
        };
        getMiedo();
    }, []);

    useEffect(() => {
        const getDepre = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/depresion/${1}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user2 = { ...response.data.data.iras, id };
                console.log(response.data.data);
                setDepre(user2);
            } catch (error) {
                console.log(error);
            }
        };
        getDepre();
    }, []);

    useEffect(() => {
        const getIra = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/ira/${10}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user3 = { ...response.data.data.iras, id };
                setIra(user3);
            } catch (error) {
                console.log(error);
            }
        };
        getIra();
    }, []);

    useEffect(() => {
        const getAnsi = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/ansiedad/${1}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user3 = { ...response.data.data.iras, id };
                setAnsi(user3);
            } catch (error) {
                console.log(error);
            }
        };
        getAnsi();
    }, []);

    useEffect(() => {
        const getSoledad = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/soledad/${1}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user3 = { ...response.data.data.iras, id };
                setSoledad(user3);
            } catch (error) {
                console.log(error);
            }
        };
        getSoledad();
    }, []);


    return (

        <div className="container-fluid">
            <div className="panel panel-info">
                <div className="panel-heading bg-warning">
                    <h3 className="panel-title text-light">
                        <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE miedo
                    </h3>
                </div>
                <div className="py-3 panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del evento creado</legend>
                            <p className="">
                                <span className="">
                                    Titulo:{" "}
                                </span>
                                {miedo.Tema}
                            </p>
                            <p className="">
                                <span className="">
                                    Descripcion:{" "}
                                </span>
                                {miedo.descripcion}
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-image"></i> &nbsp; Imágen </legend>
                            <video src={miedo.video} controls style={{ width: '45%' }} className=" col-xs-12 h-30 w-30">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/EmoEditMiedo/${1}`)}>Modificar</butoon>
                    
                </div>

                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/Miedo`)}>mostrar lista miedo</butoon>
                    
                </div>
            </div>

            <div className="panel panel-info">
                <div className="panel-heading bg-warning">
                    <h3 className="panel-title text-light">
                        <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE LA EMOCION DEPRESION 
                    </h3>
                </div>
                <div className="py-3 panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del evento creado</legend>
                            <p className="">
                                <span className="">
                                    Titulo:{" "}
                                </span>
                                {depre.Tema}
                            </p>
                            <p className="">
                                <span className="">
                                    Descripcion:{" "}
                                </span>
                                {depre.descripcion}
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-image"></i> &nbsp; Video </legend>
                            <video src={depre.video} controls style={{ width: '45%' }} className=" col-xs-12 h-30 w-30">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/EmoEditDepresion/${1}`)}>Modificar</butoon>
                    
                </div>

                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/Depresion`)}>listar multimedia de depresión </butoon>
                    
                </div>
            </div>

            <div className="panel panel-info">
                <div className="panel-heading bg-warning">
                    <h3 className="panel-title text-light">
                        <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE EMOCION IRA
                    </h3>
                </div>
                <div className="py-3 panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del evento creado</legend>
                            <p className="">
                                <span className="">
                                    Titulo:{" "}
                                </span>
                                {ira.Tema}
                            </p>
                            <p className="">
                                <span className="">
                                    Descripcion:{" "}
                                </span>
                                {ira.descripcion}
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-image"></i> &nbsp; Imágen </legend>
                            <video src={ira.video} controls style={{ width: '45%' }} className=" col-xs-12 h-30 w-30">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>

                        
                    </div>
                    
                </div>
                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/EmoEditIra/${1}`)}>Modificar</butoon>
                    
                </div>

                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/Ira`)}>mostrar lista Ira</butoon>
                    
                </div>
            </div>

            <div className="panel panel-info">
                <div className="panel-heading bg-warning">
                    <h3 className="panel-title text-light">
                        <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE EMOCION ANSIEDAD
                    </h3>
                </div>
                <div className="py-3 panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del evento creado</legend>
                            <p className="">
                                <span className="">
                                    Titulo:{" "}
                                </span>
                                {ansi.Tema}
                            </p>
                            <p className="">
                                <span className="">
                                    Descripcion:{" "}
                                </span>
                                {ansi.descripcion}
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-image"></i> &nbsp; Imágen </legend>
                            <video src={ansi.video} controls style={{ width: '45%' }} className=" col-xs-12 h-30 w-30">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/EmoEditAnsiedad/${1}`)}>Modificar</butoon>
                    
                </div>

                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/Ansiedad`)}>mostrar lista Ansiedad</butoon>
                    
                </div>
            </div>

            <div className="panel panel-info">
                <div className="panel-heading bg-warning">
                    <h3 className="panel-title text-light">
                        <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE EMOCION SOLEDAD
                    </h3>
                </div>
                <div className="py-3 panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del evento creado</legend>
                            <p className="">
                                <span className="">
                                    Titulo:{" "}
                                </span>
                                {soledad.Tema}
                            </p>
                            <p className="">
                                <span className="">
                                    Descripcion:{" "}
                                </span>
                                {soledad.descripcion}
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <legend><i className="bi bi-image"></i> &nbsp; Imágen </legend>
                            <video src={soledad.video} controls style={{ width: '45%' }} className=" col-xs-12 h-30 w-30">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/EmoEditSoledad/${1}`)}>Modificar</butoon>
                    
                </div>

                <div class="card-footer">
                    <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/Soledad`)}>mostrar lista Soledad</butoon>
                    
                </div>
            </div>

        </div>
    );
};
