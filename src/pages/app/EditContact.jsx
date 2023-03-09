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
                    `https://alphaofin.herokuapp.com/api/alpha/contactos/${id}`,
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
            <div style={{ margin: "12px" }}>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h1 id="publicidad">Contactos</h1>
                            <h3 className="panel-title text-light"
                                style={{ background: "#f7b25d", margin: "5px" }}>
                                <i className="bi bi-pencil-square"></i> &nbsp; EDITAR CONTACTOS
                            </h3>
                        </div>
                    </div>
                </div>
                {/* COPIAR LOGICA */}
                <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                    &nbsp; &nbsp; Para modificar un contacto de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                <hr className='mt-3' />
                {
                    Object.keys(contact).length > 0 ?
                        (<ContactForm contact={contact} />) :
                        (<p className="">&nbsp; &nbsp;Esperando datos de la música...</p>)
                }
            </div>
        </>
    );

}