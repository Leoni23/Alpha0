import React from 'react';
import { ContactForm } from '../../components/organisms/ContactForm';
import { useNavigate } from "react-router-dom";

export const CreateContact = () => {
    return (
        <div style={{ margin: "12px" }} >
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h1 id="publicidad">Contactos</h1>
                        <h3 className="panel-title text-light"
                            style={{ background: "#427296", margin: "5px" }}>
                            <i class="text-light bi bi-plus"></i>&nbsp;CREAR CONTACTO</h3>
                        <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                            &nbsp;  Para crear un nuevo contacto,
                            es necesario y se requiere proporcionar la siguiente información:</legend>
                        <hr className='mt-3' />
                    </div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
} 