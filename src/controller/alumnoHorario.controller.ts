import { Request, Response } from "express";

import { guardarAlumnoHorario, getHorarioAlumnoNameId, getHorarioProfesorNameId  } from "../service/alumnoHorario.service"

export const addAlumnoHorarioController = async (req: Request, res: Response) => {

    const { idAlumno, idHorario } = req.body;

    const camposFaltantes: string[] = [];

    if (!idAlumno) camposFaltantes.push("idAlumno");
    if (!idHorario) camposFaltantes.push("idHorario");

    if (camposFaltantes.length > 0) {
        res.status(400).json({
            message: "Faltan campos obligatorios",
            camposFaltantes,
        });
    }

    try {

        // const existAsignatura = ObtenerAsignatura(idAsignatura);
        

        // if (!existAsignatura) res.status(400).json({
        //     message: "No se encontro la Asignatura",
        //     clase: {},
        // });

        const now = new Date();

        const result = await guardarAlumnoHorario({
            ...req.body,
            fechaRegistro: now,
            fechaActualizacion: now,
        });

        res.status(200).json({
            message: 'Registro exitoso',
            clase: result,
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
        });
    }

}

export const getAlumnoHorarioController = async (req: Request, res: Response) => {

    const { idAlumno } = req.params;
    
    if (!idAlumno) {
        res.status(400).json({ message: "Debes proporcionar el idAlumno para buscar." });
    }

    try {

        const result = await getHorarioAlumnoNameId(idAlumno);

        res.status(200).json({
            message: 'Busqueda Completada',
            alumnoHorario: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const getProfesorHorarioController = async (req: Request, res: Response) => {

    const { idProfesor } = req.params;
    
    if (!idProfesor) {
        res.status(400).json({ message: "Debes proporcionar el idAlumno para buscar." });
    }

    try {

        const result = await getHorarioProfesorNameId(idProfesor);

        res.status(200).json({
            message: 'Busqueda Completada',
            profesorHorario: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}