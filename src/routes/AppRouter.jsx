import React from 'react'
import { Routes, Route } from 'react-router-dom';

/*Importacion de imagenes*/
import p1 from '../pages/app/img/p1.png'
import p2 from '../pages/app/img/p2.png'

import { Login, Forgot_password } from '../pages'
import { LandingPage } from '../pages/LandingPage'
import { Dashboard } from '../pages/app/Dashboard'
import { Home } from '../pages/app/Home'
import { EditContact } from '../pages/app/EditContact'
import { CreateContact } from '../pages/app/CreateContact'
import { ResetPassword } from '../pages/auth/ResetPassword'
/*Banner */

import { CreateBanner } from '../pages/app/Banner';
/*User */
import { User } from '../pages/app/User';
/*User */
import { Coment } from '../pages/app/User/Coments';

/*Multimedia */
import { Ira } from '../pages/app/Multimedia/Ira';
import { CreateIra } from '../pages/app/Multimedia/Ira';
import { EditIra } from '../pages/app/Multimedia/Ira';

import { Depresion } from '../pages/app/Multimedia/Depresion';
import { CreateDepresion } from '../pages/app/Multimedia/Depresion';
import { EditDepresion } from '../pages/app/Multimedia/Depresion';

import { Ansiedad } from '../pages/app/Multimedia/Ansiedad';
import { CreateAnsiedad } from '../pages/app/Multimedia/Ansiedad';
import { EditAnsiedad } from '../pages/app/Multimedia/Ansiedad';

import { Miedo } from '../pages/app/Multimedia/Miedo';
import { CreateMiedo } from '../pages/app/Multimedia/Miedo';
import { EditMiedo } from '../pages/app/Multimedia/Miedo';

import { Soledad } from '../pages/app/Multimedia/Soledad';
import { CreateSoledad } from '../pages/app/Multimedia/Soledad';
import { EditSoledad } from '../pages/app/Multimedia/Soledad';

/*Emociones */
import { EmoEditMiedo } from '../pages/app/Emociones/EmoEditMiedo';
import { EmoEditIra } from '../pages/app/Emociones/EmoEditIra';
import { EmoEditAnsiedad } from '../pages/app/Emociones/EmoEditAnsiedad';
import { EmoEditDepresion } from '../pages/app/Emociones/EmoEditDepresion';
import { EmoEditSoledad } from '../pages/app/Emociones/EmoEditSoledad';


import { Publicidad } from '../pages/app/Publicidad';
import { CreatePublicidad } from '../pages/app/Publicidad';
import { EditPublicidad } from '../pages/app/Publicidad';


import { ShowEmociones } from '../pages/app/Emociones';



import { CreateReserva } from '../pages/app/Reservas';
import { ReservasPrueba } from '../pages/app/Reservas';
import { EditReserva } from '../pages/app/Reservas';
import { ShowReserva } from '../pages/app/Reservas';

import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


/* Importaciones de perfil */
import { Profile } from '../pages/profile/Profile';




export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>

                <Route path='landing/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route path='/*' element={<LandingPage />} />
                            <Route path='login' element={<Login />} />

                            <Route path="/forgot_password" element={<Forgot_password />} />
                            <Route path="reset_password/:email/:token" element={<ResetPassword />} />

                        </Routes>
                    </PublicRoute>
                } />

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<Dashboard />} >

                                <Route index path='/' element={<Home />} />
                                <Route path='Edit/:id' element={<EditContact />} />
                                <Route path='CreateContact' element={<CreateContact />} />
                                <Route path='profile' element={<Profile />} />
                                <Route path='CreateBanner' element={<CreateBanner />} />
                                <Route path='User' element={<User />} />
                                <Route path='Coment' element={<Coment />} />

                                {/* multimedia listas de musicas */}

                                <Route path='Ira' element={<Ira />} />
                                <Route path='CreateIra' element={<CreateIra />} />
                                <Route path='EditIra/:id' element={<EditIra />} />

                                <Route path='Depresion' element={<Depresion />} />
                                <Route path='CreateDepresion' element={<CreateDepresion />} />
                                <Route path='EditDepresion/:id' element={<EditDepresion />} />

                                <Route path='Ansiedad' element={<Ansiedad />} />
                                <Route path='CreateAnsiedad' element={<CreateAnsiedad />} />
                                <Route path='EditAnsiedad/:id' element={<EditAnsiedad />} />

                                <Route path='Miedo' element={<Miedo />} />
                                <Route path='CreateMiedo' element={<CreateMiedo />} />
                                <Route path='EditMiedo/:id' element={<EditMiedo />} />

                                <Route path='Soledad' element={<Soledad />} />
                                <Route path='CreateSoledad' element={<CreateSoledad />} />
                                <Route path='EditSoledad/:id' element={<EditSoledad />} />

                                {/* editar 5 emociones  */}
                                <Route path='ShowEmociones' element={<ShowEmociones />} />
                                <Route path='EmoEditMiedo/:id' element={<EmoEditMiedo />} />
                                <Route path='EmoEditAnsiedad/:id' element={<EmoEditAnsiedad />} />
                                <Route path='EmoEditSoledad/:id' element={<EmoEditSoledad />} />
                                <Route path='EmoEditIra/:id' element={<EmoEditIra />} />
                                <Route path='EmoEditDepresion/:id' element={<EmoEditDepresion />} />






                                <Route path='ReservasPrueba' element={<ReservasPrueba />} />
                                <Route path='EditReserva/:id' element={<EditReserva />} />
                                <Route path='CreateReserva' element={<CreateReserva />} />
                                <Route path='ShowReserva/:id' element={<ShowReserva />} />

                                <Route path='Publicidad' element={<Publicidad />} />
                                <Route path='CreatePublicidad' element={<CreatePublicidad />} />
                                <Route path='EditPublicidad/:id' element={<EditPublicidad />} />

                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}

/* export const AppRouter = () => {
    return (
        <AuthProvider>
            <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                            </Route>
                            <Route path="forgot_password" element={<Forgot_password />} />

                        </Routes>
                    </PublicRoute>
                } />
            


        </AuthProvider >
    )
} */


/*  export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/' element={<Login />} />
                            </Route>
                            <Route path="forgot_password" element={<Forgot_password />} />

                        </Routes>
                        </PrivateRoute>
                } />



                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<Dashboard />}>
                            <Route index path='home' element={<Home />} />
                                <Route path='Edit/:id' element={<EditContact />} />
                                <Route path='CreateContact' element={<CreateContact />} />
                                <Route path='profile' element={<Profile />} />
                                <Route path='CreateBanner' element={<CreateBanner />} />


                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
} */
