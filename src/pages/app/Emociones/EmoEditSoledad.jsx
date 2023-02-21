import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ESoledadForm } from '../../../components/organisms/Emociones/ESoledadForm';


export const EmoEditSoledad = () =>{
    const { id } = useParams();
    const [soledad, setSoledad] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getSoledad = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/soledad/${1}`,
                    { headers: { 'authorization': token } }
                    );
                const musicsOnes = {...response.data.data.iras, id }
                console.log(response.data.data);
                setSoledad(response.data.data.iras)
               
                console.log(musicsOnes);
            } catch (error) {
                console.log(error);
            }
        }
        getSoledad();
    }, [])

    
    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Módulo de Emociones</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR EMOCION SOLEDAD
                            </h3>
                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar una emoción de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(soledad).length > 0 ?
                        (<ESoledadForm soledad={soledad} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la emoción soledad...</p>)
                }
            </div>
        </>
    );

}