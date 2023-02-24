import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

export const BannerForm = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [banner, setBanner] = useState([]);
    const token = localStorage.getItem('token');

    const [nombrebanner, setNombre] = useState('');
    const [fotografias, setFotografias] = useState(null);
    const [showAlert, setShowAlert] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(true);
        const data = new FormData();
        data.append('nombrebanner', nombrebanner);
        console.log(fotografias)
        console.log(nombrebanner)
        if (fotografias != null) {
            data.append("fotografias", fotografias);
        }
        console.log(data)
        try {
            const response = await axios.post(
                `https://alphaomegafinal.herokuapp.com/api/alpha/banner/create`,
                data,
                { headers: { 'authorization': token } }
            );
            console.log(response.data.data);
            console.log(response.data.messages)
            setMensaje(response.data.messages)
        } catch (error) {
            console.log(error);
        }
    }


    const getBanner = async () => {
        try {
            const response = await axios.get(
                'https://alphaomegafinal.herokuapp.com/api/alpha/banner-publico/fotos',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data)
            setBanner(response.data.data.banners)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBanner = async (id) => {
        try {
            console.warn(id);
            const confirmation = confirm("Estas seguro que desea eliminar esta imagen")
            if (confirmation) {
                await axios.get(
                    `https://alphaomegafinal.herokuapp.com/api/alpha/banner/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getBanner();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getBanner(); }, [])
    function VerAlert() { window.history.back(); }

    return (
        <>
     
        <div className="panel-body"  >
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='name' className="control-label">Nombre de la imágen: </label>
                                        <input
                                            className="form-control"
                                            id='name'
                                            type="text"
                                            placeholder='Ingresa el nombre de la imágen'
                                            name='name'
                                            value={nombrebanner}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='fotografias' className="control-label">Imágen</label>
                                        <input
                                            id='fotografias'
                                            type="file"
                                            name="avatar"
                                            placeholder='fotografias'
                                            className='form-control'
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => setFotografias(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <p className="text-center">
                        <button type="submit" className="btn text-light btn-raised btn-sm"
                            style={{ background: "#427296", margin: "10px", border: "#427296" }}
                            onMouseEnter={(e) => e.target.style.background = "#2d5b89"}
                            onMouseLeave={(e) => e.target.style.background = "#427296"}>
                            <i className="zmdi zmdi-floppy"></i> Guardar información
                        </button>
                        {showAlert && (
                            <div className="alert-container1">
                                <div className="alert1">
                                    <h5 style={{ color: " #2D4912" }}>
                                        <i class="bi bi-check-circle-fill" style={{ color: " #2D4912", marginRight: "8px" }}></i>
                                        Se guardó correctamente
                                    </h5>
                                    <h2 onClick={VerAlert}
                                        className="btn btn-raised btn-sm"
                                        onMouseEnter={(e) => e.target.style.background = "#CDCDCD"}
                                        onMouseLeave={(e) => e.target.style.background = "#E6E6E6"}
                                        style={{ color: " #2D4912", margin: "15px", border: "1px solid gray" }}>Aceptar</h2>
                                </div>
                            </div>
                        )}
                    </p>
                </form>

                <div class="mx-auto my-5">
                    <div className="my-5">
                        <div className="container-fluid">
                            <div className="panel panel-success ">
                                <div className="panel-heading">
                                    <h3 className="panel-title text-light"
                                        style={{ background: "#f7b25d", margin: "5px" }}>
                                        <i className="bi bi-pencil-square"></i> &nbsp;EDITAR EVENTO
                                    </h3>
                                </div>
                                <div className="panel-body text-center ">
                                    <div className="table-responsive">
                                        <table className="table table-hover text-center ">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" >Identificador</th>
                                                    <th className="text-center w-60">Imágen</th>
                                                    <th className="text-center">Nombre de Imágen</th>
                                                    <th className="text-center">Eliminar</th>
                                                </tr>
                                            </thead>
                                            {
                                                banner.map((banner) => (
                                                    <tbody key={banner.id}>
                                                        <tr>
                                                            <td> <p class="card-title">{banner.id} </p></td>
                                                            <td className="w-auto text-center"><img src={banner.fotografias} alt="" class="banner-img" /> </td>
                                                            <td > <p class="card-title">{banner.nombre} </p> </td>
                                                            <td>
                                                                <button type='button' className='btn btn-danger m-1 bi bi-trash-fill'
                                                                    onClick={() => { deleteBanner(banner.id) }}></button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}
