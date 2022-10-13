
//Types
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    LIMPIAR_ERROR,
    MENSAJE_LICENCIA
} from "./authActions";

const authReducer = (state, action) => {
    switch(action.type){

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
             /* AsyncStorage.setItem('token', action.payload.token); */

            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
            
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            /* AsyncStorage.removeItem('token'); */
            return{
                ...state,
                token: null,
                mensaje: action.payload.msg,
                autenticado: false,
                usuario: null,
                cargando:false
            }

        case LIMPIAR_ERROR:{
            return{
                ...state,
                token: null,
                mensaje: null,
                autenticado: false,
                usuario: null,
                cargando:false
            }
        }
        
        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
                cargando:false
            }

        case MENSAJE_LICENCIA:
            return {
                ...state,
                mensajeLicencia: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;