import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export const Coment = () => {
    const navigate = useNavigate();
    const [coment, setComent] = useState([]);
    const token = localStorage.getItem('token');

    /* APIS DE CONTACTANOS */
    const getComent = async () => {
        try {
            const response = await axios.get(
                'https://alphaofinal.herokuapp.com/api/alpha/comments/vercomment',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.comments)
            setComent(response.data.data.comments)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getComent(); }, [])

    
    const deleteComent = async (id) => {
        try {
            console.warn(id);
            // eslint-disable-next-line no-restricted-globals
            const confirmation = confirm("Are you sure?")
            if (confirmation) {
                const response = await axios.get(
                    `https://alphaofinal.herokuapp.com/api/alpha/comments/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                console.log(response)
                await getComent();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
   

    return (
        <>

           
               
                <div>
                    <div className="container-fluid">
                        <div className="panel panel-success "> <br />
                            <div>
                                <div className="container-fluid">
                                    <div className="panel panel-success ">
                                        <div className="panel-heading" style={{ background: "#FFB842" }}>
                                            <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; Imagenes del coment </h3>
                                        </div>
                                        <div className="panel-body text-center ">
                                            <div className="table-responsive">
                                                <table className="table table-hover text-center">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">#</th>
                                                            <th className="text-center">Comentario</th>
                                                            <th className="text-center">Calificacion</th>
                                                            <th className="text-center">Nombre de Usuario</th>
                                                            <th className="text-center">Eliminar</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        coment.map((coment) => (
                                                            <tbody key={coment.id}>
                                                                <tr>
                                                                    <td> <p class="card-title">{coment.id} </p></td>
                                                                    <td > <p class="card-title">{coment.comentario} </p> </td>
                                                                    <td> <p class="card-title">{coment.calificacion} </p></td>
                                                                    <td> <p class="card-title">{coment.creadoby.username} </p></td>

                                                                    <td>
                                                                        <button type='button' className='btn btn-danger m-1 bi bi-trash-fill'
                                                                            onClick={() => { deleteComent(coment.id) }}></button>
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
                </div>
            
        </>)

};