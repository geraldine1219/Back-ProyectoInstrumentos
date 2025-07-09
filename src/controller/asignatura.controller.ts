import { Request, Response } from "express";

import { guardarAsignatura, ObtenerAsignatura, ListarAsignatura,ListarAsignaturaNameId } from "../service/asignatura.service"

export const addAsignaturaController = async (req: Request, res: Response) => {

    const { nombreAsignatura, horasRequeridas } = req.body;
    
        if (!nombreAsignatura || !horasRequeridas) {
            res.status(400).json({ message: "Faltan campos obligatorios" });
        }
    
        try {

            const now = new Date();
    
            const result = await guardarAsignatura({
                ...req.body,
                fechaRegistro: now,
                fechaActualizacion: now,
            });
    
            res.status(200).json({
                message: 'Registro exitoso',
                user: result,
            });
    
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                message: 'Error interno del servidor',
            });
        }

}

export const getAsignaturaController = async (req: Request, res: Response) => {

    const { idAsignatura } = req.params;

    if (!idAsignatura) {
        res.status(400).json({ message: "Debes proporcionar el idAsignatura para buscar." });
    }

    try {

        const result = await ObtenerAsignatura(Number(idAsignatura));

        res.status(200).json({
            message: 'Busqueda Completada',
            user: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listAsignaturaController = async (req: Request, res: Response) => {

    try {

        const result = await ListarAsignatura();

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
                user: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}


export const listAsignaturaNameIdController = async (req: Request, res: Response) => {
 
    try {
    
        const result = await ListarAsignaturaNameId();

        if (!result) {
            res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                asignatura: usersFormateados,
            });
        }

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}
