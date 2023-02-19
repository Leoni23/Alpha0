import React from 'react';
import { SoledadForm } from '../../../../components/organisms/Multimedia/SoledadForm';
import { useNavigate } from "react-router-dom";

export const CreateSoledad = () => {
    return (
        <div style={{ margin: "12px" }} >
        <div className="container-fluid">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h1 id="publicidad">Lista de repoducción Soledad</h1>
                    <h3 className="panel-title text-light"
                        style={{ background: "#427296", margin: "5px" }}>
                        <i class="bi bi-file-earmark-music"></i>&nbsp;CREAR MUSICA</h3>
                    <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                        &nbsp;  Para crear una nueva lista de reproducción en la emoción soledad,
                        es necesario y se requiere proporcionar la siguiente información:</legend>
                    <hr className='mt-3' />
                </div>

                <SoledadForm />
            </div>
        </div>
    </div>
    );
}  