
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { ProfesorInterfaz } from "../interfaces/profesor.intefaces";

// export const guardarProfesor = async (asignatura: ProfesorInterfaz) => {

//     const { nombre, apellido, email, contraseña, fechaNacimientoProfesor, 
//         telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion, } = asignatura;

//     const query = `
//         INSERT INTO profesores (
//             nombre, apellido, email, contraseña, fechaNacimientoProfesor, 
//             telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         nombre, apellido, email, contraseña, fechaNacimientoProfesor, 
//         telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarProfesor = async (profesor: ProfesorInterfaz) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    fechaNacimientoProfesor,
    telefonoContacto,
    dni,
    edad,
    fechaRegistro,
    fechaActualizacion,
  } = profesor;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('nombre', sql.VarChar(45), nombre)
      .input('apellido', sql.VarChar(45), apellido)
      .input('email', sql.VarChar(45), email)
      .input('contraseña', sql.VarChar(90), contraseña)
      .input('fechaNacimientoProfesor', sql.DateTime, fechaNacimientoProfesor)
      .input('telefonoContacto', sql.VarChar(45), telefonoContacto)
      .input('dni', sql.VarChar(45), dni)
      .input('edad', sql.Int, edad)
      .input('fechaRegistro', sql.DateTime, fechaRegistro)
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion)
      .query(`
        INSERT INTO profesores (
          nombre, apellido, email, contraseña, fechaNacimientoProfesor,
          telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion
        )
        VALUES (
          @nombre, @apellido, @email, @contraseña, @fechaNacimientoProfesor,
          @telefonoContacto, @dni, @edad, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar profesor:', error);
    throw error;
  }
};


// export const ObtenerProfesor = async (idProfesor?:number, email?: string) => {

//     let query = "SELECT * FROM profesores WHERE 1=1";
//     const params: any[] = [];

//     if (idProfesor) {
//         query += " AND idProfesor = ?";
//         params.push(idProfesor);
//     }

//     if (email) {
//         query += " AND email = ?";
//         params.push(email);
//     }

//     try {

//         const [rows] = await db.execute(query, params);
//         const data = rows as any[];

//         if (data.length === 0) {
//             return null; 
//         }

//         return data[0];
//     } catch (error) {
//         console.log(error)
//         return {}
//     }

// }

export const ObtenerProfesor = async (idProfesor?: number, email?: string): Promise<ProfesorInterfaz | null | {}> => {
  try {
    const db = await getDB();

    let query = `SELECT * FROM profesores WHERE 1=1`;
    const request = db.request();

    if (idProfesor) {
      query += ` AND idProfesor = @idProfesor`;
      request.input('idProfesor', sql.Int, idProfesor);
    }

    if (email) {
      query += ` AND email = @email`;
      request.input('email', sql.VarChar(45), email);
    }

    const result = await request.query(query);
    const data = result.recordset;

    return data.length ? data[0] : null;
  } catch (error) {
    console.error('❌ Error al obtener profesor:', error);
    return {};
  }
};

type AlumnoSinContrasena = Omit<ProfesorInterfaz, "contraseña">;

// export const ListarProfesores = async (): Promise<AlumnoSinContrasena[] | null> => {
    
//     try {
//         let query = `SELECT nombre, apellido, email, contraseña, fechaNacimientoProfesor, 
//             telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion FROM profesores`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarProfesores = async (): Promise<ProfesorInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT nombre, apellido, email, contraseña, fechaNacimientoProfesor, 
             telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion
      FROM profesores
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar profesores:', error);
    return null;
  }
};

// export const ListarProfesoresNameId = async (): Promise<ProfesorInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idProfesor, nombre, apellido FROM profesores`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarProfesoresNameId = async (): Promise<ProfesorInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT idProfesor, nombre, apellido 
      FROM profesores
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar profesores Name/ID:', error);
    return null;
  }
};

// export const ListarAlumnosProfesor = async (): Promise<ProfesorInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idProfesor, nombre, apellido FROM profesores`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarAlumnosProfesor = async (): Promise<ProfesorInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT idProfesor, nombre, apellido 
      FROM profesores
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar profesores (ListarAlumnosProfesor):', error);
    return null;
  }
};