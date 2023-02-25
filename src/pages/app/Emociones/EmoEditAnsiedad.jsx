import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { EAnsiedadForm } from '../../../components/organisms/Emociones/EAnsiedadForm';


export const EmoEditAnsiedad = () =>{
    const { id } = useParams();
    const [ansiedad, setAnsiedad] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAnsiedad = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/ansiedad/${1}`,
                    { headers: { 'authorization': token } }
                    );
                const musicsOnes = {...response.data.data.iras, id }
                console.log(response.data.data);
                setAnsiedad(response.data.data.iras)
               
                console.log(musicsOnes);
            } catch (error) {
                console.log(error);
            }
        }
        getAnsiedad();
    }, [])

    console.log(ansiedad)
    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Módulo de Emociones</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR EMOCION ANSIEDAD
                            </h3>
                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar una emoción de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(ansiedad).length > 0 ?
                        (<EAnsiedadForm ansiedad={ansiedad} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la emoción ansiedad...</p>)
                }
            </div>
        </>
    );

}