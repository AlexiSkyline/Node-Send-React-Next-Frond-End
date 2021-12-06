import React, { useContext } from 'react'
import { appContext } from '../context/app/appContext';
import { authContext } from '../context/auth/authContext'

export const Alerta = () => {
    // Todo: Extrae mensaje de error para Usuarios
    const AuthContext = useContext( authContext );
    const { mensaje } = AuthContext;

    // Todo: Extrae el mensaje de error de archivos
    const AppContext = useContext( appContext );
    const { mensajeArchivo } = AppContext;

    return (
        <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
            { mensaje || mensajeArchivo }
        </div>
    );
}