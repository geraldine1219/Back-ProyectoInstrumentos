

import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { guardarAlumno, ObtenerAlumno, ListarAlumno, ListarEdificiosNameId } from "../service/alumno.service";
import { ListarPensulsAlumno } from "../service/pensul.service";

export const loginAlumnoController = async (req: Request, res: Response) => {

  const { email, contraseña} = req.body;

  try {
    if (!email || !contraseña) {
        res.status(400).json({ text: "Correo and Contraseña are required", data: {} });
    }else{

        const alumno = await ObtenerAlumno(undefined, email);

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

export const addAlumnoController = async (req: Request, res: Response) => {

    const {
        nombre, apellido, email, contraseña, fechaNacimientoAlumno, telefonoContacto,
        dni, edad,
    } = req.body;

    if (
        !nombre || !apellido || !email || !contraseña || !fechaNacimientoAlumno ||
        !telefonoContacto || !dni || !edad
    ) {
        res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    try {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
        const now = new Date();

        const result = await guardarAlumno({
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

export const getAlumnoController = async (req: Request, res: Response) => {

    const { dni } = req.params;

    if (!dni) {
        res.status(400).json({ message: "Debes proporcionar el DNI para buscar." });
    }

    try {

        const result = await ObtenerAlumno(dni, "");

        res.status(200).json({
            message: 'Busqueda Completada',
            user: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listAlumnoController = async (req: Request, res: Response) => {

    try {

        const result = await ListarAlumno();

        if (!result) {
           res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
                fechaNacimientoAlumno: new Date(item.fechaNacimientoAlumno).toLocaleDateString("es-CO"),
                fechaRegistro: new Date(item.fechaRegistro).toLocaleDateString("es-CO"),
                fechaActualizacion: new Date(item.fechaActualizacion).toLocaleDateString("es-CO"),
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                user: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listAlumnoPensulController = async (req: Request, res: Response) => {

    try {

        const { idAlumno } = req.params;
        const result = await ListarPensulsAlumno(idAlumno);

        if (!result) {
            res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
                fechaRegistro: new Date(item.fechaRegistro).toLocaleDateString("es-CO"),
                fechaActualizacion: new Date(item.fechaActualizacion).toLocaleDateString("es-CO"),
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                pensul: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}


export const listAlumnoNameIdController = async (req: Request, res: Response) => {

    try {
    
            const resultAlumno = await ListarEdificiosNameId();
    
            if (!resultAlumno) {
               res.status(404).json({ message: "No se encontraron alumnos" });
            }else{
                
                res.status(200).json({
                    message: 'Busqueda Completada',
                    alumno: resultAlumno,
                });
            
            }
    
        } catch (error) {
            console.error("Error al buscar alumno:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }

}