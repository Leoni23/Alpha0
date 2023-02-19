import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContactForm } from '../../components/organisms/ContactForm';


export const EditContact = () =>{
    const { id } = useParams();
    const [contact, setContact] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getContact = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/contactos/${id}`,
                    { headers: { 'authorization': token } }
                    );
                const contactanos = {...response.data.data.contactanos, id}
                console.log(response.data.data);
                setContact(response.data.data.contactanos)
               
                console.log(contactanos);
            } catch (error) {
                console.log(error);
            }
        }
        getContact();
    }, [])

    console.log(contact)
    return (
		<>
            

			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
                    <i className="bi bi-file-earmark-richtext-fill"></i> Edicion{" "}
						<small>DE MULTIMEddDIA IRA</small>
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
                Object.keys(contact).length > 0 ?
                    (
                        <ContactForm contact={contact} />
                    )
                    :
                    (
                        <p className="">No hay datos del MUSICA</p>
                    )
            }
		</>
	);

}