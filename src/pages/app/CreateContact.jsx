import React from 'react';
import { ContactForm } from '../../components/organisms/ContactForm';
import { useNavigate } from "react-router-dom";

export const CreateContact = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVO CONTACTO</h3>
                    </div>
                    <ContactForm />
                </div>
            </div>


        </div>
    );
} 