import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export const Publicidad = () => {
    const navigate = useNavigate();
    const [publicidad, setPublicidad] = useState([]);
    const token = localStorage.getItem('token');


    const getPublicidad = async () => {
        try {
            const response = await axios.get(
                'https://alphaofinal.herokuapp.com/api/alpha/publicidad/publ',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data)
            console.log(response.data.data.publ)
            setPublicidad(response.data.data.publ)
        } catch (error) {
            console.log(error);
        }
    }

    const deletePublicidad = async (id) => {
        try {
            console.warn(id);

            const confirmation = confirm("Estas seguro que desea eliminar permanentamente la publidad ")
            if (confirmation) {
                await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/publicidad/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getPublicidad();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getPublicidad(); }, [])

    return (
        <>
            <section class="py-2" style={{ background: " #E2E2E2" }}>
                <div class="gx-lg-4 py-3 container" >
                    <h1 id="publicidad">Publicidad</h1>

                    <p>En esta sección sse presenta la publicidad de la escuela de la Biodanza, podrás crear una nueva publicidad para presentar a nuestros clientes, elimina y modifica la publicidad según lo requerido </p>
                    <Link id="crearPubli" class="btn btn-primary btn-sm text-light my-2 mr-3 " to="/CreatePublicidad">Crear publicidad</Link>
                    {
                        publicidad.map((publicidad) => (
                            <div className="parent-div center-div">
                                <div class="card bg-litle row gx-6 py-3 mr-5"
                                    style={{ width: '80%', height: '30%', display: 'flex', flexDirection: 'row' }}>
                                    <img src={publicidad.imagen} class="img-fluid" style={{ width: '25%', height: '2%' }} alt="Image" />
                                    <div class="card-body" style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <h5 class="text-center text-uppercase " style={{ color: "#CA8725" }}>{publicidad.titulo}</h5>
                                        <p class="card-text " style={{ width: '90%' }}><b>Descripción: </b>{publicidad.descripcion} </p>
                                        <p class="card-text" ><b>Fecha: </b>{publicidad.evento} </p>
                                        <div class="card-footer" style={{ width: '30%', height: '20%' }}>
                                            <butoon class="btn btn-primary btn-sm text-light" onClick={() => navigate(`/EditPublicidad/${publicidad.id}`)}>Modificar</butoon>
                                            <button type='button' className='btn btn-danger m-1 bi bi-trash-fill'
                                                onClick={() => { deletePublicidad(publicidad.id) }}> Eliminar </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>


            </section>
        </>)
};