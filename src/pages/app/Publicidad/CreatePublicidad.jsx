import React from 'react';
import { PublicidadForm } from '../../../components/organisms/PublicidadForm';
import { useNavigate } from "react-router-dom";

export const CreatePublicidad = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVA PUBLICIDAD</h3>
                    </div>
                    <PublicidadForm />
                </div>
            </div>


        </div>
    );
}  