import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { EDepresionForm } from '../../../components/organisms/Emociones/EDepresionForm';


export const EmoEditDepresion = () => {
    const { id } = useParams();
    const [depresion, setDepresion] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getDepresion = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/depresion/${1}`,
                    { headers: { 'authorization': token } }
                );
                const musicsOnes = { ...response.data.data.iras, id }
                console.log(response.data.data);
                setDepresion(response.data.data.iras)

                console.log(musicsOnes);
            } catch (error) {
                console.log(error);
            }
        }
        getDepresion();
    }, [])

    console.log(depresion)
    return (
        <>


            <div className="container-fluid">
                <div className="page-header">
                    <h1 className="text-titles">
                        <br />
                        <i className="bi bi-file-earmark-richtext-fill"></i> Edición de la emoción miedo  {" "}
                    </h1>
                </div>
                <p className="lead">
                    En esta sección se puede modificar la emoción miedo
                </p>
            </div>

            {/* COPIAR LOGICA */}

            <hr className='mt-3' />
            {
                Object.keys(depresion).length > 0 ?
                    (<EDepresionForm depresion={depresion} />) :
                    (<p className="">No hay datos del MUSICA</p>)
            }
        </>
    );

}