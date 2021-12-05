import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from '../../types';

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
        default: 
            return state;
    }
}