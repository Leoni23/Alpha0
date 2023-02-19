import React from 'react';
import { DepresionForm } from '../../../../components/organisms/Multimedia/DepresionForm';
import { useNavigate } from "react-router-dom";

export const CreateDepresion = () => {
    return (
        <div style={{ margin: "12px" }} >
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h1 id="publicidad">Lista de repoducción Depresión</h1>
                        <h3 className="panel-title text-light"
                            style={{ background: "#427296", margin: "5px" }}>
                            <i class="bi bi-file-earmark-music"></i>&nbsp;CREAR MUSICA</h3>
                        <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                            &nbsp;  Para crear una nueva lista de reproducción en la emoción depresión,
                            es necesario y se requiere proporcionar la siguiente información:</legend>
                        <hr className='mt-3' />
                    </div>
                    <DepresionForm />
                </div>
            </div>
        </div>
    );
}  