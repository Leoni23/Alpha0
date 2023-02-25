import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowReserva = () => {
    const { id } = useParams();
    const [report, setReport] = useState({});

    const [reserva, setReserva] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/events/evento-get/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );

                const user = { ...response.data.data.eventos, id };

                const user1 = response.data.data.reservaciones;
                setReport(user);
                setReserva(user1)
            } catch (error) {
                console.log(error);
            }
        };
        getReport();
    }, []);



    return (

        <div className="container-fluid" >
            <div className="panel panel-info" style={{  marginRight:"20px", marginLeft: "13px" }}>
                <div className="panel-heading">
                    <h3 className="panel-title text-light"
                        style={{ background: "#505A6A", margin: "5px" }}>
                        <i className="bi bi-sort-up-alt"></i> &nbsp; MAS INFORMACION DEL EVENTO</h3>
                    <legend style={{ fontSize: "20px", color: " #548cb6" }} >
                        &nbsp;En esta sección, podrás obtener una visión detallada sobre el evento, incluyendo su temática y los participantes inscritos:</legend>
                    <hr className='mt-3' />
                </div>
                <div className="py-3 panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <legend >
                                <i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Inaformación del evento creado
                            </legend>
                            <p className="font-weight-bold">
                                <b>Título: </b>{" "}
                                <span className="font-weight-normal">{report.titulo}</span>
                            </p>
                            <p className="font-weight-bold">
                                <b> Descripción: </b>{" "}
                                <span className="font-weight-normal">{report.descripcion}</span>
                            </p>
                            <p className="font-weight-bold">
                                <b> Fecha: </b> {" "}
                                <span className="font-weight-normal">{report.evento}</span>
                            </p>
                            <p className="font-weight-bold">
                                <b>Número de cupos disponibles:</b> {" "}
                                <span className="font-weight-normal">{report.cupos}</span>
                            </p>
                            <p className="font-weight-bold">
                                <b>Contacto:</b> {" "}
                                <span className="font-weight-normal">{report.contacto}</span>
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <legend >
                                <i className="bi bi-image"></i> &nbsp; Imágen
                            </legend>
                            <img src={report.imagen} alt="avatar" style={{ width: '45%' }} className="col-xs-12 h-30 w-30 rounded img-thumbnail" />
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="panel-body">
                        <legend><i className="bi bi-people-fill"></i> &nbsp; Información de los usuarios inscritos</legend>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Usuario</th>
                                        <th>Nombre y Apellido</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reserva.map((items, i) => {
                                        return (
                                            <tr key={items.id}>
                                                <td>{i + 1}</td>
                                                <td>{items.creadoby.username}</td>
                                                <td>{items.creadoby.first_name} {items.creadoby.last_name}</td>
                                                <td>{items.creadoby.email}</td>
                                                <td>{items.creadoby.personal_phone}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <br />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
