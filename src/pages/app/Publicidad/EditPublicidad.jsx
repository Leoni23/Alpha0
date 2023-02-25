import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PublicidadForm } from '../../../components/organisms/PublicidadForm';


export const EditPublicidad = () =>{
    const { id } = useParams();
    const [publi, setPublicidad] = useState({});
  
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getPublicidad = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/publicidad/${id}`,
                    { headers: { 'authorization': token } }
                    );
                const publ = {...response.data.data.publ, id }
                console.log(response.data.data);
                setPublicidad(response.data.data.publ)
               
                console.log(publ);
            } catch (error) {
                console.log(error);
            }
        }
        getPublicidad();
    }, [])

    console.log(publi)
    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Publicidad</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR PUBLICIDAD
                            </h3>
                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar una publicidad de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(publi).length > 0 ?
                        (<PublicidadForm publi={publi} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );

}