import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';
import { Components } from 'antd/es/date-picker/generatePicker';
import p1 from '../../pages/app/img/p1.png'

export const Forgot_password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const Forgot = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://alphaofinal.herokuapp.com/api/alpha/forgot-password',
                { email },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data.data);

            /*  navigate('/login/ResetPassword'); */
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
        }
    }

    return (
        <>
            <div class="body">
                <img class="bg-image" src="https://st2.depositphotos.com/1025317/9371/i/600/depositphotos_93718032-stock-photo-the-fighting-great-egrets-ardea.jpg" />
                <div class="masthead">
                    <div class="masthead-content text-white">
                        <div class="container-fluid">
                            <form onSubmit={Forgot} method="" autocomplete="on" >
                                <p className="text-center text-light ">
                                    <i>
                                        <img id="imgInicio" class="img-responsive rounded-circle" src={p1}></img>
                                    </i>
                                </p>
                                <p id="textIniciar" >Alcanza la ligereza suficiente de cuerpo y espíritu para volar hacia el horizonte tentando al futuro con el corazón.</p>
                                <p id="textIniciar1" className="text-center">Proporciona tu email para recuperar tu cuenta</p>
                                <div className="form-group label-floating">
                                    <label className="control-label" >Correo electrónico</label>
                                    <input
                                        className="form-control"
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={email}
                                        placeholder='Ingresa tu correo electrónico'
                                        maxLength="35"
                                        required
                                        autoFocus
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group text-center">
                                </div>

                                <div className='pt-4 flex justify-center'>
                                    <Button name='Enviar correo' styles='w-3/5' />
                                </div>



                                {/* <Button name='Sing in' styles='w-3/5' /> */}
                                <br /><div className="text-center ">
                                    <a onClick={() => { navigate("/landing/login") }} id="textIniciar1" >Regresar</a>
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
    );
}
