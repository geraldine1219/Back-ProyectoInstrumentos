

import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { guardarAdmin, ObtenerAdmin } from "../service/admin.service";

export const loginAdminController = async (req: Request, res: Response) => {

  const { email, contraseña} = req.body;

  try {
    if (!email || !contraseña) {
        res.status(400).json({ text: "Correo and Contraseña are required", data: {} });
    }else{

        const alumno = await ObtenerAdmin(undefined, email);

        if (!alumno) {
            res.status(400).json({ text: "El usuario no se encuentra registrado", data: {} });
        }

        const { contraseña, ...infoAlumno } = alumno;
        const isMatch = await bcrypt.compare(req.body.contraseña, contraseña || "");
        
        if (isMatch){
            res.status(200).json({text:"Usuario Encontrado",data:infoAlumno});
        }else{
            res.status(400).json({text:"La contraseña no coincide",data:{}});
        }

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ text: "Internal server error", data: {} });
  }
}

export const addAdminController = async (req: Request, res: Response) => {

    const {
        nombre, apellido, email, contraseña
    } = req.body;

    if (
        !nombre || !apellido || !email || !contraseña
    ) {
        res.status(400).json({ message: "Faltan campos obligatorios" });
    }else{

        try {
    
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
            const now = new Date();
    
            const result = await guardarAdmin({
                ...req.body,
                contraseña: hashedPassword,
                edad: parseInt(req.body.edad),
                fechaRegistro: now,
                fechaActualizacion: now,
            });
    
            res.status(200).json({
                message: 'Login exitoso',
                user: result,
            });
    
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                message: 'Error interno del servidor',
            });
        }
    }


}

export const getAdminController = async (req: Request, res: Response) => {

    const { dni } = req.params;

    if (!dni) {
        res.status(400).json({ message: "Debes proporcionar el DNI para buscar." });
    }else{
        try {
    
            const result = await ObtenerAdmin(dni, "");
    
            res.status(200).json({
                message: 'Busqueda Completada',
                user: result,
            });
    
        } catch (error) {
            console.error("Error al buscar alumno:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }


}