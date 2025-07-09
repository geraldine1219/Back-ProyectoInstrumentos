// import { db } from "../db";

// Report
import { getDB } from '../db';
import sql from 'mssql';

import { AlumnoInterfaz } from "../interfaces/alumno.interfaces";

// export const guardarAlumno = async (alumno: AlumnoInterfaz) => {

//     const {
//         nombre, apellido, email, contraseña, fechaNacimientoAlumno, telefonoContacto,
//         dni, edad, fechaRegistro, fechaActualizacion, } = alumno;

//     const query = `
//         INSERT INTO alumnos (
//             nombre, apellido, email, contraseña, fechaNacimientoAlumno,
//             telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         nombre, apellido, email, contraseña, fechaNacimientoAlumno,
//         telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion,
//     ]);

//     return result;

// }

export const guardarAlumno = async (alumno: AlumnoInterfaz) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    fechaNacimientoAlumno,
    telefonoContacto,
    dni,
    edad,
    fechaRegistro,
    fechaActualizacion
  } = alumno;

  const db = await getDB();

  const result = await db.request()
    .input('nombre', sql.VarChar(45), nombre)
    .input('apellido', sql.VarChar(45), apellido)
    .input('email', sql.VarChar(45), email)
    .input('contraseña', sql.VarChar(90), contraseña)
    .input('fechaNacimientoAlumno', sql.Date, fechaNacimientoAlumno || null)
    .input('telefonoContacto', sql.VarChar(45), telefonoContacto || null)
    .input('dni', sql.VarChar(45), dni)
    .input('edad', sql.Int, edad || null)
    .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
    .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
    .query(`
      INSERT INTO alumnos (
        nombre, apellido, email, contraseña, fechaNacimientoAlumno,
        telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion
      ) VALUES (
        @nombre, @apellido, @email, @contraseña, @fechaNacimientoAlumno,
        @telefonoContacto, @dni, @edad, @fechaRegistro, @fechaActualizacion
      )
    `);

  return result;
};

// export const ObtenerAlumno = async (dni?:string, email?:string) => {

//     let query = "SELECT * FROM alumnos WHERE 1=1";
//     const params: any[] = [];

//     if (dni) {
//         query += " AND dni = ?";
//         params.push(dni);
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
//         return null;
//     }

// }

export const ObtenerAlumno = async (dni?: string, email?: string) => {
  let query = "SELECT * FROM alumnos WHERE 1=1";
  const inputs: { name: string, type: sql.ISqlType, value: any }[] = [];

  if (dni) {
    query += " AND dni = @dni";
    inputs.push({ name: 'dni', type: sql.VarChar(45), value: dni });
  }

  if (email) {
    query += " AND email = @email";
    inputs.push({ name: 'email', type: sql.VarChar(45), value: email });
  }

  try {
    const db = await getDB();
    const request = db.request();

    // Agregar inputs dinámicamente
    inputs.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.query(query);
    const data = result.recordset;

    return data.length ? data[0] : null;

  } catch (error) {
    console.error('❌ Error al obtener alumno:', error);
    return null;
  }
};

type AlumnoSinContrasena = Omit<AlumnoInterfaz, "contraseña">;

// export const ListarAlumno = async (): Promise<AlumnoSinContrasena[] | null> => {
    
//     try {
//         let query = `SELECT nombre, apellido, email, fechaNacimientoAlumno, telefonoContacto,
//         dni, edad, fechaRegistro, fechaActualizacion FROM alumnos`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarAlumno = async (): Promise<AlumnoSinContrasena[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT 
        nombre, apellido, email, fechaNacimientoAlumno, 
        telefonoContacto, dni, edad, fechaRegistro, fechaActualizacion 
      FROM alumnos
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar alumnos:', error);
    return null;
  }
};

// export const ListarEdificiosNameId = async (): Promise<AlumnoInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idAlumno, nombre, apellido FROM alumnos limit 10`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarEdificiosNameId = async (): Promise<AlumnoInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT TOP 10 idAlumno, nombre, apellido 
      FROM alumnos
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar alumnos:', error);
    return null;
  }
};