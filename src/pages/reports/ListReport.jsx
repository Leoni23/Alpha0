import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListReport = () => {

    const navigate = useNavigate();
    const [report, setReport] = useState([]);
    const token = localStorage.getItem('token');


    const getReport = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/v1/reporte',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setReport(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteReport = async (id) => {
        try {
            console.warn(id);
            // eslint-disable-next-line no-restricted-globals
            const confirmation = confirm("Are you sure?")
            if (confirmation) {
                await axios.get(
                    `http://127.0.0.1:8000/api/v1/reporte/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getReport();
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getReport();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-success ">
                    <div className="panel-heading bg-success">
                        <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE REPORTES</h3>
                    </div>
                    <div className="panel-body text-center ">
                        <div className='row justify-content-center'>
                            <div className="card col-lg-3  col-sm-8 col-xs-12 m-4">
                                <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone" />
                                <div className="card-body">
                                    <h5 clclassNameass="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="/Dashboard/report/show" className="btn btn-warning m-1">
                                        <i className="bi bi-file-earmark-richtext-fill"></i>
                                    </Link>
                                    <Link to="/Dashboard/report/edit" className="btn btn-info m-1">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <button type="submit" className="btn btn-danger m-1">
                                        <i className="bi bi-trash-fill"></i> 
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Titulo</th>
                                        <th className="text-center">Descripcion</th>
                                        <th className="text-center">Imagen</th>
                                        <th className="text-center">Mostrar</th>
                                        <th className="text-center">Editar</th>
                                        <th className="text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>0976541234</td>
                                        <td>Nombres</td>
                                        <td>Apellidos</td>
                                        <td>
                                            <Link to="/Dashboard/report/show" className="btn btn-warning btn-raised btn-xs">
                                                <i className="bi bi-file-earmark-person-fill"></i>
                                            </Link>
                                        </td>
                                        <td>
                                            {/* Agregar :id en la ruta */}
                                            <Link to="/Dashboard/report/edit" className="btn btn-info btn-raised btn-xs">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                        </td>
                                        <td>
                                            <form>
                                                <button type="submit" className="btn btn-danger btn-raised btn-xs">
                                                    <i className="bi bi-person-check-fill"></i>
                                                    <i className="bi bi-person-x-fill"></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav className="text-center">
                            <ul className="pagination pagination-sm">
                                <li className="disabled"><a href="javascript:void(0)">«</a></li>
                                <li className="active"><a href="javascript:void(0)">1</a></li>
                                <li><a href="javascript:void(0)">2</a></li>
                                <li><a href="javascript:void(0)">3</a></li>
                                <li><a href="javascript:void(0)">4</a></li>
                                <li><a href="javascript:void(0)">5</a></li>
                                <li><a href="javascript:void(0)">»</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* LIST VIEJO COPIAR LA FUNCIONALIDAD */}
            <h1 className='font-black text-4xl text-sky-900'>Reporte</h1>
            <hr className='mt-3' />
            <p className='mt-3'>List of created report</p>

            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-sky-900 text-white'>
                    <tr>
                        <th className='p-2'>#</th>
                        <th className='p-2'>Title</th>
                        <th className='p-2'>Description</th>
                        <th className='p-2'>Image</th>
                        <th className='p-2'>State</th>
                        <td className='p-2'></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        report.map((report, index) => (
                            <tr key={report.id} className="border-b hover:bg-gray-100">
                                <td className='p-3'>{++index}</td>
                                <td className='p-3'>{report.title}</td>
                                <td className='p-3'>{report.desciption}</td>
                                <td className='p-3'>{report.image}</td>
                                <td className='p-3'>{report.state ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-900 font-bold">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-900 font-bold">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                }</td>
                                <td className='p-3'>
                                    <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                                        onClick={() => navigate(`/report/show/${report.id}`)}>Show</button>
                                    <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                                        onClick={() => navigate(`/report/edit/${report.id}`)}>Edit</button>

                                    <button type='button' className={`${report.state ? 'bg-red-800' : 'bg-green-800 '} block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                                        onClick={() => {
                                            deleteReport
                                                (report.id)
                                        }}>{report.state ? 'Inactive' : 'Active'}</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
