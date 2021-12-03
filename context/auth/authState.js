import React, { useReducer } from 'react';
import { authContext } from './authContext';
import authReducer from './authReducer';

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

    const registrarUsuario = ( datos ) => {
        
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