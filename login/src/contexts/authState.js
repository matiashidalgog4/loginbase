import React, { useContext, useReducer } from "react";
import authReducer from "./authReducer";
import authContext from "./authContext";

//axios
import clienteAxios from "../config/axios";

//autenticacion token
/* import tokenAuth from "../../config/token"; */

//Local Storage
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */

/* import moment from "moment"; */

//types
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

/* import { SocketContext } from "../socket/socket"; */

const AuthState = props => {

/*     const server = useContext(SocketContext); */

    const initialState = {
        token: null,
        autenticado: false,
        usuario: null,
        mensaje: null,
        cargando: true,
        mensajeLicencia: ''
    };

    const [state, dispatch] = useReducer(authReducer, initialState);



    // Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {

        if(datos.userName.trim() !== '' || datos.password.trim() !== '') {

            try{
                const respuesta = await clienteAxios.post('/user/auth', datos);
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: respuesta.data
                })

                //Obtener el usuario
                /* await usuarioAutenticado(); */

            } catch (error){

                const alerta = {
                    msg: error.response.data.errMsg ,
                    categoria: 'alerta-error'
                };

                dispatch({
                    type:LOGIN_ERROR,
                    payload: alerta
                });

            }

        }else{
            const alerta = {
                msg: "Debe Ingresar un Usuario valido con su Clave" ,
                categoria: 'alerta-error'
            };

            dispatch({
                type:LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //Limpiar todos los campos 
    const limpiarError = () => {
        dispatch({
            type: LIMPIAR_ERROR
        })
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                mensajeLicencia: state.mensajeLicencia,
                iniciarSesion,
                limpiarError
            }}
        >

            {props.children}

        </authContext.Provider>
    )
    
}

export default AuthState;