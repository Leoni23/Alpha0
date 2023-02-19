import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DepresionForm } from '../../../../components/organisms/Multimedia/DepresionForm';


export const EditDepresion = () =>{
    const { id } = useParams();
    const [depresion, setDepresion] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getDepresion = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/musicFour/${id}`,
                    { headers: { 'authorization': token } }
                    );
                const musicsFour = {...response.data.data.musicsFour, id }
                console.log(response.data.data);
                setDepresion(response.data.data.musicsFour)
               
                console.log(musicsFour);
            } catch (error) {
                console.log(error);
            }
        }
        getDepresion();
    }, [])

    console.log(depresion)
    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Lista de repoducción Depresión</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR MUSICA
                            </h3>
                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar una música de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(depresion).length > 0 ?
                        (<DepresionForm depresion={depresion} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );
}