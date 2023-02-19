import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/reporte/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user = { ...response.data.data.user, id };
                setReport(user);
            } catch (error) {
                console.log(error);
            }
        };
        getReport();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE REPORTE
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del reporte</legend>
                                <p className="">
                                    <span className="">
                                        * First Name:{" "}
                                    </span>
                                    {report.first_name}
                                </p>
                                <p className="">
                                    <span className="">
                                        * Last Name:{" "}
                                    </span>
                                    {report.last_name}
                                </p>
                                <p className="">
                                    <span className="">
                                        * Email:{" "}
                                    </span>
                                    {report.email}
                                </p>
                                <p className="">
                                    <span className="">
                                        * Phone Number:{" "}
                                    </span>
                                    {report.phone_number}
                                </p>
                                <p className="">
                                    <span className="">
                                        * State:{" "}
                                    </span>
                                    {report.state ? "Active" : "Inactive"}
                                </p>
                                <p className="">
                                    <span className="">
                                        * Birthdate:{" "}
                                    </span>
                                    {report.birthdate ? report.birthdate : "N/A"}
                                </p>
                                <p className="">
                                    <span className="">
                                        * Home phone number:{" "}
                                    </span>
                                    {report.home_phone_number
                                        ? report.home_phone_number
                                        : "N/A"}
                                </p>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <legend><i className="zmdi zmdi-attachment-alt"></i> &nbsp; Imágen </legend>
                                <img src={report.avatar} alt="avatar" style={{ width: '10px' }} className=" col-xs-12 h-80 w-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="font-black text-4xl text-sky-900">Reporte</h1>
            <hr className="mt-3" />
            <p className="mt-3">Reporte details</p>
            {Object.keys(report).length > 0 ? (
                <div className="m-5 flex justify-between">
                    <div>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * First Name:{" "}
                            </span>
                            {report.first_name}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Last Name:{" "}
                            </span>
                            {report.last_name}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Email:{" "}
                            </span>
                            {report.email}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Phone Number:{" "}
                            </span>
                            {report.phone_number}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * State:{" "}
                            </span>
                            {report.state ? "Active" : "Inactive"}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Birthdate:{" "}
                            </span>
                            {report.birthdate ? report.birthdate : "N/A"}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Home phone number:{" "}
                            </span>
                            {report.home_phone_number ? report.home_phone_number : "N/A"}
                        </p>
                    </div>
                    <div>
                        <img src={report.avatar} alt="avatar" className="h-80 w-80" />
                    </div>
                </div>
            ) : (
                <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                    No data for this report
                </p>
            )}
        </div>
    );
};
