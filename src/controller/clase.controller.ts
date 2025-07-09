import { Request, Response } from "express";

import { guardarClase, ObtenerClase, ListarClases, ListarClaseNameId } from "../service/clase.service"
import { ObtenerAsignatura } from "../service/asignatura.service"
import { ObtenerProfesor } from "../service/profesor.service"
import { ObtenerInstrumento } from "../service/instrumento.service"

export const addClaseController = async (req: Request, res: Response) => {

    const { idAsignatura, idProfesor, idInstrumento } = req.body;

    const camposFaltantes: string[] = [];

    if (!idAsignatura) camposFaltantes.push("idAsignatura");
    if (!idProfesor) camposFaltantes.push("idProfesor");
    if (!idInstrumento) camposFaltantes.push("idInstrumento");

    if (camposFaltantes.length > 0) {
        res.status(400).json({
            message: "Faltan campos obligatorios",
            camposFaltantes,
        });
    }

    try {

        const existAsignatura = ObtenerAsignatura(idAsignatura);
        const existProfesor = ObtenerProfesor(idProfesor);
        const existInstrumento = ObtenerInstrumento(idAsignatura);

        if (!existAsignatura) res.status(400).json({
            message: "No se encontro la Asignatura",
            clase: {},
        });

        if (!existProfesor) res.status(400).json({
            message: "No se encontro la Asignatura",
            clase: {},
        });

        if (!existInstrumento) res.status(400).json({
            message: "No se encontro el Instrumento",
            clase: {},
        });

        const now = new Date();

        const result = await guardarClase({
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

export const getClaseController = async (req: Request, res: Response) => {

    const { idClase } = req.params;

    if (!idClase) {
        res.status(400).json({ message: "Debes proporcionar el idProfesor para buscar." });
    }

    try {

        const result = await ObtenerClase(Number(idClase));

        res.status(200).json({
            message: 'Busqueda Completada',
            profesor: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listClaseController = async (req: Request, res: Response) => {

    try {

        const result = await ListarClases();

        if (!result) {
            res.status(404).json({ message: "No se encontraron alumnos" });
        } else {
            const usersFormateados = result.map(item => ({
                ...item,
                fechaRegistro: new Date(item.fechaRegistro).toLocaleDateString("es-CO"),
                fechaActualizacion: new Date(item.fechaActualizacion).toLocaleDateString("es-CO"),
            }));

            res.status(200).json({
                message: 'Busqueda Completada',
                clase: usersFormateados,
            });
        }

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listClaseNameIdController = async (req: Request, res: Response) => {
    
    try {

        const result = await ListarClaseNameId();

        if (!result) {
            res.status(404).json({ message: "No se encontraron alumnos" });
        } else {
            const usersFormateados = result.map(item => ({
                ...item,
                fechaRegistro: new Date(item.fechaRegistro).toLocaleDateString("es-CO"),
                fechaActualizacion: new Date(item.fechaActualizacion).toLocaleDateString("es-CO"),
            }));

            res.status(200).json({
                message: 'Busqueda Completada',
                clase: usersFormateados,
            });
        }

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }


}