import React, { useReducer } from 'react'
import { appContext } from './appContext';
import appReducer from './appReducer';
import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from '../../types';

export const AppState = ( props ) => {
    const initialState = {
        mensajeArchivo: null,
    }

    const [ state, dispatch ] = useReducer( appReducer, initialState );

    const mostrarAlerta = ( msg ) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        //* Limpiar alerta despues de 3 Segundos
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    }

    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                mostrarAlerta
            }}
        >
            { props.children}
        </appContext.Provider>
    );
}
