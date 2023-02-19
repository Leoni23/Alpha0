import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MiedoForm } from '../../../../components/organisms/Multimedia/MiedoForm';


export const EditMiedo = () =>{
    const { id } = useParams();
    const [miedo, setMiedo] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getMiedo = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/musicThree/${id}`,
                    { headers: { 'authorization': token } }
                    );
                    
                const musicThree = {...response.data.data.musicsThree, id }
                console.log(response.data.data);
                setMiedo(response.data.data.musicsThree)
               
                console.log(musicThree);
            } catch (error) {
                console.log(error);
            }
        }
        getMiedo();
    }, [])

    console.log(miedo)
   
    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Lista de repoducción Miedo</h1>
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
                    Object.keys(miedo).length > 0 ?
                        (<MiedoForm miedo={miedo} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );

}