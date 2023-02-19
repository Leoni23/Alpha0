/* import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReportForm } from '../../components/organisms/ContactForm';

export const UpdateReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/reporte/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setReport(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getReport
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR REPORTE</h3>
                    </div>
                    <ReportForm />
                </div>
            </div>
            
            <h1 className='font-black text-4xl text-sky-900'>Reporte</h1>
            <hr className='mt-3' />
            {
                Object.keys(report).length > 0 ?
                    (
                        <ReportForm report={report} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this reporte</p>
                    )
            }
        </div>
    )
}
 */