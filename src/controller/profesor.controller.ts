import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { guardarProfesor, ObtenerProfesor, ListarProfesores, 
    ListarProfesoresNameId, ListarAlumnosProfesor } from "../service/profesor.service"

export const loginProfesorController = async (req: Request, res: Response) => {

  const { email, contraseña} = req.body;

  try {
    if (!email || !contraseña) {
        res.status(400).json({ text: "Correo and Contraseña are required", data: {} });
    }else{

        const alumno = await ObtenerProfesor(undefined, email);

        if (!alumno) {
            res.status(400).json({ text: "El usuario no se encuentra registrado" });
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

export const addProfesorController = async (req: Request, res: Response) => {

    const { nombre, apellido, email, contraseña, fechaNacimientoProfesor, 
        telefonoContacto, dni, edad 
    } = req.body;   

        const camposFaltantes: string[] = [];

        if (!nombre) camposFaltantes.push("nombre");
        if (!apellido) camposFaltantes.push("apellido");
        if (!email) camposFaltantes.push("email");
        if (!contraseña) camposFaltantes.push("contraseña");
        if (!fechaNacimientoProfesor) camposFaltantes.push("fechaNacimientoProfesor");
        if (!telefonoContacto) camposFaltantes.push("telefonoContacto");
        if (!dni) camposFaltantes.push("dni");
        if (!edad) camposFaltantes.push("edad");
        
        if (camposFaltantes.length > 0) {
            res.status(400).json({
                message: "Faltan campos obligatorios",
                camposFaltantes,
            });
        }
    
        try {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

            const now = new Date();
    
            const result = await guardarProfesor({
                ...req.body,
                contraseña: hashedPassword,
                edad: parseInt(req.body.edad),
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

export const getProfesorController = async (req: Request, res: Response) => {

    const { idProfesor } = req.params;

    if (!idProfesor) {
        res.status(400).json({ message: "Debes proporcionar el idProfesor para buscar." });
    }

    try {

        const result = await ObtenerProfesor(Number(idProfesor));

        res.status(200).json({
            message: 'Busqueda Completada',
            profesor: result,
        });

    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

} 

export const listProfesorController = async (req: Request, res: Response) => {

    try {

        const result = await ListarProfesores();

        if (!result) {
           res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
                fechaNacimientoProfesor: new Date(item.fechaNacimientoProfesor).toLocaleDateString("es-CO"),
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

export const listProfesorNameIdController = async (req: Request, res: Response) => {

    try {

        const result = await ListarProfesoresNameId();

        if (!result) {
           res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                profesor: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const listAlumnoProfesor = async (req: Request, res: Response) => {

    try {

        const result = await ListarAlumnosProfesor();

        if (!result) {
           res.status(404).json({ message: "No se encontraron alumnos" });
        }else{
            const usersFormateados = result.map(item => ({
                ...item,
            }));
    
            res.status(200).json({
                message: 'Busqueda Completada',
                estudiantes: usersFormateados,
            });
        }


    } catch (error) {
        console.error("Error al buscar alumno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}
