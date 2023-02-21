import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts';
import { validateEmail, validatePassword } from '../../Validations';
import p1 from '../../pages/app/img/p1.png'


export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://alphaofinal.herokuapp.com/api/alpha/login',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const { access_token, token_type, user } = response.data.data
            console.warn(access_token, token_type, user);
            login(user, `${token_type} ${access_token}`);
            navigate('/');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
            setPassword('');
        }
    }
    return (
        <>
            <div class="body">
                <img class="bg-image" src="https://st2.depositphotos.com/1025317/9371/i/600/depositphotos_93718032-stock-photo-the-fighting-great-egrets-ardea.jpg" />
                <div class="masthead">
                    <div class="masthead-content text-white">
                        <div class="container-fluid">
                            <form class="needs-validation" autocomplete="on" onSubmit={onLogin} >
                                <p className="text-center text-light ">
                                    <i>
                                        <img id="imgInicio" class="img-responsive rounded-circle" src={p1}></img>
                                    </i>
                                </p>
                                <p id="textIniciar" >Alcanza la ligereza suficiente de cuerpo y espíritu para volar hacia el horizonte tentando al futuro con el corazón.</p>
                                <p id="textIniciar1" className="text-center">Inicia sesión en tu cuenta</p>
                                <div className="form-group label-floating">
                                    <label for="validationCustom01" class="form-label">Correo Electónico</label>
                                    <input
                                        class="form-control"
                                        id="validationCustom01"
                                        name='email'
                                        type='email'
                                        value={email}
                                        placeholder='Ingresa tu correo electrónico'
                                        maxLength="35"
                                        required
                                        autoFocus
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}

                                    />
                                    <div class="valid-feedback">
                                        ¡Se ve bien!
                                    </div>
                                </div>
                              <br />
                                <div className="form-group label-floating" >
                                    <label className="control-label">Contraseña</label>
                                    <input
                                        className="form-control"
                                        id='password'
                                        name='password'
                                        type='password'
                                        value={password}
                                        placeholder='Ingresa tu contraseña'
                                        required
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                   <br />
                                    <div className="text-center">
                                        <a id="textIniciar2" onClick={() => { navigate("/landing/forgot_password") }} className="small" href="#">¿Ha olvidado su contraseña?</a>
                                    </div>
                                </div>
                                <br />
                                <div class="col-12">
                                    <button id="btnIniciar" class="btn btn-block ">Iniciar sesión</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

