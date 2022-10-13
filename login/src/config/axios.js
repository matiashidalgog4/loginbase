import axios from "axios";
import { getServerURL } from "./config";

//Naquina Desarrollo
const clienteAxios = axios.create({
    baseURL: getServerURL()
});
//Para que otro pueda acceder es http://192.0.99.131:19006


export default clienteAxios;