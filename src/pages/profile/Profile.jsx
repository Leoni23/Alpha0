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


	/* const handleChange1 = (e) => {
		setAvatar({
			...avatar,
			[e.target.name]: e.target.value
		});
	} */

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
								<div className="container-fluid was-validated">
									<div className="row">
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
											<label htmlFor='first_name' className="control-label form-label">Nombre</label>
												<input
													className='form-control'
													id='first_name'
													name='first_name'
													type='text'
													value={perfil.first_name}
													placeholder='Ingrese su nombre'
													onChange={handleChange}
													minLength="3"
													required
													
												/>
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
											<label htmlFor='first_name' className="control-label form-label">Apellido</label>
												<input
													className='form-control'
													id='last_name'
													name='last_name'
													type='text'
													value={perfil.last_name}
													placeholder='Ingrese su apellido'
													onChange={handleChange}
													minLength="3"
													required
													
												/>

											</div>
										</div>
										<div className="col-xs-12 col-sm-6 my-3">
											<div className="form-group label-floating">
											<label htmlFor='first_name' className="control-label form-label">Nombre de Usuario</label>
												<input
													className='form-control'
													id='username'
													name='username'
													type='text'
													value={perfil.username}
													placeholder='Ingrese su nombre de usuario'
													onChange={handleChange}
													minLength="5"
													required
													
												/>
											</div>
										</div>
										<div className="col-xs-12 col-sm-6 my-3">
											<div className="form-group label-floating">
											<label htmlFor='first_name' className="control-label form-label">Fecha de Nacimiento</label>
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
											<label htmlFor='first_name' className="control-label form-label">Teléfono Celular</label>
												<input
													className="form-control"
													id='contactanos'
													type="number"
													name='personal_phone'
													placeholder='Ingrese su teléfono celular'
													value={perfil.personal_phone}
													onChange={handleChange}
													minLength="10"
													maxLength="10"
													required
												/>
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
											<label htmlFor='first_name' className="control-label form-label">Teléfono Convencional</label>
												<input
													className="form-control"
													id='home_phone'
													type="number"
													name='home_phone'
													placeholder='Ingrese el teléfono convencional'
													value={perfil.home_phone}
													onChange={handleChange}
													minLength="9"
													maxLength="9"
													required
												/>
											</div>
										</div>

										<div className="col-xs-12 col-sm-6 my-3">
											<div className="form-group label-floating">
											<label htmlFor='address' className="control-label form-label">Dirección de Domicilio</label>
												<input
													className="form-control"
													id='address'
													type="text"
													name='address'
													placeholder='Ingrese la dirección de domicilio'
													value={perfil.address}
													onChange={handleChange}
													minLength="5"
													required
												/>
											</div>
										</div>
									</div>
								</div>
							</fieldset>
							<br />
							<p className="text-center">
								<button type="submit" className="btn btn-success btn-raised btn-sm">
									<i className="zmdi zmdi-refresh"></i> Actualizar</button>
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
								/>

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