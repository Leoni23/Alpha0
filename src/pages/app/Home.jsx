import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ContactForm } from '../../components/organisms/ContactForm';
import axios from 'axios';

export const Home = () => {
    const navigate = useNavigate();
    const [contact, setContact] = useState([]);
    const [banner, setBanner] = useState([]);
    const token = localStorage.getItem('token');
    const [user, setUser] = useState([]);
    const [reserva, setReserva] = useState([]);
    const [publicidad, setPublicidad] = useState([]);

    /* APIS DE user*/
    const peticionGet = async () => {
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/clientes-admin/users',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setUser(response.data.data.users)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { peticionGet(); }, [])

    /* APIS DE Reservas*/

    const getReserva = async () => {
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/events/eventlist',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );

            console.log(response.data.data.eventos)
            setReserva(response.data.data.eventos)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getReserva(); }, [])

    /* APIS DE Publicidad*/

    const getPublicidad = async () => {
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/publicidad/publ',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data)
            console.log(response.data.data.publ)
            setPublicidad(response.data.data.publ)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getPublicidad(); }, [])

    /* APIS DE CONTACTANOS */

    const getContact = async () => {
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/contactos',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.contactanos)
            setContact(response.data.data.contactanos)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContact = async (id) => {
        try {
            console.warn(id);
            // eslint-disable-next-line no-restricted-globals
            const confirmation = confirm("Esta seguro que desea eliminar este contacto permanentemente")
            if (confirmation) {
                await axios.get(
                    `https://alphaofin.herokuapp.com/api/alpha/contactos/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getContact();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getContact(); }, [])

    /* APIS DE BANNERS */
    const getBanner = async () => {
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/banner-publico/fotos',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.banners)
            setBanner(response.data.data.banners)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getBanner(); }, [])

    return (
        <>
            <section style={{ background: "#EAEBEA", padding: "0px" }} >
                <section class="text-center bg-custom-gradient"
                    style={{ padding: "20px " }}>
                    <div class="container">
                        <div class=" row align-items-start">
                            <div class="row gx-4 gx-lg-5">
                                <h1 id="publicidad"><i className="zmdi zmdi-home active"></i> Inicio </h1>
                                <h4 class="m-0 text-center text-white">Escuela de Biodanza SRT Puembo - Quito </h4>
                                <br />
                                <p class="m-0 my-3 text-white">¡Bienvenido al inicio de la página web Alpha0! En esta sección podrás modificar la página informativa
                                    a tu gusto, ya sea modificando el banner o los contactos disponibles.
                                </p>
                                <div class="container px-4 px-lg-5">
                                    <br />
                                    <div class="full-box tile  custom-box" >
                                        <div class="full-box tile-title text-center text-titles text-uppercase bg-dark ">
                                            Usuarios
                                        </div>
                                        <div class="full-box tile-icon text-center ">
                                            <i class="bi bi-person-lines-fill text-dark"></i>
                                        </div>
                                        <div class="full tile-number text-titles text-dark">
                                            <p class="full-box">{user.length}</p>
                                            <small>Registrados</small>
                                        </div>
                                    </div>
                                    <div class="full-box tile ">
                                        <div class="full-box tile-title text-center text-titles text-uppercase bg-dark ">
                                            reservas
                                        </div>
                                        <div class="full-box tile-icon text-center ">
                                            <i class="bi bi-clipboard-check text-dark"></i>
                                        </div>
                                        <div class="full tile-number text-titles text-dark">
                                            <p class="full-box">{reserva.length}</p>
                                            <small>Generadas</small>
                                        </div>
                                    </div>
                                    <div class="full-box tile ">
                                        <div class="full-box tile-title text-center text-titles text-uppercase bg-dark ">
                                            Publicidades
                                        </div>
                                        <div class="full-box tile-icon text-center ">
                                            <i class="bi bi-card-list text-dark"></i>
                                        </div>
                                        <div class="full tile-number text-titles text-dark">
                                            <p class="full-box">{publicidad.length}</p>
                                            <small>Generadas</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="py-3" style={{ background: "#D2D0D1" }}>
                    <div class="container" style={{ background: "#D2D0D1", width: "1200px" }} >
                        <div class="container row gx-5 align-items-center justify-content-center justify-content-lg-between" style={{ paddingTop: "20px", background: "#EFEFEF" }}>
                            <div id="tituloB" class="col-12 col-lg-6 text-center">
                                <h3 class="font-alt">Modificar Carrusel De Imagenes</h3>
                                <p id="textoGarza" class="lead fw-normal text-muted mb-5 mb-lg-0">
                                    En esta sección, se da la posibilidad de subir nuevas imágenes al carrusel o poder eliminarlas, con el objetivo de mejorar la experiencia de los usuarios
                                    finales e interesados en la aplicación.

                                </p>
                                <br />
                                <Link class="btn btn-sm text-light bi bi-pencil-square" style={{ background: "#f7b25d" }} to="/CreateBanner">Modificar Carrusel</Link>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="row gx-4 gx-lg-5">
                                    <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
                                        <div class="carousel-inner">
                                            {
                                                banner.map((banner, index) => (
                                                    <div key={banner.id} class={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="10000">
                                                        <img src={banner.fotografias} class="img-fluidds" alt="..." />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Anterior</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Siguiente</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="text-center bg-custom-gradient" style={{ background: "#D2D0D1", padding: "5px" }}>
                <h1 id="publicidad"><i class="bi bi-telephone-inbound-fill"></i> Contactos </h1>
                    <br />
                    <Link class="btn btn-sm text-light bi bi-plus"
                        style={{ background: "#427296", margin: "10px" }}
                        to="/CreateContact">Crear Nuevo Contacto
                    </Link>
                    <br />
                    <div class=" row align-items-start" style={{ marginLeft: "25px", marginRight: "25px" }}>
                        <div class="row gx-3 gx-lg-6" >
                            {
                                contact.map((contact) => (
                                    <div key={contact.id} class="col-md-4 mb-5">
                                        <div id="contactos" style={{ paddingTop: "20px", background: "#EFEFEF" }} >
                                            <div class="card-body">
                                                <p class="card-title"><b> Nombre:</b> {contact.nombre} {contact.apellido} </p>
                                                <p class="card-text"><b> Correo Electrónico:</b>{contact.correo}</p>
                                                <p class="card-text"><b>Cargo de trabajo:</b>  {contact.puesto}</p>
                                                <p class="card-text"><b>Telefono:</b>  {contact.contactanos}</p>
                                            </div>
                                            <div class="card-footer">
                                                <butoon class="btn btn-sm text-light bi bi-pencil-square" style={{ background: "#f7b25d" }} onClick={() => navigate(`Edit/${contact.id}`)}>Modificar</butoon>
                                                <button type='button' className='btn btn-sm btn-danger m-1 bi bi-trash-fill'
                                                    onClick={() => { deleteContact(contact.id) }}> Eliminar </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </section>
        </>)
};

