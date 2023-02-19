import React from 'react';
import { BannerForm } from '../../../components/organisms/BannerForm';
import { useNavigate } from "react-router-dom";

export const CreateBanner = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVA MUSICA</h3>
                    </div>
                    <BannerForm />
                </div>
            </div>


        </div>
    );
}