import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Label, Button } from '../../components'

export const Profile = () => {

	const navigate = useNavigate();
	const [perfil, setPerfil] = useState([]);
	const token = localStorage.getItem('token');
	const [avatar, setAvatar] = useState(null);
	const [image, setImage] = useState(null);
	const [error, setError] = useState(false);


	const getPerfil = async () => {
		try {
			const response = await axios.get(
				'https://alphaofinal.herokuapp.com/api/alpha/profile',
				{ headers: { 'accept': 'application/json', 'authorization': token } }
			);
			console.log(response.data.data)
			setPerfil(response.data.data.user)

		} catch (error) {
			console.log(error);
		}
	}


	useEffect(() => {
		getPerfil();
	}, [])


	const updatePerfil = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'https://alphaofinal.herokuapp.com/api/alpha/profile',
				{ ...perfil }, { headers: { 'accept': 'application/json', 'authorization': token } }

			);
			console.log(response.data.data)

		} catch (error) {
			console.log(error);
		}
	}



	/* Actualizar imagen */
const updateImagen = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    try {
        console.log(image);
        const response = await axios.post(
            `https://alphaofinal.herokuapp.com/api/alpha/profile/avatar`,
            data,
            { headers: { 'authorization': token } }
        );

        console.log(response.data)
         setAlerta(response.data.message) 

    } catch (error) {
        console.log(error);

    }
}

	const handleChange = (e) => {
		setPerfil({
			...perfil,
			[e.target.name]: e.target.value
		});
	}


	const handleChange1 = (e) => {
		setAvatar({
			...avatar,
			[e.target.name]: e.target.value
		});
	}

	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles"><i className="zmdi zmdi-account-circle zmdi-hc-fw"></i> MIS DATOS</h1>
				</div>

			</div>


			<div className="container-fluid ">
				<div className="panel panel-success ">
					<div className="panel-body">
						<form onSubmit={updatePerfil}>
							<fieldset>

								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label description="Nombre de Usuario" htmlFor='first_name' />
											<input
												className='form-control'
												id='first_name'
												name='first_name'
												type='text'
												value={perfil.first_name}
												pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}"
												required
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label description="Nombre de Usuario" htmlFor='last_name' />
											<input
												className='form-control'
												id='last_name'
												name='last_name'
												type='text'
												value={perfil.last_name}
												pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}"
												required
												onChange={handleChange}
											/>

										</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label description="Nombre de Usuario" htmlFor='username' />
											<input
												className='form-control'
												id='username'
												name='username'
												type='text'
												value={perfil.username}
												pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}"
												required
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label htmlFor='birthdate' className="control-label">cumpleaños*</Label>
											<input
												id='birthdate'
												type="date"
												className="form-control"
												placeholder='birthdate'
												name='birthdate'
												value={perfil.birthdate}
												onChange={handleChange}
												required
											/>
										</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label htmlFor='personal_phone' className="control-label">Teléfono</Label>
											<input
												className="form-control"
												id='contactanos'
												type="phone"
												name='personal_phone'
												placeholder='contactanos'
												value={perfil.personal_phone}
												onChange={handleChange}
												required
											/>
										</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label htmlFor='home_phone' className="control-label">Teléfono</Label>
											<input
												className="form-control"
												id='home_phone'
												type="phone"
												name='home_phone'
												placeholder='home_phone'
												value={perfil.home_phone}
												onChange={handleChange}
												required
											/>
										</div>
									</div>

									<div className="col-xs-12 col-sm-6">
										<div className="form-group label-floating">
											<Label htmlFor='address' className="control-label">direccion</Label>
											<input
												className="form-control"
												id='address'
												type="text"
												name='address'
												placeholder='address'
												value={perfil.address}
												onChange={handleChange}
												required
											/>
										</div>
									</div>
								</div>
							</fieldset>
							<br />
							<p className="text-center">
								<button type="submit" className="btn btn-success btn-raised btn-sm"><i className="zmdi zmdi-refresh"></i> Actualizar</button>
							</p>
							
							<div className="form-group">
										<input
											id='imagen'
											type="file"
											name="avatar"
											placeholder='imagen'
											className='form-control'
											accept=".jpg, .png, .jpeg"
											onChange={(e) => setImage(e.target.files[0])}
											
											required />
										<span><smallspan>Inserte la URL de la imagen</smallspan></span>
									</div>
							<p className="text-center">
								<button onClick={updateImagen} className="btn btn-success btn-raised btn-sm"><i className="zmdi zmdi-refresh"></i> Actualizar</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}