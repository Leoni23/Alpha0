import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Label, Button } from '../../components'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Profile = () => {

	const navigate = useNavigate();
	const [perfil, setPerfil] = useState([]);
	const token = localStorage.getItem('token');
	const [avatar, setAvatar] = useState(null);
	const [image, setImage] = useState(null);
	const [error, setError] = useState(false);
	const [isPhoneValid, setIsPhoneValid] = useState(true);
	const [isPhoneValid2, setIsPhoneValid2] = useState(true);



	const getPerfil = async () => {
		try {
			const response = await axios.get(
				'https://alphaomegafinal.herokuapp.com/api/alpha/profile',
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
				'https://alphaomegafinal.herokuapp.com/api/alpha/profile',
				{ ...perfil }, { headers: { 'accept': 'application/json', 'authorization': token } }

			);
			console.log(response.data.data)
			toast.success("Datos guardados exitosamente.");
			window.location.reload();

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
				`https://alphaomegafinal.herokuapp.com/api/alpha/profile/avatar`,
				data,
				{ headers: { 'authorization': token } }
			);

			console.log(response.data)

			window.location.reload();
		} catch (error) {
			console.log(error);

		}
	}

	const handleChange = (e) => {
		setPerfil({
			...perfil,
			[e.target.name]: e.target.value
		});


		if (perfil.personal_phone.length !== 10) {
			setIsPhoneValid(false);
			return;
		}

		if (perfil.home_phone.length !== 9) {
			setIsPhoneValid2(false);
			return;
		}
	}

	function calculateAge() {
		const today = new Date();
		const birthdate = new Date(perfil.birthdate);
		let age = today.getFullYear() - birthdate.getFullYear();
		const month = today.getMonth() - birthdate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
			age--;
		}
		return age >= 18;
	}

	return (
		<>

			<div className="container-fluid">
				<div className="panel panel-info">
					<div className="panel-heading">
						<h1 id="publicidad"><i className="zmdi zmdi-account-circle zmdi-hc-fw"></i>MIS DATOS</h1>
						<h3 className="panel-title text-light"
							style={{ background: "#f7b25d", margin: "5px" }}>
							<i className="bi bi-pencil-square">&nbsp; Modificar datos personales</i>
						</h3>
					</div>
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
												<label htmlFor='first_name' className="control-label form-label">Nombres :</label>
												<input
													className='form-control'
													id='first_name'
													name='first_name'
													type='text'
													value={perfil.first_name}
													placeholder='Ingrese su nombre'
													onChange={handleChange}
													minLength="3"
													maxLength="30"
													required

												/>
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<label htmlFor='first_name' className="control-label form-label">Apellidos :</label>
												<input
													className='form-control'
													id='last_name'
													name='last_name'
													type='text'
													value={perfil.last_name}
													placeholder='Ingrese su apellido'
													onChange={handleChange}
													minLength="3"
													maxLength="30"
													required

												/>

											</div>
										</div>
										<div className="col-xs-12 col-sm-6 my-3">
											<div className="form-group label-floating">
												<label htmlFor='first_name' className="control-label form-label">Nombre de Usuario :</label>
												<input
													className='form-control'
													id='username'
													name='username'
													type='text'
													value={perfil.username}
													placeholder='Ingrese su nombre de usuario'
													onChange={handleChange}
													minLength="5"
													maxLength="30"
													required

												/>
											</div>
										</div>
										<div className="col-xs-12 col-sm-6 my-3">
											<div className="form-group label-floating">
												<label htmlFor="first_name" className="control-label form-label">
													Fecha de Nacimiento
												</label>
												<input
													id="birthdate"
													type="date"
													className="form-control"
													placeholder="birthdate"
													name="birthdate"
													value={perfil.birthdate}
													onChange={handleChange}
													required
												/>
												{!calculateAge() && (
													<span style={{ color: "red" }}>Fecha no válida tiene que tener igual o mayor a 18 </span>
												)}
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<label htmlFor='first_name' className="control-label form-label">Teléfono Celular :</label>
												<input
													className="form-control"
													id='contactanos'
													type="number"
													name='personal_phone'
													placeholder='Ingrese su teléfono celular'
													value={perfil.personal_phone}
													onChange={handleChange}


													required
												/>
												{!isPhoneValid && perfil.personal_phone.length !== 10 && (
													<div style={{ color: "red" }}>
														El número de teléfono debe tener exactamente 10 dígitos.
													</div>
												)}
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<label htmlFor='first_name' className="control-label form-label">Teléfono Convencional (02...) :</label>
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
												{!isPhoneValid2 && perfil.home_phone.length !== 9 && (
													<div style={{ color: "red" }}>
														El número de teléfono debe tener exactamente 9 dígitos.
													</div>
												)}
											</div>
										</div>

										<div className="col-xs-12 col-sm-6 my-3">
											<div className="form-group label-floating">
												<label htmlFor='address' className="control-label form-label">Dirección de Domicilio :</label>
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
								<button
									
									className="btn btn-success btn-raised btn-sm"
									disabled={!calculateAge() || perfil.personal_phone.length !== 10 || perfil.home_phone.length !== 9}
									style={{ background: "#427296", margin: "10px" }}
								>
									<i className="zmdi zmdi-floppy"></i> Guardar información

								</button>
								
							</p>
							<div className="form-group label-floating">
								<label htmlFor='address' className="control-label form-label">Imágen de perfil</label>
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
								<button onClick={updateImagen} className="btn btn-success btn-raised btn-sm"
									style={{ background: "#427296", margin: "10px", border: "#427296" }}
									onMouseEnter={(e) => e.target.style.background = "#2d5b89"}
									onMouseLeave={(e) => e.target.style.background = "#427296"}>
									<i className="zmdi zmdi-floppy"></i> Guardar imágen
								</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}