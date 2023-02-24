import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AnsiedadForm } from '../../../../components/organisms/Multimedia/AnsiedadForm';


export const EditAnsiedad = () => {
    const { id } = useParams();
    const [ansiedad, setAnsiedad] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAnsiedad = async () => {
            try {
                const response = await axios.get(
                    `https://alphaomegafinal.herokuapp.com/api/alpha/musicFive/${id}`,
                    { headers: { 'authorization': token } }
                );
                const musicFive = { ...response.data.data.musicsFive, id }
                console.log(response.data.data);
                setAnsiedad(response.data.data.musicsFive)

                console.log(musicFive);

            } catch (error) {
                console.log(error);
            }
        }
        getAnsiedad();
    }, [])

    console.log(ansiedad)
    return (
        <>


            {/* <div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
                    <i className="bi bi-file-earmark-richtext-fill"></i> Edicion{" "}
						<small>DE MULTIMEDIA ansiedad</small>
					</h1>
				</div>
				<p className="lead">
					aqui se va poder modificar la info de musica
				</p>
			</div> */}
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                        <h1 id="publicidad">Lista de repoducción Ansiedad</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR MUSICA
                            </h3>                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar una música de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(ansiedad).length > 0 ?
                        (<AnsiedadForm ansiedad={ansiedad} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );
}