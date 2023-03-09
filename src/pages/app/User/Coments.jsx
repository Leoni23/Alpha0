import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from 'antd';
import { useRef } from "react";

import axios from 'axios';

export const Coment = () => {
    const navigate = useNavigate();
    const [coment, setComent] = useState([]);
    const token = localStorage.getItem('token');
    const [contadorTotal, setContadorTotal] = useState(1);
    const [contador, setContador] = useState(1);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [mostrarUser, setMostrarUser] = useState(null);
    const [consultaActual, setConsultaActual] = useState('');

    let iniciador = useRef(5);


    /* APIS DE CONTACTANOS */
    const getComent = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/comments/vercomment',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.comments)
            setComent(response.data.data.comments)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getComent(); }, [])


    const deleteComent = async (id) => {
        try {
            console.warn(id);
            // eslint-disable-next-line no-restricted-globals
            const confirmation = confirm("Esta seguro que desea eliminar este comentario permanentemente")
            if (confirmation) {
                const response = await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/comments/${id}/destroy`,
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


    const handleChange = e => {
        const nuevaBusqueda = e.target.value;
        setBusqueda(nuevaBusqueda);
        if (nuevaBusqueda !== consultaActual) {
            setConsultaActual(nuevaBusqueda);
            filtrar(nuevaBusqueda);
        }
    };

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = coment.filter((elemento) => {
            if (elemento.comentario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.creadoby.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) { return elemento; }
        });
        setComent(resultadosBusqueda);
    }



    const onChangePage = (tam, size) => {
        console.log(typeof tam)
        if (tam == 1) {
            setContador(1);
            let temporales = coment.slice(0, iniciador.current * tam);
            setMostrarUser(temporales);
        } else {
            setContador(iniciador.current * tam - 4)
            let temporales = coment.slice(iniciador.current * tam - 5, iniciador.current * tam);
            setMostrarUser(temporales);
        }
        console.log(tam, size);
    }

    useEffect(() => {
        if (coment.length > 0) {
            let temporales = coment.slice(0, 5);
            setMostrarUser(temporales);
            let total_temporal = coment.length / 5;
            let total_temporal_entero = parseInt(total_temporal);
            if (total_temporal > total_temporal_entero) {
                setContadorTotal((total_temporal_entero + 1) * 10)
            } else {
                setContadorTotal((total_temporal_entero) * 10)
            }
        }
    }, [coment])

    useEffect(() => {
        console.log(coment);
    }, [coment])



    return (
        <>
            <div class="text-center container " style={{ background: " #E2E2E2", }}>
                {/*  <div className="containerInput py-3 ">
                    <input
                        className="form-control inputBuscar"
                        value={busqueda}
                        placeholder="Búsqueda por Nombre o Usuario"
                        onChange={handleChange} />
                </div> */}
                <h1 id="publicidad"><i className="zmdi zmdi-comments"></i> Comentarios </h1>
                <p >
                En esta sección podrás visualizar todos los comentarios realizados por los usuarios finales acerca de la Escuela de Biodanza.
                 Además, se podrá mantener un control sobre los comentarios irrespetuosos para fomentar una convivencia sana y respetuosa. 
                 También tendrás la opción de eliminar dichos comentarios
                </p>

                <div class="table-responsive">
                    <br />
                    {loading ? (
                        <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <p> Cargando....</p>
                    </div>
                    ) :
                        <table class="table table-bordered table-striped ">
                            <thead className="custom-th" style={{ background: "#f7b25d" }} >
                                <tr>
                                    <th style={{ background: "#f7b25d", color: "#FFFFFF", fontSize: "20px", padding: "10px" }}>#</th>
                                    <th style={{ background: "#f7b25d", color: "#FFFFFF", fontSize: "20px", padding: "10px" }}>Comentario</th>
                                    <th style={{ background: "#f7b25d", color: "#FFFFFF", fontSize: "20px", padding: "10px" }} >Calificación</th>
                                    <th style={{ background: "#f7b25d", color: "#FFFFFF", fontSize: "20px", padding: "10px" }} >Nombre de Usuario</th>
                                    <th style={{ background: "#f7b25d", color: "#FFFFFF", fontSize: "20px", padding: "10px" }}>Eliminar</th>
                                </tr>
                            </thead >
                            <tbody >
                                {mostrarUser && mostrarUser.map((coment) => (
                                    <tr key={coment.id}>
                                        <td>{coment.id}</td>
                                        <td>{coment.comentario}</td>
                                        <td>{coment.calificacion}</td>
                                        <td>{coment.creadoby.username}</td>
                                        <td>
                                            <button type='button' className='btn btn-danger m-1 bi bi-trash-fill'
                                                onClick={() => { deleteComent(coment.id) }}></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    <br />
                    <Pagination
                        defaultCurrent={1}
                        total={contadorTotal}
                        showSizeChanger
                        onChange={onChangePage}
                    />
                </div>
            </div>
        </>)
};