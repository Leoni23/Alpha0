import { React, useState, useEffect } from "react";
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import { useContext } from 'react';
import { AuthContext } from '../../contexts';

export const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [perfil, setPerfil] = useState([]);
    const [avatar, setAvatar] = useState();
    const urlActual = location.pathname;
    const { user, logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const onLogout = async () => {
        try {
            logout();
            await axios.post(
                'https://alphaofinal.herokuapp.com/api/alpha/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/login', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const getPerfil = async () => {
        try {
            const response = await axios.get(
                'https://alphaofinal.herokuapp.com/api/alpha/profile',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data)
            setPerfil(response.data.data.user)
            setAvatar(response.data.data.avatar)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPerfil();
    }, [])

    return (
        <>
            <section className="full-box dashboard-sideBar" >
                <div className="full-box dashboard-sideBar-bg btn-menu-dashboard"></div>
                <div className="full-box dashboard-sideBar-ct">

                    <div className="full-box text-uppercase text-center text-titles dashboard-sideBar-title">
                        Alpha0 <i className="zmdi zmdi-close btn-menu-dashboard visible-xs"></i>
                    </div>
                    <div>

                        <div key={perfil} className="full-box dashboard-sideBar-UserInfo">

                            <figure className="full-box">
                                <img src={avatar} alt="UserIcon" />
                                {<figcaption className="text-center text-titles">
                                    <p>{perfil.username}</p>
                                    <p>{perfil.email}</p>
                                </figcaption>}
                            </figure>

                            <ul className="full-box list-unstyled text-center">
                                <li>
                                    <Link to="/profile" title="Editar perfil">
                                        <i className="zmdi zmdi-account-circle"></i>
                                    </Link>
                                </li>
                                <li>

                                    <a onClick={onLogout} className="">
                                        <i className="zmdi zmdi-power"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <ul className="list-unstyled full-box dashboard-sideBar-Menu">
                        <li>
                            <Link to='/'>
                                <i className="zmdi zmdi-home"></i> Inicio
                            </Link>
                        </li>
                        <li id="MultiIra">
                            <Link to='/Ira'>
                                <i className="zmdi zmdi-view-dashboard zmdi-playlist-audio"></i> Ira
                            </Link>
                        </li>
                        <li>
                            <Link to='/Ansiedad'>
                                <i className="zmdi zmdi-view-dashboard zmdi-playlist-audio"></i> Ansiedad
                            </Link>
                        </li>
                        <li>
                            <Link to='/Soledad'>
                                <i className="zmdi zmdi-view-dashboard zmdi-playlist-audio"></i> Soledad
                            </Link>
                        </li>
                        <li>
                            <Link to='/Miedo'>
                                <i className="zmdi zmdi-view-dashboard zmdi-playlist-audio"></i> Miedo
                            </Link>
                        </li>
                        <li>
                            <Link to='/Depresion'>
                                <i className="zmdi zmdi-view-dashboard zmdi-playlist-audio"></i> Depresion
                            </Link>
                        </li>
                        <li id="emociones1" >
                            <Link to='/ShowEmociones'>
                                <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"></i> Emociones
                            </Link>
                        </li>
                        <li id="reserva">
                            <Link to='/ReservasPrueba'>
                                <i className="zmdi zmdi-check-circle-u"></i> Eventos
                            </Link>
                        </li>
                        <li id="publicidad1">
                            <Link to='/publicidad'>
                                <i className="zmdi zmdi-account-add"></i> Publicidad
                            </Link>
                        </li>
                        <li></li>
                        <li>
                            <Link to='/user'>
                                <i className="zmdi zmdi-account-add"></i> Usuarios
                            </Link>
                        </li>
                        <li>
                            <Link to='/coment'>
                                <i className="zmdi zmdi-comments"></i> Comentarios
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

            {/* <!-- Content page--> */}
            <section className="full-box dashboard-contentPage bg-light">
                {/* <!-- NavBar --> */}
                <nav className="full-box dashboard-Navbar bg-black">
                    <ul className="full-box list-unstyled text-right">
                        <li className="pull-left">
                            <a href="" className="btn-menu-dashboard"><i class="zmdi zmdi-more-vert"></i></a>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </section>
        </>
    )
}

