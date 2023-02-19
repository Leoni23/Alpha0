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

    const [name, setName] = useState('');
    const [fotografias, setFotografias] = useState(null);




    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nombre', name);
        console.log(fotografias)
        console.log(name)
        if (fotografias != null) {
            data.append("fotografias", fotografias);
        }
        console.log(data)

        try {


            const response = await axios.post(
                `https://alphaofinal.herokuapp.com/api/alpha/banner/create`,
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
                'https://alphaofinal.herokuapp.com/api/alpha/banner-publico/fotos',
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
                    `https://alphaofinal.herokuapp.com/api/alpha/banner/${id}/destroy`,
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


    





    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="form-group label-floating">
                                            <label htmlFor='name' className="control-label">Nombre *</label>
                                            <input
                                                className="form-control"
                                                id='name'
                                                type="text"
                                                placeholder='Ingresa el Tema'
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='fotografias' className="control-label">Imagen *</label>
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
                        <button type="submit" className="btn btn-info btn-raised btn-sm" >
                            <i className="zmdi zmdi-floppy"></i> GUARDAR

                        </button>
                    </p>
                </form>

                <div class="mx-auto my-5">
                <div className="my-5">
                    <div className="container-fluid">
                        <div className="panel panel-success ">
                            <div className="panel-heading" style={{ background: "#FFB842" }}>
                                <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; Imagenes del Banner </h3>
                            </div>
                            <div className="panel-body text-center ">
                                <div className="table-responsive">
                                    <table className="table table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">Imagen</th>
                                                <th className="text-center">name</th>
                                                <th className="text-center">Eliminar</th>
                                            </tr>
                                        </thead>
                                        {
                                            banner.map((banner) => (
                                                <tbody key={banner.id}>
                                                    <tr>
                                                        <td> <p class="card-title">{banner.id} </p></td>
                                                        <td><img src={banner.fotografias} alt="" class="w-50" /> </td>
                                                        <td > <p class="card-title">{banner.name} </p> </td>
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
