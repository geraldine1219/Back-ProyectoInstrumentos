import { Request, Response } from "express";

import { ObtenerPensul, guardarPensul, ListarPensuls } from "../service/pensul.service"
import { ListarEdificiosNameId } from "../service/alumno.service"
import { ListarClaseNameId } from "../service/clase.service"

export const addPensulController = async (req: Request, res: Response) => {

    const { idAlumno, idClase } = req.body;
    
        const camposFaltantes: string[] = [];

        if (!idAlumno) camposFaltantes.push("idAlumno");
        if (!idClase) camposFaltantes.push("tipo");
        
        if (camposFaltantes.length > 0) {
            res.status(400).json({
                message: "Faltan campos obligatorios",
                camposFaltantes,
            });
        }

        try {

            const now = new Date();
    
            const result = await guardarPensul({
                ...req.body,
                fechaRegistro: now,
                fechaActualizacion: now,
            });
    
            res.status(200).json({
                message: 'Registro exitoso',
                pensul: result,
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

export const listPensulController = async (req: Request, res: Response) => {

    try {

        const result = await ListarPensuls();

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
                pensuls: usersFormateados,
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
            const resultClase = await ListarClaseNameId();
    
            if (!resultAlumno) {
               res.status(404).json({ message: "No se encontraron alumnos" });
            }else{

                if (!resultClase) {
                    res.status(404).json({ message: "No se encontraron alumnos" });
                }else{
                    const usersFormateados = resultAlumno.map(item => ({
                        ...item,
                    }));
                    const clasesFormateados = resultClase.map(item => ({
                        ...item,
                    }));
            
                    res.status(200).json({
                        message: 'Busqueda Completada',
                        alumno: usersFormateados,
                        clase: clasesFormateados,
                    });
                }
            }
    
        } catch (error) {
            console.error("Error al buscar alumno:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }

}