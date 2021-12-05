import React, { useReducer } from 'react'
import { appContext } from './appContext';
import appReducer from './appReducer';
import { OCULTAR_ALERTA, 
         MOSTRAR_ALERTA, 
         SUBIR_ARCHIVO_EXITO, 
         SUBIR_ARCHIVO_ERROR, 
         SUBIR_ARCHIVO } from '../../types';
import { clienteAxios } from '../../config/axios';

export const AppState = ( props ) => {
    const initialState = {
        mensajeArchivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null
    }

    const [ state, dispatch ] = useReducer( appReducer, initialState );

    // TODO: Muestra una alerta
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

    // TODO: Sube los archivos al servidor
    const subirArchivos = async ( formData, nombreArchivo ) => {
        
        dispatch({
            type: SUBIR_ARCHIVO
        });

        try {
            const respuesta = await clienteAxios.post( '/api/archivos', formData );
            
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: respuesta.data.archivos,
                    nombre_original: nombreArchivo
                }
            });
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                mostrarAlerta,
                subirArchivos
            }}
        >
            { props.children}
        </appContext.Provider>
    );
}
