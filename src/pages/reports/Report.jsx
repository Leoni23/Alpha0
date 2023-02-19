import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Report = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log(Report);
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
                    <i className="bi bi-file-earmark-richtext-fill"></i> Administración{" "}
						<small>DE REPORTES</small>
					</h1>
				</div>
				<p className="lead">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
					voluptas reiciendis tempora voluptatum eius porro ipsa quae voluptates
					officiis sapiente sunt dolorem, velit quos a qui nobis sed,
					dignissimos possimus!
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/Dashboard/report" className={`${urlActual === '/Dashboard/report' ? ' btn-success': 'btn-outline-success'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE REPORTES
						</Link>
					</li>
					<li>
						<Link to="/Dashboard/report/create" className={`${urlActual === '/Dashboard/report/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; NUEVO REPORTE
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
