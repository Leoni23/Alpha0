import React from 'react';
import { BannerForm } from '../../../components/organisms/BannerForm';
import { useNavigate } from "react-router-dom";

export const CreateBanner = () => {
    return (
        <div style={{ margin: "12px" }} >
            <div className="container-fluid" tyle={{ background: " #E2E2E2" }} >
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h1 id="publicidad">Carrusel de Imágenes</h1>
                        <h3 className="panel-title text-light"
                            style={{ background: "#427296", margin: "5px" }}>
                            <i class="bi bi-plus-lg"></i>&nbsp;CREAR CARRUSEL DE IMÁGENES</h3>
                        <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                            &nbsp;  Para agregar una nueva imagen al carrusel, se requiere proporcionar la siguiente información:</legend>
                        <hr className='mt-3' />
                    </div>
                    <BannerForm />
                </div>
            </div>
        </div>
    );
}
