import { Request, Response } from "express";

import { guardarInstrumento, ObtenerInstrumento, ListarInstrumento, ListarInstrumentoNameId } from "../service/instrumento.service"

export const addInstrumentoController = async (req: Request, res: Response) => {

    const { nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto } = req.body;
    
        const camposFaltantes: string[] = [];

        if (!nombreInstrumento) camposFaltantes.push("nombreInstrumento");
        if (!tipo) camposFaltantes.push("tipo");
        if (!edadRecomendada) camposFaltantes.push("edadRecomendada");
        
        if (camposFaltantes.length > 0) {
            res.status(400).json({
                message: "Faltan campos obligatorios",
                camposFaltantes,
            });
        }
    
        try {

            const now = new Date();
    
            const result = await guardarInstrumento({
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

export const getInstrumentoController = async (req: Request, res: Response) => {

    const { idInstrumento } = req.params;

    if (!idInstrumento) {
        res.status(400).json({ message: "Debes proporcionar el idInstrumento para buscar." });
    }

    try {

        const result = await ObtenerInstrumento(Number(idInstrumento));

        res.status(200).json({
            message: 'Busqueda Completada',
            user: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listInsrumentoController = async (req: Request, res: Response) => {

    try {

        const result = await ListarInstrumento();

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


export const listInstrumentoNameIdController = async (req: Request, res: Response) => {

    try {

        const result = await ListarInstrumentoNameId();

        if (!result) {
           res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                instrumento: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}