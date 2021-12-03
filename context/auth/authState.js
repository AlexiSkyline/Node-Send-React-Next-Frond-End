import React, { useReducer } from 'react';
import { clienteAxios } from '../../config/axios';
import { authContext } from './authContext';
import authReducer from './authReducer';

import { REGISTRO_EXITOSO } from '../../types';

export const AuthState = ( props ) => {

    // * Definir un state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    // * Definir el reducer
    const [ state, dispatch ] = useReducer( authReducer, initialState );

    const registrarUsuario = async ( datos ) => {
        try {
           const respuesta = await clienteAxios.post( '/api/usuarios', datos );
           
           
        } catch (error) {
            console.log( error );
        }
    }
    
    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario
            }}
        >
            { props.children }
        </authContext.Provider>
    );
}