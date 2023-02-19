import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ReportForm = ({ report }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        first_name: report?.first_name ?? "",
        last_name: report?.last_name ?? "",
        username: report?.username ?? "",
        email: report?.email ?? "",
        personal_phone: report?.personal_phone ?? "",
        home_phone: report?.home_phone ?? "",
        address: report?.address ?? ""
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(form).includes("")) {
            console.log("error");
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
            return;
        }

        try {
            console.log(report)
            if (report?.id) {
                await axios.post(
                    `http://127.0.0.1:8000/api/v1/reporte/${report.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `http://127.0.0.1:8000/api/v1/reporte/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/report');

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="panel-body">
                <form>
                    <fieldset className='col-xs-12 col-sm-6'>
                        <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del reporte</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Titulo *</label>
                                        <input pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}" className="form-control" type="text" name="titulo-reg" required="" L="30" />
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Descripcion *</label>
                                        <textarea pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}" className="form-control"  name="descripcion-reg" required="" L="30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className='col-xs-12 col-sm-6'>
                        <legend><i className="zmdi zmdi-attachment-alt"></i> &nbsp; Imágen </legend>
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label className="control-label">Imágen</label>
                                <input type="file" name="imagen-up" className='form-control' accept=".jpg, .png, .jpeg" />
                                <span><smallspan>Tamaño máximo de los archivos adjuntos 5MB. Tipos de archivos permitidos imágenes: PNG, JPEG y JPG</smallspan></span>
                            </div>
                        </div>
                    </fieldset>
                    <p className="text-center">
                        <button type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> Guardar</button>
                    </p>
                </form>
            </div>

        </>

    )
}
