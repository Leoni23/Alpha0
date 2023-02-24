import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { Label, Button } from '../../components'
import p1 from '../../pages/app/img/p1.png'
import { validatePassword } from '../../Validations';


export const ResetPassword = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const { token } = useParams();
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState(null)
    const [mensaje, setMensaje] = useState(null)
    const [password_confirmation, setPasswordcon] = useState('')

    const Reset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://alphaomegafinal.herokuapp.com/api/alpha/reset-password',
                { token, email, password, password_confirmation },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data);

            navigate('/login');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setPassword('');
            setPasswordcon('');
        }
    }


    return (
        <>


            <div class="body">
                <img class="bg-image" src="https://st2.depositphotos.com/1025317/9371/i/600/depositphotos_93718032-stock-photo-the-fighting-great-egrets-ardea.jpg" />
                <div class="masthead">
                    <div class="masthead-content text-white">
                        <div class="container-fluid">
                            <p className="text-center text-light ">
                                <i>
                                    <img id="imgInicio" class="img-responsive rounded-circle" src={p1}></img>
                                </i>
                            </p>
                            <p id="textIniciar" >Alcanza la ligereza suficiente de cuerpo y espíritu para volar hacia el horizonte tentando al futuro con el corazón.</p>
                            <p id="textIniciar1" className="text-center">Cambia tu contraseña</p>
                            <form onSubmit={Reset} >


                                <div className="form-group label-floating">
                                    <Label description="Correo" htmlFor='email' />
                                    <input
                                        className="form-control"
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={email}
                                        maxLength="35"
                                        required
                                        autoFocus
                                        disabled

                                    />

                                </div>
                                <div className="form-group label-floating">
                                    <Label description="Nueva Contraseña" htmlFor='password' />
                                    <input
                                        className="form-control"
                                        id='password'
                                        name='password'
                                        type='password'
                                        placeholder='Ingresa una nueva contraseña'
                                        value={password}
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setPassword1(validatePassword(e.target.value))
                                            } else {
                                                setMensaje(null)
                                            }
                                        }} />
                                    <p>{password1 ? password1.message : 'Password'} </p>
                                </div>
                                <div className="form-group label-floating">
                                    <Label description="Confirmar Contraseña" htmlFor='password_confirmation' />
                                    <input
                                        className="form-control"
                                        id='password_confirmation'
                                        name='password_confirmation'
                                        type='password'
                                        placeholder='Confirma la nueva contraseña'
                                        value={password_confirmation}
                                        required
                                        onChange={e => setPasswordcon(e.target.value)}
                                    />
                                </div>
                                <br />
                                <div class="col-12">
                                    <button id="btnIniciar" class="btn btn-block ">Restaurar Contraseña</button>
                                </div>
                                <br />
                                <div className="text-center">
                                    <a id="textIniciar2" onClick={() => { navigate("/forgot_password") }} className="small " href="#">Regresar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="social-icons">
                    <div class="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
                        <a class="btn btn-dark m-3" href="#!"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-dark m-3" href="https://www.facebook.com/biodanzapuembo.quito"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-dark m-3" href="#!"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
            </div>
        </>
    )
}