import { React, useState, useEffect } from "react";
import axios from 'axios';
import { Pagination } from 'antd';
import Swal from 'sweetalert2'
import { Button } from '../../../components'

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

</link>


export const User = () => {
    const [user, setUser] = useState([]);
    const [contadorTotal, setContadorTotal] = useState(1);
    const [contador, setContador] = useState(1);
    const [mostrarUser, setMostrarUser] = useState(null);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [observacion, setObservacion] = useState([]);
    let iniciador = useRef(5);

    /* APIS DE Usuario*/

    const peticionGet = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://alphaofinal.herokuapp.com/api/alpha/clientes-admin/users',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setUser(response.data.data.users)
            setTablaUsuarios(response.data.data.users)
            setLoading(false);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => { peticionGet(); }, [])

    
    const desaGet = async (user) => {
        try {
 /*            if (user.state === 1) {
                const { value: text } = await swal({
                    title: "An input!",
                    text: "Write something interesting:",
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "Ingresa la observación"
                        }
                    },
                    buttons: {
                        cancel: {
                            text: "Cancelar",
                            value: null,
                            visible: true,
                            className: "",
                            closeModal: true
                        },
                        confirm: {
                            text: "Ok",
                            value: true,
                            visible: true,
                            className: "",
                            closeModal: true
                        }
                    },
                    inputValidator: value => {
                        if (!value) {
                            return "Necesitas ingresar una observación";
                        }
                    }
                });

                if (text) {
                    Swal.fire("El técnico fue desactivado", "", "warning");
                    try {
                        const response = await axios.post(
                            `https://alphaofinal.herokuapp.com/api/alpha/clientes-admin/${user.id}/destroy`,
                            { observacion: text },
                            { headers: { accept: "application/json", authorization: token } }
                        );
                        await peticionGet();
                        console.log(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                }
            } */

            if (user.state == 1) {
                const { value: text } = await Swal.fire({
                  input: 'text',
                  inputLabel: 'Ingrese el motivo por el cual se va a inhabilitar al usuario',
                  inputPlaceholder: 'Ingresa el motivo para inhabilitar',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  inputValidator: (value) => {
                    if (!value) {
                      return 'Para inhabilitar al usuario necesitas ingresar un comentario'
                    }
                  }
                })
        
                if (text) {
                  Swal.fire('El usuario fue inhabilitado exitosamente', '', 'warning')
                  const response = await axios.post(
                    `https://alphaofinal.herokuapp.com/api/alpha/clientes-admin/${user.id}/destroy`,
                    { observacion: text },
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                  );
                  await peticionGet();
                  console.log(response.message)
                }
              }

            else {

                const { value: text } = await Swal.fire({
                    input: 'text',
                    inputLabel: 'Ingrese el motivo por el cual se va a activar al usuario',
                    inputPlaceholder: 'Ingresa el motivo para activar',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Para activar al usuario necesitas ingresar un comentario'
                        }
                    }
                })
                if (text) {
                    Swal.fire('El usuario fue activado exitosamente', '', 'warning')
                    const response = await axios.post(
                        `https://alphaofinal.herokuapp.com/api/alpha/clientes-admin/${user.id}/destroy`,
                        { observacion: text },
                        { headers: { 'accept': 'application/json', 'authorization': token } }
                    );
                    await peticionGet();
                    console.log(response.message)
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
            if (elemento.full_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) { return elemento; }
        });
        setUser(resultadosBusqueda);
    }

    


    const onChangePage = (tam, size) => {
        console.log(typeof tam)
        if (tam == 1) {
            setContador(1);
            let temporales = user.slice(0, iniciador.current * tam);
            setMostrarUser(temporales);
        } else {
            setContador(iniciador.current * tam - 4)
            let temporales = user.slice(iniciador.current * tam - 5, iniciador.current * tam);
            setMostrarUser(temporales);
        }
        console.log(tam, size);
    }

    useEffect(() => {
        if (user.length > 0) {
            let temporales = user.slice(0, 5);
            setMostrarUser(temporales);
            let total_temporal = user.length / 5;
            let total_temporal_entero = parseInt(total_temporal);
            if (total_temporal > total_temporal_entero) {
                setContadorTotal((total_temporal_entero + 1) * 10)
            } else {
                setContadorTotal((total_temporal_entero) * 10)
            }
        }
    }, [user])


    useEffect(() => {
        console.log(mostrarUser);
    }, [mostrarUser])


    return (
        <>
            <div class="full-box text-center ">
                <div class="full-box tile ">
                    <div class="full-box tile-title text-center text-titles text-uppercase bg-dark ">
                        Usuarios
                    </div>
                    <div class="full-box tile-icon text-center ">
                        <i class="bi bi-person-lines-fill text-dark"></i>
                    </div>
                    <div class="full tile-number text-titles text-dark">
                        <p class="full-box">{user.length}</p>
                        <small>Registros</small>
                    </div>
                </div>
            </div>

            <div class="text-center container " style={{ background: " #E2E2E2", }}>
                <div className="containerInput py-3 ">
                    <input
                        className="form-control inputBuscar"
                        value={busqueda}
                        placeholder="Búsqueda por Nombre o Usuario"
                        onChange={handleChange} />
                </div>

                <div class="table-responsive">
                    <br />
                    {loading ? (
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                     ) :
                        <table class="table table-bordered table-striped ">
                            <thead className="custom-th">
                                <tr>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Telefono Casa</th>
                                    <th>Telefono Personal</th>
                                    <th>Dirección</th>
                                    <th> Estado </th>
                                </tr>
                            </thead >
                            <tbody >
                                {mostrarUser && mostrarUser.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.full_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.home_phone}</td>
                                        <td>{user.personal_phone}</td>
                                        <td>{user.address} </td>
                                        <td>
                                            <a type="submit" onClick={() => { desaGet(user) }} className={`btn ${user.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                                                {user.state ? <i className="bi bi-person-check-fill"></i> :
                                                    <i className="bi bi-person-x-fill"></i>
                                                }
                                            </a>
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

