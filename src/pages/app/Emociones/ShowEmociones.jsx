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
                    `https://alphaomegafinal.herokuapp.com/api/alpha/miedo/${1}`,
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
                    `https://alphaomegafinal.herokuapp.com/api/alpha/depresion/${1}`,
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
                    `https://alphaomegafinal.herokuapp.com/api/alpha/ira/${10}`,
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
                    `https://alphaomegafinal.herokuapp.com/api/alpha/ansiedad/${1}`,
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
                    `https://alphaomegafinal.herokuapp.com/api/alpha/soledad/${1}`,
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
        <div className="container-fluid py-2" style={{ background: " #E2E2E2" }}>
            <h1 id="publicidad" >Módulo de Emociones </h1>
            <div class="mx-auto my-5" style={{ maxWidth: "1100px" }}>
                <div class="card-header bg-warning text-light text-center bg-custom-gradient ">
                    <h4 class="card-title bg-custom-gradient">
                        <i></i> Emoción Miedo
                    </h4>
                </div>
                <div class="card-body py-3" style={{ background: " #f6f8fc" }}  >
                    <div class="row justify-content-center">
                        <div class="col-sm-6">
                            <legend><i class="bi bi-file-earmark-richtext-fill"></i> Información del evento creado</legend>
                            <p><b>Título:</b> {miedo.Tema}</p>
                            <p><b>Descripción:</b> {miedo.descripcion}</p>
                            <button class="btn btn-sm text-light mx-1 bi bi-pencil-square"
                                style={{ background: "#f7b25d" }} onClick={() => navigate(`/EmoEditMiedo/${1}`)}>Modificar</button>
                            <button class="btn btn-sm text-light mx-1 bi bi-sort-up-alt"
                                style={{ background: "#505A6A" }} onClick={() => navigate(`/Miedo`)}>Mostrar lista miedo</button>
                        </div>
                        <div className="col-sm-6">
                            <legend><i className="bi bi-image"></i> Imágen</legend>
                            <video src={miedo.video} controls style={{ width: "70%" }} className="my-3">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-auto my-5" style={{ maxWidth: "1100px" }}>
                <div class="card-header bg-warning text-light text-center bg-custom-gradient ">
                    <h4 class="card-title bg-custom-gradient">
                        <i></i> Emoción Depresión
                    </h4>
                </div>
                <div class="card-body py-3" style={{ background: " #f6f8fc" }}  >
                    <div class="row justify-content-center">
                        <div class="col-sm-6">
                            <legend><i class="bi bi-file-earmark-richtext-fill"></i> Información del evento creado</legend>
                            <p><b>Título:</b> {depre.Tema}</p>
                            <p><b>Descripción:</b> {depre.descripcion}</p>
                            <button class="btn btn-sm text-light mx-1 bi bi-pencil-square"
                                style={{ background: "#f7b25d" }} onClick={() => navigate(`/EmoEditDepresion/${1}`)}>Modificar</button>
                            <button class="btn btn-sm text-light mx-1 bi bi-sort-up-alt"
                                style={{ background: "#505A6A" }} onClick={() => navigate(`/Depresion`)}>Mostrar lista depresión</button>
                        </div>
                        <div className="col-sm-6">
                            <legend><i className="bi bi-image"></i> Imágen</legend>
                            <video src={depre.video} controls style={{ width: "70%" }} className="my-3">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-auto my-5" style={{ maxWidth: "1100px" }}>
                <div class="card-header bg-warning text-light text-center bg-custom-gradient ">
                    <h4 class="card-title bg-custom-gradient">
                        <i></i> Emoción Ira
                    </h4>
                </div>
                <div class="card-body py-3" style={{ background: " #f6f8fc" }}  >
                    <div class="row justify-content-center">
                        <div class="col-sm-6">
                            <legend><i class="bi bi-file-earmark-richtext-fill"></i> Información del evento creado</legend>
                            <p><b>Título:</b> {ira.Tema}</p>
                            <p><b>Descripción:</b> {ira.descripcion}</p>
                            <button class="btn btn-sm text-light mx-1 bi bi-pencil-square"
                                style={{ background: "#f7b25d" }} onClick={() => navigate(`/EmoEditIra/${1}`)}>Modificar</button>
                            <button class="btn btn-sm text-light mx-1 bi bi-sort-up-alt"
                                style={{ background: "#505A6A" }} onClick={() => navigate(`/Ira`)}>Mostrar lista depresión</button>
                        </div>
                        <div className="col-sm-6">
                            <legend><i className="bi bi-image"></i> Imágen</legend>
                            <video src={ira.video} controls style={{ width: "70%" }} className="my-3">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-auto my-5" style={{ maxWidth: "1100px" }}>
                <div class="card-header bg-warning text-light text-center bg-custom-gradient ">
                    <h4 class="card-title bg-custom-gradient">
                        <i></i> Emoción Ansiedad
                    </h4>
                </div>
                <div class="card-body py-3" style={{ background: " #f6f8fc" }}  >
                    <div class="row justify-content-center">
                        <div class="col-sm-6">
                            <legend><i class="bi bi-file-earmark-richtext-fill"></i> Información del evento creado</legend>
                            <p><b>Título:</b> {ansi.Tema}</p>
                            <p><b>Descripción:</b> {ansi.descripcion}</p>
                            <button class="btn btn-sm text-light mx-1 bi bi-pencil-square"
                                style={{ background: "#f7b25d" }} onClick={() => navigate(`/EmoEditAnsiedad/${1}`)}>Modificar</button>
                            <button class="btn btn-sm text-light mx-1 bi bi-sort-up-alt"
                                style={{ background: "#505A6A" }} onClick={() => navigate(`/Ansiedad`)}>Mostrar lista depresión</button>
                        </div>
                        <div className="col-sm-6">
                            <legend><i className="bi bi-image"></i> Imágen</legend>
                            <video src={ansi.video} controls style={{ width: "70%" }} className="my-3">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-auto my-5" style={{ maxWidth: "1100px" }}>
                <div class="card-header bg-warning text-light text-center bg-custom-gradient ">
                    <h4 class="card-title bg-custom-gradient">
                        <i></i> Emoción Soledad
                    </h4>
                </div>
                <div class="card-body py-3" style={{ background: " #f6f8fc" }}  >
                    <div class="row justify-content-center">
                        <div class="col-sm-6">
                            <legend><i class="bi bi-file-earmark-richtext-fill"></i> Información del evento creado</legend>
                            <p><b>Título:</b> {soledad.Tema}</p>
                            <p><b>Descripción:</b> {soledad.descripcion}</p>
                            <button class="btn btn-sm text-light mx-1 bi bi-pencil-square"
                                style={{ background: "#f7b25d" }} onClick={() => navigate(`/EmoEditSoledad/${1}`)}>Modificar</button>
                            <button class="btn btn-sm text-light mx-1 bi bi-sort-up-alt"
                                style={{ background: "#505A6A" }} onClick={() => navigate(`/Soledad`)}>Mostrar lista depresión</button>
                        </div>
                        <div className="col-sm-6">
                            <legend><i className="bi bi-image"></i> Imágen</legend>
                            <video src={soledad.video} controls style={{ width: "70%" }} className="my-3">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
