import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IraForm } from '../../../../components/organisms/Multimedia/IraForm';


export const EditIra = () => {
    const { id } = useParams();
    const [ira, setIra] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getIra = async () => {
            try {
                const response = await axios.get(
                    `https://alphaomegafinal.herokuapp.com/api/alpha/musicOne/${id}`,
                    { headers: { 'authorization': token } }
                );
                const musicsOnes = { ...response.data.data.musicsOne, id }
                console.log(response.data);
                setIra(response.data.data.musicsOne)


            } catch (error) {
                console.log(error);
            }
        }
        getIra();
    }, [])


    return (
        <>
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Lista de repoducción Ira</h1>
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
                    Object.keys(ira).length > 0 ?
                        (<IraForm ira={ira} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );
}