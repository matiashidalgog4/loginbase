const jwt = require('jsonwebtoken');
const SECRETA = 'G4CONSULTING';

const auth = function (req : any, res: any , next : any) {
    

    //Leer el token del header
    const token = req.header('x-auth-token');


    //Revisar si no hay token
    if(!token){
        return res.status(401).json({ msg: 'No hay token. Permiso no valido' });
    }

    // Validar el token

    try{

        const cifrado = jwt.verify(token, SECRETA);
        req.usuario = cifrado.usuario;
        next();

    } catch (error){
        res.status(401).json({msg: 'Token no valido'});
    }
}


export default auth;
