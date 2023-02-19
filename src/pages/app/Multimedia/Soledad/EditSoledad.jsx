import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SoledadForm } from '../../../../components/organisms/Multimedia/SoledadForm';


export const EditSoledad = () =>{
    const { id } = useParams();
    const [soledad, setSoledad] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getSoledad = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/musicTwo/${id}`,
                    { headers: { 'authorization': token } }
                    );
                const musicTwo = {...response.data.data.musicsTwo, id }
                 console.log(response.data.data);
                setSoledad(response.data.data.musicsTwo)
               
                console.log(musicTwo);
                
            } catch (error) {
                console.log(error);
            }
        }
        getSoledad();
    }, [])

    console.log(soledad)
    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Lista de repoducción Soledad</h1>
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
                    Object.keys(soledad).length > 0 ?
                        (<SoledadForm soledad={soledad} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );

}