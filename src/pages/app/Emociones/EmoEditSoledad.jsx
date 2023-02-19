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

    console.log(soledad)
    return (
		<>
            

			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
                    <i className="bi bi-file-earmark-richtext-fill"></i> Edicion{" "}
						<small>DE MIEdDO</small>
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
                Object.keys(soledad).length > 0 ?
                    (
                        <ESoledadForm soledad={soledad} />
                    )
                    :
                    (
                        <p className="">No hay datos del MUSICA</p>
                    )
            }
		</>
	);

}