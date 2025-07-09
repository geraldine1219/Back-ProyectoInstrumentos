import { Request, Response } from "express";

import { guardarHorario, ListarHorarios, ListarHorarioNameId } from "../service/horario.service"

export const addHorarioController = async (req: Request, res: Response) => {

    const { idClase, idAula, dias, hour } = req.body;

    const camposFaltantes: string[] = [];

    if (!idClase) camposFaltantes.push("idAsignatura");
    if (!idAula) camposFaltantes.push("idAula");
    if (!dias) camposFaltantes.push("dias");
    if (!hour) camposFaltantes.push("hour");

    if (camposFaltantes.length > 0) {
        res.status(400).json({
            message: "Faltan campos obligatorios",
            camposFaltantes,
        });
    }

    try {

        const now = new Date();

        let listResult = [];

        for (const valor of req.body.dias) {
            
            const result = await guardarHorario({
                ...req.body,
                dia: valor,
                fechaRegistro: now,
                fechaActualizacion: now,
            });

            listResult.push(result)
        }

        res.status(200).json({
            message: 'Registro exitoso',
            horario: listResult,
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
        });
    }

}

export const listHorarioController = async (req: Request, res: Response) => {

    try {

        const result = await ListarHorarios();

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
                horario: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

// 

export const listHorarioNameIdController = async (req: Request, res: Response) => {
    try {
        const resultAlumno = await ListarHorarioNameId();
        if (!resultAlumno) {
            res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = resultAlumno.map(item => ({
                ...item,
            }));        
            res.status(200).json({
                message: 'Busqueda Completada',
                horario: usersFormateados,
            });
        }
    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}