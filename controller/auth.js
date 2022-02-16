const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        //eNCRYPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();
    
        // Generar JWT
        const token = await generarJWT( usuario.id ); 


            // respuesta en json
            res.json({
               ok: true,
               usuario,
               token
            });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error la informacion'
        });
    }
}


const loguearUsuario = async (req, res = response) =>{


    try {

        const { email, password } = req.body;


        // VALIDANDO EMAIL
        const usuarioDB = await Usuario.findOne({email});
        
     
        if ( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // VALIDANDO PASSWORD
        
        const validarPassword = await bcrypt.compareSync(password, usuarioDB.password);
        
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT 
        const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
         });


    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const renovarToken = async( req, res = response) =>{

    const uid  = req.uid;

     // Generar JWT 
     const token = await generarJWT( uid );

     const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        msg: 'renovando',
        usuario,
        token
     });

}

module.exports = {
    crearUsuario, loguearUsuario, renovarToken
}