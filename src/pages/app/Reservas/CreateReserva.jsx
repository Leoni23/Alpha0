import React from 'react';
import { ReservaForm } from '../../../components/organisms/ReservaForm';
import { useNavigate } from "react-router-dom";

export const CreateReserva = () => {
    return (
        <div style={{ margin: "12px" }} >
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title text-light"  
                        style={{ background: "#427296", margin: "5px" }}>
                            <i className="zmdi zmdi-plus"></i> &nbsp; CREAR NUEVO EVENTO</h3>
                            <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                            &nbsp;  Para crear un evento de la Escuela de Biodanza, se requiere la siguiente información:</legend>
                            <hr className='mt-3' />
                    </div>
                    
                    <ReservaForm />
                </div>
            </div>
        </div>
    );
}  