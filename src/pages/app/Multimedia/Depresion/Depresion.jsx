import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export const Depresion = () => {
    const navigate = useNavigate();
    const [depresion, setDepresion] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');


    const getDepresion = async () => {
         setLoading(true);
        try {
            const response = await axios.get(
                'https://alphaofinal.herokuapp.com/api/alpha/musicFour/lista',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data)
            console.log(response.data.data.musics)
            setDepresion(response.data.data.musics)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteDepresion = async (id) => {
        try {
            console.warn(id);

            const confirmation = confirm("Estas seguro que desea eliminar esta imagen")
            if (confirmation) {
                await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/musicFour/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getDepresion();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getDepresion(); }, [])

    return (
        <>
            <section class="py-2" style={{ background: " #E2E2E2" }}>
                <div class="gx-lg-4 py-3 container" >
                    <div className="center-div1 ">
                        <h1 id="publicidad">Lista de repoducción Depresión</h1>
                        <p class="">Esta es una lista de música de la categoría de depresión. La Escuela de Biodanza puede agregar, modificar o eliminar canciones en esta sección según las actualizaciones necesarias.</p>
                        <Link class="btn btn-sm text-light bi bi-plus" style={{ background: "#427296", margin: "10px" }} to="/CreateDepresion">Crear Musica</Link>

                        {loading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <p>Cargando....</p>
                            </div>
                        ) : (
                            depresion.map((depresion) => (
                                <div key={depresion.id} className="parent-div center-div">
                                    <div class="card bg-litle row gx-6 py-3 mr-5"
                                        style={{ width: '95%', height: '30%', display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
                                        <img src={depresion.imagen} class="img-fluid" style={{ width: '30%' }} alt="Image" />
                                        <div class="card-body" style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h5 class="text-center text-uppercase " style={{ color: "#CA8725" }}>{depresion.tema}</h5>
                                            <p class="card-text"><b>Genero: </b>{depresion.genero}</p>
                                            <p class="card-text"><b>Descripción: </b>{depresion.descripcion} </p>
                                            <p class="card-text"><b>Duración: </b>{depresion.duracion} .</p>
                                            <audio controls autoplay loop muted>
                                                <source src={depresion.audio} />
                                            </audio>
                                            <br />
                                            <div class="card-footer">
                                                <butoon class="btn btn-sm text-light  m-1 bi bi-pencil-square"
                                                        style={{ background: "#f7b25d" }} onClick={() => navigate(`/EditDepresion/${depresion.id}`)}>Modificar</butoon>
                                                <button type='button' className='btn btn-sm btn-danger m-1 bi bi-trash-fill'
                                                    onClick={() => { deleteDepresion(depresion.id) }}> Eliminar </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>)
};