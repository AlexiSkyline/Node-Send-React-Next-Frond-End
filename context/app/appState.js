import React, { useReducer } from 'react'
import { appContext } from './appContext';
import appReducer from './appReducer';
import { OCULTAR_ALERTA, 
         MOSTRAR_ALERTA, 
         SUBIR_ARCHIVO_EXITO, 
         SUBIR_ARCHIVO_ERROR, 
         SUBIR_ARCHIVO, 
         CREAR_ENLACE_EXITO,
         LIMPIAR_STATE} from '../../types';
import { clienteAxios } from '../../config/axios';

export const AppState = ( props ) => {
    const initialState = {
        mensajeArchivo: null,
        nombre: '',
        nombreOriginal: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
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
                    nombreOriginal: nombreArchivo
                }
            });
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    // Todo: Crea un enlace una vez que se haya subidó el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombreOriginal,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const respuesta = await clienteAxios.post( '/api/enlaces', data );
            
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            
        }
    }

    // Todo: Reinicia el state
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        });
    }

    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                nombre: state.nombre,
                nombreOriginal: state.nombreOriginal,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivos,
                crearEnlace,
                limpiarState
            }}
        >
            { props.children}
        </appContext.Provider>
    );
}
