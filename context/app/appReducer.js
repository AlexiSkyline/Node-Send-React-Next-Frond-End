import { OCULTAR_ALERTA, 
         MOSTRAR_ALERTA, 
         SUBIR_ARCHIVO_EXITO, 
         SUBIR_ARCHIVO_ERROR, 
         SUBIR_ARCHIVO} from '../../types';

export default function appReducer( state, action ) {
    switch( action.type ) {
        case MOSTRAR_ALERTA: 
            return {
                ...state,
                mensajeArchivo: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensajeArchivo: null
            }
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: null
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensajeArchivo: action.payload,
                cargando: null
            }
        default: 
            return state;
    }
}