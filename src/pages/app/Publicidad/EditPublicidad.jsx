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
                    `https://alphaofinal.herokuapp.com/api/alpha/publicidad/${id}`,
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
            

			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
                    <i className="bi bi-file-earmark-richtext-fill"></i> Edicion{" "}
						<small>DE MULTIMEDIA</small>
					</h1>
				</div>
				<p className="lead">
					aqui se va poder modificar la info de musica
				</p>
			</div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR MUSICA</h3>
                    </div>
                   
                </div>
            </div>
            {/* COPIAR LOGICA */}
            <h1 className='font-black text-4xl text-sky-900'>Reporte</h1>
            <hr className='mt-3' />
            {
                Object.keys(publi).length > 0 ?
                    (
                        <PublicidadForm publi={publi} />
                    )
                    :
                    (
                        <p className="">No hay datos del MUSICA</p>
                    )
            }
		</>
	);

}