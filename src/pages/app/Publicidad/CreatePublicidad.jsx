import React from 'react';
import { PublicidadForm } from '../../../components/organisms/PublicidadForm';
import { useNavigate } from "react-router-dom";

export const CreatePublicidad = () => {
    return (
        <div style={{ margin: "12px" }} >
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h1 id="publicidad">Publicidad</h1>
                        <h3 className="panel-title text-light"
                            style={{ background: "#427296", margin: "5px" }}>
                            <i className="zmdi zmdi-plus"></i>&nbsp;CREAR PUBLICIDAD</h3>
                        <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                            &nbsp;  Para crear una nueva publicidad
                            es necesario y se requiere proporcionar la siguiente información:</legend>
                        <hr className='mt-3' />
                    </div>
                    <PublicidadForm />
                </div>
            </div>
        </div>
    );
}  