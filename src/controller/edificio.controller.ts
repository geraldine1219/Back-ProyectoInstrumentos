import { Request, Response } from "express";

import { guardarEdificio, ListarEdificios, ListarEdificiosNameId } from "../service/edificio.service"

export const addEdificioController = async (req: Request, res: Response) => {

    const { calle, numero } = req.body;
    
        const camposFaltantes: string[] = [];

        if (!calle) camposFaltantes.push("calle");
        if (!numero) camposFaltantes.push("numero");
        
        if (camposFaltantes.length > 0) {
            res.status(400).json({
                message: "Faltan campos obligatorios",
                camposFaltantes,
            });
        }
    
        try {

            const now = new Date();
    
            const result = await guardarEdificio({
                direccion: `${calle} - ${numero}`,
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

// export const getInstrumentoController = async (req: Request, res: Response) => {

//     const { idInstrumento } = req.params;

//     if (!idInstrumento) {
//         res.status(400).json({ message: "Debes proporcionar el idInstrumento para buscar." });
//     }

//     try {

//         const result = await ObtenerInstrumento(Number(idInstrumento));

//         res.status(200).json({
//             message: 'Busqueda Completada',
//             user: result,
//         });

//     } catch (error) {
//         console.error("Error al buscar alumno:", error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }

// }

// export const listInsrumentoController = async (req: Request, res: Response) => {

//     try {

//         const result = await ListarInstrumento();

//         if (!result) {
//            res.status(404).json({ message: "No se encontraron alumnos" });
//         }else{
//             const usersFormateados = result.map(item => ({
//                 ...item,
//                 fechaRegistro: new Date(item.fechaRegistro).toLocaleDateString("es-CO"),
//                 fechaActualizacion: new Date(item.fechaActualizacion).toLocaleDateString("es-CO"),
//             }));
    
//             res.status(200).json({
//                 message: 'Busqueda Completada',
//                 user: usersFormateados,
//             });
//         }


//     } catch (error) {
//         console.error("Error al buscar alumno:", error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }

// }

export const listAlumnoController = async (req: Request, res: Response) => {

    try {

        const result = await ListarEdificios();

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

export const listEdificioController = async (req: Request, res: Response) => {

    try {

        const result = await ListarEdificiosNameId();

        if (!result) {
           res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                edificio: usersFormateados,
            });
        }

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}