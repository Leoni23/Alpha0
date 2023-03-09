import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export const Ansiedad = () => {
    const navigate = useNavigate();
    const [ansiedad, setAnsiedad] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');


    const getAnsiedad = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/musicFive/lista',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data)
            console.log(response.data.data.musics)
            setAnsiedad(response.data.data.musics)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAnsiedad = async (id) => {
        try {
            console.warn(id);

            const confirmation = confirm("Estas seguro que desea eliminar este audio")
            if (confirmation) {
                await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/musicFive/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getAnsiedad();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getAnsiedad(); }, [])

    return (
        <>
            <section class="py-2" style={{ background: "#E2E2E2" }}>
                <div class="gx-lg-4 py-3 container">
                    <div className="center-div1">
                        <h1 id="publicidad">Lista de repoducción Ansiedad</h1>
                        <p>
                            Esta es una lista de música de la categoría de ansiedad. La Escuela
                            de Biodanza puede agregar, modificar o eliminar canciones en esta
                            sección según las actualizaciones necesarias.
                        </p>
                        <Link class="btn btn-sm text-light bi bi-plus" style={{ background: "#427296", margin: "10px" }} to="/CreateAnsiedad"> Crear Musica  </Link>
                        {loading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <p>Cargando....</p>
                            </div>
                        ) : (
                            ansiedad.map((ansiedad) => (
                                <div key={ansiedad.id} className="parent-div center-div">
                                    <div class="card bg-litle row gx-6 py-3 mr-5" style={{width: "95%", height: "30%", display: "flex",flexDirection: "row", }} >
                                        <img src={ansiedad.imagen} class="img-fluid" style={{ width: "25%" }} alt="Image"/>
                                        <div class="card-body" style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",}} >
                                            <h5 class="text-center text-uppercase " style={{ color: "#CA8725" }} > {ansiedad.tema} </h5>
                                            <p class="card-text"> <b>Genero: </b> {ansiedad.genero} </p>
                                            <p class="card-text"> <b>Descripción: </b> {ansiedad.descripcion}{" "} </p>
                                            <p class="card-text"> <b>Duración: </b> {ansiedad.duracion} </p>
                                            <audio controls autoplay loop muted> 
                                                <source src={ansiedad.audio} />
                                            </audio>
                                            <br />
                                            <div class="card-footer">
                                                <butoon class="btn btn-sm text-light  m-1 bi bi-pencil-square"
                                                        style={{ background: "#f7b25d" }} onClick={() => navigate(`/EditAnsiedad/${ansiedad.id}`)}>Modificar</butoon>
                                                <button type='button' className='btn btn-sm btn-danger m-1 bi bi-trash-fill' onClick={() => { deleteAnsiedad(ansiedad.id) }}> Eliminar </button>
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