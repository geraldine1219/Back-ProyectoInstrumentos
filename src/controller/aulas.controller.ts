

import { Request, Response } from "express";
import { guardarAula, ObtenerAula, ListarAula, ListarAulaNameId } from "../service/aulas.service";
import { ObtenerEdifico } from "../service/edificio.service";

export const addAlumnoController = async (req: Request, res: Response) => {

    const {
        idEdificio, nombre, tipo, capacidadAlumnos, disponibilidadOrdenador
    } = req.body;

    if (
        !idEdificio || !nombre || !tipo || !capacidadAlumnos || !disponibilidadOrdenador
    ) {
        res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const edificio = await ObtenerEdifico(idEdificio);
    
    if (!edificio) {
        res.status(400).json({ text: "El edificio no se encuentra registrado", data: {} });
    }    

    try {

        const now = new Date();

        const result = await guardarAula({
            ...req.body,
            disponibilidadOrdenador: disponibilidadOrdenador === "true" ? 1: 0,
            fechaRegistro: now,
            fechaActualizacion: now,
        });

        res.status(200).json({
            message: 'Login exitoso',
            user: result,
        });

    } catch (error) {
        console.error('Error en Add:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
        });
    }

}

export const getAulaController = async (req: Request, res: Response) => {

    const { idAula } = req.params;

    if (!idAula) {
        res.status(400).json({ message: "Debes proporcionar el Id del Aula para buscar." });
    }

    try {

        const result = await ObtenerAula(idAula);

        res.status(200).json({
            message: 'Busqueda Completada',
            user: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listAulaController = async (req: Request, res: Response) => {

    try {

        const result = await ListarAula();

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
                aulas: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}


export const listAulaNameIdController = async (req: Request, res: Response) => {
    
    try {

        const result = await ListarAulaNameId();

        if (!result) {
            res.status(404).json({ message: "No se encontraron las Aulas" });
        } else {
            const usersFormateados = result.map(item => ({
                ...item,
            }));

            res.status(200).json({
                message: 'Busqueda Completada',
                aula: usersFormateados,
            });
        }

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }


}